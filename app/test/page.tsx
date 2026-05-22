"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Clock,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Flag,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";
import { MODULE_QUESTIONS, type Question } from "@/lib/questions";
import { estimateTheta, thetaToScore, routeToModule2, getSkillColor } from "@/lib/utils";

type Phase = "intro" | "module1" | "routing" | "module2" | "results";

interface Response {
  questionId: string;
  chosen: string;
  correct: boolean;
  a: number;
  b: number;
  skill: string;
  timeTaken: number;
}

const AI_EXPLANATIONS: Record<string, string> = {};

function getExplanation(q: Question, chosen: string): string {
  const key = `${q.id}-${chosen}`;
  if (AI_EXPLANATIONS[key]) return AI_EXPLANATIONS[key];
  const exp = `You chose "${chosen}" but the correct answer is "${q.correct}". ${q.explanation}`;
  AI_EXPLANATIONS[key] = exp;
  return exp;
}

export default function TestPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [responses, setResponses] = useState<Response[]>([]);
  const [module1Responses, setModule1Responses] = useState<Response[]>([]);
  const [routedTo, setRoutedTo] = useState<"hard" | "easy">("easy");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(32 * 60);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showExplanation, setShowExplanation] = useState(false);
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [reviewMode, setReviewMode] = useState(false);

  const m1Qs = MODULE_QUESTIONS["1"];
  const currentQuestions = phase === "module1" ? m1Qs : questions;
  const currentQ = currentQuestions[currentIdx];
  const totalQ = currentQuestions.length;

  useEffect(() => {
    if (phase === "module1" || phase === "module2") {
      const interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) { clearInterval(interval); return 0; }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentIdx, phase]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const allCurrentResponses = phase === "module2" ? [...module1Responses, ...responses] : responses;
  const theta = allCurrentResponses.length > 0
    ? estimateTheta(allCurrentResponses.map(r => ({ correct: r.correct, a: r.a, b: r.b })))
    : 0;
  const predictedScore = allCurrentResponses.length > 0 ? thetaToScore(theta) : null;

  const handleSelect = (label: string) => {
    if (confirmed) return;
    setSelected(label);
  };

  const handleConfirm = useCallback(() => {
    if (!selected || confirmed || !currentQ) return;
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    const isCorrect = selected === currentQ.correct;
    const resp: Response = {
      questionId: currentQ.id,
      chosen: selected,
      correct: isCorrect,
      a: currentQ.discrimination_a,
      b: currentQ.difficulty_b,
      skill: currentQ.skill,
      timeTaken,
    };
    setResponses((prev) => [...prev, resp]);
    setConfirmed(true);
    if (!isCorrect) setShowExplanation(true);
  }, [selected, confirmed, currentQ, questionStartTime]);

  const handleNext = useCallback(() => {
    const isLast = currentIdx === totalQ - 1;
    if (phase === "module1") {
      if (isLast) {
        const allM1Resps = [...responses, ...(confirmed && currentQ
          ? []
          : [])];
        const route = routeToModule2(responses.map(r => ({ correct: r.correct, difficulty_b: r.b })));
        setRoutedTo(route);
        setModule1Responses(responses);
        setQuestions(MODULE_QUESTIONS[route === "hard" ? "2H" : "2E"]);
        setPhase("routing");
        setResponses([]);
        setCurrentIdx(0);
        setSelected(null);
        setConfirmed(false);
        setShowExplanation(false);
        setTimeLeft(27 * 60);
        setTimeout(() => setPhase("module2"), 3000);
      } else {
        setCurrentIdx((i) => i + 1);
        setSelected(null);
        setConfirmed(false);
        setShowExplanation(false);
      }
    } else if (phase === "module2") {
      if (isLast) {
        setPhase("results");
      } else {
        setCurrentIdx((i) => i + 1);
        setSelected(null);
        setConfirmed(false);
        setShowExplanation(false);
      }
    }
  }, [phase, currentIdx, totalQ, responses, confirmed, currentQ]);

  const finalResponses = [...module1Responses, ...responses];
  const correctCount = finalResponses.filter((r) => r.correct).length;
  const finalTheta = estimateTheta(finalResponses.map(r => ({ correct: r.correct, a: r.a, b: r.b })));
  const finalScore = thetaToScore(finalTheta);

  const skillMap: Record<string, { correct: number; total: number }> = {};
  finalResponses.forEach((r) => {
    if (!skillMap[r.skill]) skillMap[r.skill] = { correct: 0, total: 0 };
    skillMap[r.skill].total++;
    if (r.correct) skillMap[r.skill].correct++;
  });

  if (phase === "intro") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-slate-100">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">Digital SAT Practice Test</h1>
          <p className="text-slate-500 text-center text-sm mb-8">Math Section — Adaptive (MST format)</p>
          <div className="space-y-3 mb-8">
            {[
              ["Module 1", "27 questions · 32 minutes · Mixed difficulty"],
              ["Adaptive Routing", "Your Module 1 score determines Hard or Easy Module 2"],
              ["Module 2", "22 questions · 27 minutes · Targeted difficulty"],
              ["AI Explanations", "Instant feedback on every wrong answer"],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-slate-800">{title}</div>
                  <div className="text-xs text-slate-500">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setPhase("module1"); setTimeLeft(32 * 60); }}
            className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 transition-colors text-lg"
          >
            Begin Module 1 →
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full mt-3 text-slate-500 text-sm py-2 hover:text-slate-700 transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (phase === "routing") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse ${routedTo === "hard" ? "bg-amber-500" : "bg-blue-500"}`}>
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Routing to Module 2…</h1>
          <p className={`text-lg font-semibold ${routedTo === "hard" ? "text-amber-400" : "text-blue-400"}`}>
            {routedTo === "hard" ? "🔥 Hard Module 2 — Top Score Range Unlocked (600–800)" : "📘 Easy Module 2 — Score Range 200–600"}
          </p>
          <p className="text-slate-400 text-sm mt-3">Based on your Module 1 performance</p>
          <div className="flex gap-3 justify-center mt-6">
            <div className="bg-slate-800 rounded-lg px-4 py-2 text-center">
              <div className="text-white font-bold text-xl">{responses.filter(r => r.correct).length}</div>
              <div className="text-slate-400 text-xs">Correct</div>
            </div>
            <div className="bg-slate-800 rounded-lg px-4 py-2 text-center">
              <div className="text-white font-bold text-xl">{m1Qs.length}</div>
              <div className="text-slate-400 text-xs">Total Qs</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 mb-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Test Complete!</h1>
            <p className="text-slate-500 mb-6">
              Routed to {routedTo === "hard" ? "🔥 Hard" : "📘 Easy"} Module 2
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-4xl font-bold text-indigo-700">{finalScore}</div>
                <div className="text-xs text-slate-500 mt-1">SAT Score (Math)</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="text-4xl font-bold text-emerald-700">{correctCount}</div>
                <div className="text-xs text-slate-500 mt-1">Correct of {finalResponses.length}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-4xl font-bold text-slate-700">{finalTheta.toFixed(2)}</div>
                <div className="text-xs text-slate-500 mt-1">Ability θ</div>
              </div>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setReviewMode(true)} className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
                Review Answers
              </button>
              <button onClick={() => router.push("/dashboard")} className="bg-slate-100 text-slate-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Skill breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-6">
            <h2 className="font-semibold text-slate-900 mb-4">Skill Breakdown</h2>
            <div className="space-y-3">
              {Object.entries(skillMap).map(([skill, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={skill}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-700 capitalize">{skill.replace("_", " ")}</span>
                      <span className="font-semibold" style={{ color: getSkillColor(pct) }}>{pct}% ({data.correct}/{data.total})</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: getSkillColor(pct) }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review */}
          {reviewMode && (
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h2 className="font-semibold text-slate-900 mb-4">Answer Review</h2>
              <div className="space-y-4">
                {finalResponses.map((r, i) => {
                  const allQs = [...m1Qs, ...questions];
                  const q = allQs.find(q => q.id === r.questionId);
                  if (!q) return null;
                  return (
                    <div key={i} className={`p-4 rounded-xl border ${r.correct ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
                      <div className="flex items-start gap-2 mb-2">
                        {r.correct
                          ? <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          : <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />}
                        <span className="text-sm font-medium text-slate-800">Q{i + 1}: {q.text}</span>
                      </div>
                      <div className="ml-6 text-xs text-slate-600">
                        <span className="font-medium">Your answer:</span> {r.chosen} — {r.correct ? "✓ Correct" : `✗ Correct: ${q.correct}`}
                      </div>
                      {!r.correct && (
                        <div className="ml-6 mt-2 p-2 bg-white rounded-lg border border-rose-200">
                          <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 mb-1">
                            <Zap className="w-3 h-3" /> AI Explanation
                          </div>
                          <p className="text-xs text-slate-600">{getExplanation(q, r.chosen)}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  const progressPct = ((currentIdx + 1) / totalQ) * 100;
  const timeColor = timeLeft < 300 ? "text-rose-600" : timeLeft < 600 ? "text-amber-600" : "text-slate-700";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {phase === "module1" ? "Module 1" : `Module 2 — ${routedTo === "hard" ? "Hard 🔥" : "Easy 📘"}`}
            </span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              Q{currentIdx + 1} / {totalQ}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {predictedScore && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-semibold text-indigo-600">{predictedScore}</span>
                <span>predicted</span>
              </div>
            )}
            <div className={`flex items-center gap-1.5 text-sm font-semibold ${timeColor}`}>
              <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        {/* Progress */}
        <div className="h-1 bg-slate-100">
          <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 flex flex-col items-center justify-start py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* Meta */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium capitalize">
              {currentQ.skill.replace("_", " ")} · {currentQ.module_level === "2H" ? "Hard" : currentQ.module_level === "2E" ? "Easy" : "M1"}
            </span>
            <button
              onClick={() => setFlagged(prev => {
                const next = new Set(prev);
                next.has(currentIdx) ? next.delete(currentIdx) : next.add(currentIdx);
                return next;
              })}
              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border transition-colors ${flagged.has(currentIdx) ? "border-amber-400 bg-amber-50 text-amber-700" : "border-slate-200 text-slate-400 hover:border-amber-300"}`}
            >
              <Flag className="w-3 h-3" /> {flagged.has(currentIdx) ? "Flagged" : "Flag"}
            </button>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
            <p className="text-slate-900 text-base leading-relaxed font-medium">{currentQ.text}</p>
          </div>

          {/* Choices */}
          <div className="space-y-3 mb-6">
            {currentQ.choices.map((choice) => {
              let style = "border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50";
              if (confirmed) {
                if (choice.label === currentQ.correct) style = "border-emerald-500 bg-emerald-50 text-emerald-800";
                else if (choice.label === selected) style = "border-rose-400 bg-rose-50 text-rose-800";
                else style = "border-slate-100 bg-slate-50 text-slate-400";
              } else if (choice.label === selected) {
                style = "border-indigo-500 bg-indigo-50 text-indigo-800";
              }
              return (
                <button
                  key={choice.label}
                  onClick={() => handleSelect(choice.label)}
                  disabled={confirmed}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${style}`}
                >
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${choice.label === selected && !confirmed ? "border-indigo-500 bg-indigo-500 text-white" : confirmed && choice.label === currentQ.correct ? "border-emerald-500 bg-emerald-500 text-white" : confirmed && choice.label === selected ? "border-rose-400 bg-rose-400 text-white" : "border-current"}`}>
                    {choice.label}
                  </span>
                  <span className="text-sm">{choice.text}</span>
                </button>
              );
            })}
          </div>

          {/* AI Explanation */}
          {confirmed && showExplanation && selected !== currentQ.correct && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-800">AI Explanation</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{getExplanation(currentQ, selected!)}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => { if (currentIdx > 0) { setCurrentIdx(i => i - 1); setSelected(null); setConfirmed(false); setShowExplanation(false); } }}
              disabled={currentIdx === 0}
              className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex gap-3">
              {!confirmed ? (
                <button
                  onClick={handleConfirm}
                  disabled={!selected}
                  className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  {currentIdx === totalQ - 1 ? (phase === "module1" ? "Submit Module 1" : "View Results") : "Next"} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Question navigator */}
          <div className="mt-6 p-4 bg-white rounded-xl border border-slate-100">
            <div className="text-xs text-slate-400 mb-2 font-medium">Question Navigator</div>
            <div className="flex flex-wrap gap-1.5">
              {currentQuestions.map((_, i) => {
                const r = responses.find(r => r.questionId === currentQuestions[i].id);
                let cls = "w-7 h-7 rounded-lg text-xs font-semibold transition-colors ";
                if (i === currentIdx) cls += "bg-indigo-600 text-white";
                else if (r?.correct === true) cls += "bg-emerald-100 text-emerald-700";
                else if (r?.correct === false) cls += "bg-rose-100 text-rose-700";
                else if (flagged.has(i)) cls += "bg-amber-100 text-amber-700";
                else cls += "bg-slate-100 text-slate-500 hover:bg-slate-200";
                return (
                  <button key={i} onClick={() => { setCurrentIdx(i); setSelected(null); setConfirmed(false); setShowExplanation(false); }} className={cls}>
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function TrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

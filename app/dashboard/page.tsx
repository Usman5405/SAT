"use client";

import Link from "next/link";
import {
  Brain,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  ArrowRight,
  BarChart2,
  Flame,
  ChevronRight,
  Play,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { SKILL_LABELS } from "@/lib/questions";
import { getSkillColor } from "@/lib/utils";

const recentTests = [
  { date: "May 20", score: 1240, math: 620, rw: 620, improvement: "+30", module2: "Hard" },
  { date: "May 15", score: 1210, math: 600, rw: 610, improvement: "+40", module2: "Hard" },
  { date: "May 10", score: 1170, math: 580, rw: 590, improvement: "+50", module2: "Easy" },
  { date: "May 5", score: 1120, math: 550, rw: 570, improvement: "—", module2: "Easy" },
];

const skillData = [
  { skill: "algebra", pct: 78 },
  { skill: "advanced_math", pct: 55 },
  { skill: "problem_solving", pct: 62 },
  { skill: "data_analysis", pct: 44 },
  { skill: "reading_comprehension", pct: 70 },
  { skill: "grammar", pct: 83 },
];

const studyPlan = [
  { skill: "data_analysis", priority: "High", questions: 15, reason: "44% accuracy — weakest area" },
  { skill: "advanced_math", priority: "Medium", questions: 10, reason: "55% accuracy — needs work" },
  { skill: "problem_solving", priority: "Medium", questions: 8, reason: "62% accuracy — improving" },
];

export default function DashboardPage() {
  const latestScore = recentTests[0].score;
  const prevScore = recentTests[1].score;
  const improvement = latestScore - recentTests[recentTests.length - 1].score;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col fixed h-full hidden md:flex">
        <div className="p-5 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">PrepAI</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { href: "/dashboard", icon: BarChart2, label: "Dashboard", active: true },
            { href: "/test", icon: Play, label: "Practice Test", active: false },
            { href: "/dashboard/study", icon: BookOpen, label: "Study Plan", active: false },
            { href: "/dashboard/history", icon: Clock, label: "Test History", active: false },
            { href: "/dashboard/skills", icon: Target, label: "Skills", active: false },
          ].map((item) => (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${item.active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-100">
          <div className="bg-indigo-50 rounded-xl p-3">
            <div className="text-xs font-semibold text-indigo-700 mb-1">Free Plan</div>
            <div className="text-xs text-slate-500 mb-2">Upgrade to Pro for unlimited tests</div>
            <button className="w-full bg-indigo-600 text-white text-xs font-semibold py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
              Upgrade — $99
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-60 p-6 max-w-screen-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Good morning, Student! 👋</h1>
            <p className="text-slate-500 text-sm mt-1">You&apos;ve studied 3 days in a row. Keep it up!</p>
          </div>
          <Link href="/test" className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm">
            <Play className="w-4 h-4" /> Start Practice Test
          </Link>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Latest Score", value: latestScore.toString(), sub: `+${latestScore - prevScore} from last test`, color: "text-indigo-600", icon: TrendingUp },
            { label: "Total Improvement", value: `+${improvement}`, sub: "Since first test", color: "text-emerald-600", icon: Target },
            { label: "Tests Completed", value: "4", sub: "This month", color: "text-amber-600", icon: BookOpen },
            { label: "Day Streak", value: "3", sub: "Keep going!", color: "text-rose-500", icon: Flame },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500">{card.label}</span>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <div className={`text-3xl font-bold ${card.color}`}>{card.value}</div>
              <div className="text-xs text-slate-400 mt-1">{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Score trend */}
          <div className="md:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" /> Score Trend
            </h2>
            <div className="flex items-end gap-3 h-36 mb-3">
              {recentTests.slice().reverse().map((t, i) => {
                const height = ((t.score - 800) / 800) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-slate-700">{t.score}</span>
                    <div
                      className="w-full rounded-t-lg bg-indigo-500 transition-all hover:bg-indigo-600"
                      style={{ height: `${Math.max(20, height)}%`, minHeight: "24px" }}
                    />
                    <span className="text-xs text-slate-400">{t.date}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Hard M2</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" /> Easy M2</span>
            </div>
          </div>

          {/* Streak & next step */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" /> Daily Streak
              </h2>
              <div className="text-4xl font-bold text-slate-900 mb-1">3 🔥</div>
              <p className="text-xs text-slate-500">Complete today&apos;s practice to extend your streak!</p>
            </div>
            <div className="bg-indigo-600 rounded-2xl p-5 text-white">
              <h2 className="font-semibold mb-2 text-sm">Next Goal</h2>
              <div className="text-2xl font-bold mb-1">1300</div>
              <div className="text-indigo-200 text-xs mb-3">+60 pts from current score</div>
              <div className="bg-indigo-700 rounded-full h-2 mb-3">
                <div className="bg-white rounded-full h-2" style={{ width: "60%" }} />
              </div>
              <p className="text-indigo-200 text-xs">60% of the way there</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Skill gaps */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" /> Skill Breakdown
            </h2>
            <div className="space-y-3">
              {skillData.map((s) => (
                <div key={s.skill}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-medium">{SKILL_LABELS[s.skill as keyof typeof SKILL_LABELS]}</span>
                    <span className="font-semibold" style={{ color: getSkillColor(s.pct) }}>{s.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: getSkillColor(s.pct) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study plan */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Today&apos;s Study Plan
            </h2>
            <div className="space-y-3">
              {studyPlan.map((item) => (
                <div key={item.skill} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                  <div className={`w-2 h-10 rounded-full flex-shrink-0 ${item.priority === "High" ? "bg-rose-500" : "bg-amber-400"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900">{SKILL_LABELS[item.skill as keyof typeof SKILL_LABELS]}</div>
                    <div className="text-xs text-slate-500">{item.reason}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-700">{item.questions} Qs</div>
                    <Link href="/test" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-0.5">
                      Start <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent tests */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" /> Recent Tests
            </h2>
            <Link href="/dashboard/history" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-400 border-b border-slate-100">
                  <th className="text-left pb-2 font-medium">Date</th>
                  <th className="text-center pb-2 font-medium">Total</th>
                  <th className="text-center pb-2 font-medium">Math</th>
                  <th className="text-center pb-2 font-medium">R&W</th>
                  <th className="text-center pb-2 font-medium">Module 2</th>
                  <th className="text-center pb-2 font-medium">Change</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {recentTests.map((t, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 text-slate-700 font-medium">{t.date}</td>
                    <td className="py-3 text-center font-bold text-slate-900">{t.score}</td>
                    <td className="py-3 text-center text-slate-600">{t.math}</td>
                    <td className="py-3 text-center text-slate-600">{t.rw}</td>
                    <td className="py-3 text-center">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${t.module2 === "Hard" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{t.module2}</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`text-xs font-semibold ${t.improvement !== "—" ? "text-emerald-600" : "text-slate-400"}`}>{t.improvement}</span>
                    </td>
                    <td className="py-3 text-right">
                      <Link href="/test" className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Review →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import {
  Brain,
  TrendingUp,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
  BarChart2,
  BookOpen,
  Target,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "True MST Adaptive Engine",
    desc: "Our platform replicates the exact Digital SAT multistage testing format. Module 1 routes you to Hard or Easy Module 2 — just like the real test.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Zap,
    title: "AI-Powered Explanations",
    desc: "Every wrong answer triggers an instant plain-English explanation from our AI tutor. Understand exactly why you got it wrong within seconds.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: TrendingUp,
    title: "Real-Time Score Predictor",
    desc: "See your estimated SAT score update after every question using Item Response Theory — the same mathematical model used by College Board.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart2,
    title: "Skill Gap Detection",
    desc: "Track your accuracy across 6 SAT skill domains. Our system surfaces your weakest areas and builds a personalized study plan.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Target,
    title: "+150 Point Score Guarantee",
    desc: "We're confident in our platform. Study for 40+ hours and complete all practice tests — if you don't improve 150 points, we refund you.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: BookOpen,
    title: "2,000+ Curated Questions",
    desc: "Full question bank covering Math (Algebra, Advanced Math, Problem Solving) and Reading & Writing with IRT difficulty calibration.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const testimonials = [
  { name: "Sarah K.", score: "+210 pts", text: "I went from 1090 to 1300 in 8 weeks. The adaptive tests felt exactly like the real SAT. The AI explanations saved me hours of Googling.", avatar: "SK" },
  { name: "Ahmed R.", score: "+180 pts", text: "Best SAT prep at this price point. The skill gap dashboard showed me exactly where to focus. Got into my dream school!", avatar: "AR" },
  { name: "Priya M.", score: "+160 pts", text: "The real-time score predictor kept me motivated. I could see my score climb from 1050 to 1210 over 6 weeks of practice.", avatar: "PM" },
];

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "Forever free",
    desc: "Get started with no commitment",
    features: ["1 full adaptive practice test", "Diagnostic with score estimate", "20 AI-explained questions", "Basic progress dashboard"],
    cta: "Start Free",
    href: "/dashboard",
    featured: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "6-month access",
    desc: "Everything you need to ace the SAT",
    features: ["Unlimited adaptive practice tests", "Full AI tutor for every question", "Real-time score predictor", "Personalized study plan", "Parent progress dashboard", "2,000+ question bank", "+150 pt score guarantee"],
    cta: "Get Pro Access",
    href: "/dashboard",
    featured: true,
  },
  {
    name: "School",
    price: "$499",
    period: "Per year / 30 students",
    desc: "For tutors and prep institutes",
    features: ["Everything in Pro", "Teacher cohort dashboard", "Bulk student management", "Custom test creation", "Weekly progress reports", "Priority support"],
    cta: "Contact Us",
    href: "/dashboard",
    featured: false,
  },
];

const stats = [
  { value: "50,000+", label: "Students prepared" },
  { value: "1,400", label: "Average score (Pro users)" },
  { value: "+178 pts", label: "Average improvement" },
  { value: "94%", label: "Would recommend" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">PrepAI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-slate-900 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="#testimonials" className="hover:text-slate-900 transition-colors">Reviews</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign In</Link>
            <Link href="/dashboard" className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white pt-24 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/60 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Star className="w-4 h-4 fill-current" />
            #1 Adaptive Digital SAT Prep Platform
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
            Score Higher on the{" "}
            <span className="text-indigo-600">Digital SAT</span>
            <br />with Adaptive AI
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            The only prep platform with true MST adaptive testing, AI explanations for every wrong answer, and real-time score prediction — all for less than a textbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard" className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors text-lg flex items-center justify-center gap-2">
              Start Free Practice <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/test" className="bg-white text-slate-900 font-semibold px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-indigo-300 transition-colors text-lg">
              Try a Practice Test →
            </Link>
          </div>
          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">How the Adaptive Engine Works</h2>
            <p className="text-slate-500 text-lg">Mirrors the exact format of the Digital SAT</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Take Module 1", desc: "27 questions, mixed difficulty. Reading & Writing or Math.", color: "bg-indigo-600" },
              { step: "2", title: "Routed by AI", desc: "Score ≥ 52% correct → Hard Module 2. Below → Easy Module 2.", color: "bg-amber-500" },
              { step: "3", title: "Take Module 2", desc: "22 questions tailored to your level. Hard unlocks 1400+ range.", color: "bg-emerald-500" },
              { step: "4", title: "Get Your Score", desc: "IRT algorithm calculates your score 200–800, same as College Board.", color: "bg-purple-600" },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg mb-4`}>{item.step}</div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Everything You Need to Succeed</h2>
            <p className="text-slate-500 text-lg">Features competitors charge 3× more for — or don't have at all</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className={`w-6 h-6 ${f.color}`} />
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitor comparison */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Why PrepAI Wins</h2>
            <p className="text-slate-500 text-lg">The only platform that checks every box</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 font-semibold text-slate-700">Feature</th>
                  {["Khan Academy", "Magoosh", "PrepScholar", "PrepAI"].map((p) => (
                    <th key={p} className={`px-4 py-4 font-semibold text-center ${p === "PrepAI" ? "text-indigo-600 bg-indigo-50/50" : "text-slate-700"}`}>{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["True MST adaptive simulation", "✗", "✗", "~", "✓"],
                  ["AI question explanations", "✗", "✗", "✗", "✓"],
                  ["Real-time score predictor", "✗", "~", "~", "✓"],
                  ["Affordable (< $150)", "✓", "✓", "✗", "✓"],
                  ["Score guarantee", "✗", "+100", "+160", "+150"],
                  ["Parent/teacher dashboard", "✗", "✗", "~", "✓"],
                ].map(([feature, ...vals]) => (
                  <tr key={feature as string} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-3 font-medium text-slate-700">{feature}</td>
                    {vals.map((v, i) => (
                      <td key={i} className={`px-4 py-3 text-center ${i === 3 ? "bg-indigo-50/30 font-semibold" : ""} ${v === "✓" ? "text-emerald-600" : v === "✗" ? "text-rose-400" : "text-amber-600"}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Students Love It</h2>
            <p className="text-slate-500 text-lg">Real results from real students</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-emerald-600 font-semibold text-sm">{t.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 text-lg">Start free. Upgrade when you&apos;re ready.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div key={tier.name} className={`rounded-2xl p-6 border-2 ${tier.featured ? "border-indigo-600 bg-indigo-50/30 shadow-xl shadow-indigo-100" : "border-slate-200"} relative`}>
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-xl text-slate-900 mb-1">{tier.name}</h3>
                  <p className="text-slate-500 text-sm mb-4">{tier.desc}</p>
                  <div className="text-4xl font-bold text-slate-900">{tier.price}</div>
                  <div className="text-slate-500 text-sm mt-1">{tier.period}</div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={tier.href} className={`block w-full py-3 rounded-xl font-semibold text-center text-sm transition-colors ${tier.featured ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}>
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-indigo-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Raise Your SAT Score?</h2>
          <p className="text-indigo-200 text-lg mb-8">Join 50,000+ students who improved with PrepAI. Start free — no credit card required.</p>
          <Link href="/dashboard" className="bg-white text-indigo-600 font-bold px-10 py-4 rounded-xl hover:bg-indigo-50 transition-colors text-lg inline-flex items-center gap-2">
            Start Free Practice <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white text-xl">PrepAI</span>
          </div>
          <div className="text-sm">© 2026 PrepAI. Digital SAT® is a trademark of College Board.</div>
          <div className="flex gap-6 text-sm">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/test" className="hover:text-white transition-colors">Practice Test</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

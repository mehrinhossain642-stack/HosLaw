'use client';
import Link from 'next/link';

const PendulumLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="4" r="2.5" fill="#60a5fa"/>
    <line x1="16" y1="6.5" x2="10" y2="26" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="27" r="3.5" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="16" y1="6.5" x2="22" y2="22" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5"/>
    <circle cx="22" cy="23" r="2.5" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" opacity="0.5"/>
  </svg>
);

export default function About() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-6"
      style={{backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(29,78,216,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,58,95,0.18) 0%, transparent 50%)'}}>

      <div className="fixed inset-0 pointer-events-none"
        style={{backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}}/>

      <div className="w-full max-w-2xl relative z-10">

        {/* Header */}
        <div className="py-5 flex items-center justify-between border-b border-slate-800 mb-10">
          <div className="flex items-center gap-3">
            <PendulumLogo />
            <div>
              <h1 className="text-xl font-bold text-blue-400 leading-none">HosLaw</h1>
              <p className="text-slate-500 text-xs mt-0.5">Canadian Legal Assistant</p>
            </div>
          </div>
          <Link href="/"
            className="text-xs text-slate-400 hover:text-blue-400 border border-slate-700 hover:border-blue-700 px-3 py-1.5 rounded-lg transition-colors">
            ← Back to Chat
          </Link>
        </div>

        {/* About card */}
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 space-y-8">

          {/* Photo + name */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-slate-800 border-2 border-blue-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-400">M</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Mehrin Hossain</h2>
              <p className="text-blue-400 text-sm mt-1">3rd Year Computing Student · Queen's University</p>
              <p className="text-slate-500 text-xs mt-1">Builder of HosLaw 🇨🇦</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Hi there! <span className="text-blue-400">(and hopefully a job recruiter or two 👀)</span> — my name is Mehrin Hossain, which is exactly where the name HosLaw comes from.
            </p>
            <p>
              Growing up and studying in Kingston, I experienced firsthand the housing struggles that most students know all too well. Between confusing lease agreements, difficult landlords, and no idea where to turn, I realized how many people simply don't know their legal rights — not because they don't care, but because legal information has always felt inaccessible, expensive, or just plain intimidating.
            </p>
            <p>
              I built HosLaw to change that. Whether you're a student dealing with a bad landlord, an employee unsure of your workplace rights, or simply someone curious about Canadian law — HosLaw gives you clear, plain-English answers at no cost.
            </p>
            <p>
              What sets HosLaw apart from a generic AI chatbot is that it's grounded in real Canadian legislation through the CanLII API — Canada's largest legal database. Most AI models pull from general training data, which can be hit or miss. HosLaw retrieves actual statutes and cites them directly, so you know exactly where the information is coming from.
            </p>
            <p>
              This is still a third-year Computer Science project at Queen's University — but it's one I'm genuinely proud of, and it's only the beginning. ⚖️
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['Next.js', 'FastAPI', 'LangChain', 'Groq API', 'CanLII', 'Python', "Queen's University"].map(tag => (
              <span key={tag} className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Contact */}
          <div className="border-t border-slate-800 pt-6 flex gap-4">
            <a href="mailto:mehrinhossain642@gmail.com"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              mehrinhossain642@gmail.com
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
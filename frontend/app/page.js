'use client';
import { useState, useRef, useEffect } from 'react';

const PendulumLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="4" r="2.5" fill="#60a5fa"/>
    <line x1="16" y1="6.5" x2="10" y2="26" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="27" r="3.5" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1"/>
    <line x1="16" y1="6.5" x2="22" y2="22" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" opacity="0.5"/>
    <circle cx="22" cy="23" r="2.5" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" opacity="0.5"/>
  </svg>
);

const Avatar = ({ name, isBot }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
    isBot ? 'bg-blue-900 text-blue-300 border border-blue-700' : 'bg-slate-700 text-slate-300 border border-slate-600'
  }`}>
    {name[0].toUpperCase()}
  </div>
);

export default function Home() {
  const [question, setQuestion] = useState('');
  const [province, setProvince] = useState('Ontario');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [nameSet, setNameSet] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const ask = async () => {
    if (!question.trim()) return;
    const userMsg = { role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, province }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: 'Could not connect to the server. Make sure the backend is running.' }]);
    }
    setLoading(false);
  };

  if (!nameSet) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4"
        style={{backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(29,78,216,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,58,95,0.2) 0%, transparent 50%)'}}>
        <div className="w-full max-w-md text-center space-y-8">
          <div className="flex items-center justify-center gap-3">
            <PendulumLogo />
            <h1 className="text-4xl font-bold text-blue-400 tracking-tight">HosLaw</h1>
          </div>
          <p className="text-slate-400">Canadian legal information, plain and simple</p>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4">
            <p className="text-slate-300 text-sm">What should we call you?</p>
            <input
              type="text"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && nameInput.trim() && (setUserName(nameInput.trim()), setNameSet(true))}
              placeholder="Enter your name..."
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-colors"
              autoFocus
            />
            <button
              onClick={() => nameInput.trim() && (setUserName(nameInput.trim()), setNameSet(true))}
              className="w-full bg-blue-700 hover:bg-blue-600 text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center"
      style={{backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(29,78,216,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,58,95,0.18) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(15,23,42,0.8) 0%, transparent 70%)'}}>
      
      {/* subtle grid overlay */}
      <div className="fixed inset-0 pointer-events-none"
        style={{backgroundImage: 'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px'}}/>

      <div className="w-full max-w-2xl flex flex-col h-screen p-4 relative z-10">

        {/* Header */}
        <div className="py-5 flex items-center justify-between border-b border-slate-800 mb-4">
          <div className="flex items-center gap-3">
            <PendulumLogo />
            <div>
              <h1 className="text-xl font-bold text-blue-400 leading-none">HosLaw</h1>
              <p className="text-slate-500 text-xs mt-0.5">Canadian Legal Assistant</p>
            </div>
          </div>
          <select
            value={province}
            onChange={e => setProvince(e.target.value)}
            className="bg-slate-800 text-slate-300 border border-slate-700 rounded-lg px-3 py-1.5 text-xs outline-none focus:border-blue-500"
          >
            <option>Ontario</option>
            <option>British Columbia</option>
            <option>Alberta</option>
            <option>Quebec</option>
            <option>Manitoba</option>
            <option>Saskatchewan</option>
            <option>Nova Scotia</option>
            <option>New Brunswick</option>
            <option>Newfoundland and Labrador</option>
            <option>Prince Edward Island</option>
          </select>
        </div>

        {/* Chat window */}
        <div className="flex-1 overflow-y-auto space-y-5 mb-4 pr-1">
          {messages.length === 0 && (
            <div className="text-center text-slate-600 mt-24 space-y-3">
              <PendulumLogo />
              <p className="text-slate-400 text-base">Hi {userName}, ask me a legal question</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {["Can my landlord evict me without notice?", "What are my rights if I'm fired?", "How do I dispute a parking ticket?"].map(q => (
                  <button key={q} onClick={() => setQuestion(q)}
                    className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 px-3 py-2 rounded-lg transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar name={msg.role === 'user' ? userName : 'H'} isBot={msg.role === 'bot'} />
              <div className={`flex flex-col gap-1 max-w-xl ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-xs text-slate-500 px-1">
                  {msg.role === 'user' ? userName : 'Hossain AI'}
                </span>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-800 text-white rounded-tr-sm'
                    : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <Avatar name="H" isBot={true} />
              <div className="flex flex-col gap-1 items-start">
                <span className="text-xs text-slate-500 px-1">Hossain AI</span>
                <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5 items-center h-4">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2 pb-4">
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && ask()}
            placeholder="Ask a legal question..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors placeholder-slate-500"
          />
          <button
            onClick={ask}
            className="bg-blue-700 hover:bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors"
          >
            Ask
          </button>
        </div>

      </div>
    </main>
  );
}
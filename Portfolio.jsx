import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Code2, 
  Cpu, 
  Globe, 
  Binary, 
  Layers, 
  Award, 
  Zap, 
  Shield, 
  Send, 
  Mail, 
  Linkedin, 
  Github, 
  FileText, 
  ArrowRight, 
  ArrowUpRight, 
  Check, 
  Copy, 
  Volume2, 
  VolumeX, 
  X, 
  FileSearch, 
  Activity, 
  Network, 
  Clock, 
  Printer, 
  Download 
} from 'lucide-react';

/**
 * Production-Ready Portfolio Component for Sudhanshu Khetan
 * B.Tech Computer Science & AI @ Newton School
 */
export default function SudhanshuPortfolio() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  
  // Terminal State
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'NewtonOS (Kernel 6.8.0-SK) - Interactive Developer Terminal' },
    { type: 'system', text: "Type 'help' or click suggestion chips to explore Sudhanshu's credentials." },
    { type: 'neofetch', text: '' }
  ]);
  const [commandInput, setCommandInput] = useState('');
  const terminalBottomRef = useRef(null);

  // Audio Context Haptics
  const audioCtxRef = useRef(null);
  const playSound = (freq = 600, type = 'sine', duration = 0.04) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtxRef.current.currentTime + duration);
      gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch (e) {
      // Audio error ignored
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Bento Spotlight Mouse Move handler
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // Keyboard shortcut for terminal (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setTerminalOpen(false);
        setSelectedProject(null);
        setResumeOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (terminalOpen && terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, terminalOpen]);

  // Terminal commands definition
  const executeCommand = (cmd) => {
    const clean = cmd.trim().toLowerCase();
    playSound(440, 'triangle');

    const newHistory = [...terminalHistory, { type: 'input', text: cmd }];

    switch (clean) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `COMMANDS:
• neofetch   - Display system specs & credentials
• about      - First-year CS & AI journey at Newton School
• skills     - Technical arsenal (Python, C++, Web, AI/ML)
• projects   - Featured software projects & prototypes
• mun        - Model United Nations & diplomatic edge
• hackathons - Rapid prototyping track record
• hobbies    - Kabaddi, Tug of War, swimming & athletics
• contact    - Coordinates & reach
• sudo hire  - Executive hiring handshake protocol
• clear      - Clear terminal screen
• exit / gui - Return to Graphical Bento view`
        });
        break;

      case 'neofetch':
        newHistory.push({
          type: 'neofetch',
          text: ''
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `Sudhanshu Khetan is a first-year B.Tech CS & AI student at Newton School.
Driven by first-principles problem-solving, algorithmic efficiency in Python & C++, and neural architectures.`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Languages: Python (Advanced), C++ (Competitive Programming), JavaScript (ES6+), SQL
Web Stack: HTML5, Tailwind CSS, React, Node.js, Express, REST APIs
AI/ML: Deep Learning Foundations, PyTorch, Generative AI & Prompt Engineering
Tools: Git/GitHub, Linux/Bash, VS Code, Postman`
        });
        break;

      case 'mun':
        newHistory.push({
          type: 'output',
          text: `Model United Nations (MUN):
• Seasoned delegate with high-stakes debate and crisis resolution experience.
• Translates complex technical nuance into articulate, persuasive diplomacy.`
        });
        break;

      case 'hobbies':
        newHistory.push({
          type: 'output',
          text: `Athletics & Physical Tenacity:
• Kabaddi: Tactical reflexes, lung endurance, and rapid anticipation.
• Tug of War: Unyielding anchor grit, synchronized torque.
• Swimming: Cardiovascular stamina and mental clarity.`
        });
        break;

      case 'sudo hire':
        newHistory.push({
          type: 'sudo',
          text: `[PERMISSION GRANTED] Initiating Sudhanshu Khetan Hiring Handshake:
✔ Verified problem-solving acumen.
✔ Exceptional hybrid skillset: High code velocity + MUN communication.
✔ Email: sudhanshukhetan@gmail.com`
        });
        break;

      case 'clear':
        setTerminalHistory([]);
        setCommandInput('');
        return;

      case 'exit':
      case 'gui':
        setTerminalOpen(false);
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `zsh: command not found: ${clean}. Type 'help' for available commands.`
        });
    }

    setTerminalHistory(newHistory);
    setCommandInput('');
  };

  const projects = [
    {
      id: 'docmind',
      title: 'DocMind: Autonomous Research Agent',
      category: ['ai', 'python'],
      categoryLabel: 'Generative AI',
      status: 'Completed',
      desc: 'Python-powered document synthesis engine that parses academic research papers, creates vector embeddings, and enables conversational QA with strict citations.',
      stack: ['Python', 'FastAPI', 'OpenAI API', 'ChromaDB'],
      icon: FileSearch
    },
    {
      id: 'algopulse',
      title: 'AlgoPulse: Complexity Visualizer',
      category: ['python', 'web'],
      categoryLabel: 'Algorithms',
      status: 'Active',
      desc: 'Interactive algorithm benchmark and visualization suite for sorting algorithms, shortest-path graph traversals, and dynamic programming.',
      stack: ['JavaScript', 'Python Engine', 'Tailwind', 'Canvas API'],
      icon: Activity
    },
    {
      id: 'nexus',
      title: 'Nexus: Student Hackathon Hub',
      category: ['web'],
      categoryLabel: 'Full-Stack Web',
      status: 'In Progress',
      desc: 'Collaborative platform designed for peers at Newton School to assemble hackathon teams based on complementary skill tags and project track criteria.',
      stack: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      icon: Network
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category.includes(activeFilter));

  const copyEmail = () => {
    const email = "sudhanshukhetan@gmail.com";
    navigator.clipboard.writeText(email);
    playSound(900);
    showToast(`Copied to clipboard: ${email}`);
  };

  return (
    <div className="min-h-screen bg-[#050608] text-slate-200 font-sans selection:bg-sky-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Ambient Radial Lighting */}
      <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-[40%] right-[-180px] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 py-4">
        <nav className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-2xl bg-[#0a0c10]/80 border border-white/10 backdrop-blur-xl shadow-2xl">
          <a href="#hero" className="flex items-center gap-3 group" onClick={() => playSound(700)}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 p-[1px]">
              <div className="w-full h-full bg-[#050608] rounded-[11px] flex items-center justify-center font-bold text-white text-sm">
                SK
              </div>
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">Sudhanshu Khetan</span>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                CS & AI @ Newton School
              </span>
            </div>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-300 bg-[#050608]/60 p-1.5 rounded-xl border border-white/5">
            <a href="#about" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">About</a>
            <a href="#arsenal" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">Arsenal</a>
            <a href="#competitive" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">MUN & Sprints</a>
            <a href="#projects" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">Projects</a>
            <a href="#beyond" className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all">Beyond Code</a>
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => { setAudioEnabled(!audioEnabled); showToast(audioEnabled ? "Audio Muted" : "Audio Enabled 🔊"); }}
              className="p-2 rounded-xl bg-[#141820] border border-white/10 text-slate-400 hover:text-sky-300 transition-all text-xs"
              title="Toggle Audio Feedback"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => { setTerminalOpen(!terminalOpen); playSound(800); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono font-medium hover:bg-sky-500/20 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Mode</span>
              <kbd className="hidden sm:inline text-[9px] bg-sky-950 px-1 py-0.5 rounded border border-sky-400/30">⌘K</kbd>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20 space-y-24 relative z-10">

        {/* HERO */}
        <section id="hero" className="flex flex-col items-start justify-center pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open to Hackathons, Open-Source & AI Collaborations</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
            Engineering Intelligence. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-300">
              Architecting Solutions
            </span> with Code & Strategy.
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4 leading-relaxed font-light">
            I am <strong className="text-slate-100 font-semibold">Sudhanshu Khetan</strong>, a first-year Computer Science & Artificial Intelligence undergraduate at <strong className="text-sky-300">Newton School</strong>. I synthesize rigorous Python algorithmic problem-solving with cutting-edge Machine Learning and high-octane competitive execution.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-8">
            <a 
              href="#projects" 
              onClick={() => playSound(880)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 font-bold text-sm hover:shadow-lg hover:shadow-sky-500/25 transition-all"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button 
              onClick={() => { setTerminalOpen(true); playSound(750); }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f1217] border border-sky-400/40 text-sky-300 font-mono text-sm hover:bg-sky-500/10 transition-all"
            >
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Interactive CLI</span>
            </button>

            <button 
              onClick={() => { setResumeOpen(true); playSound(620); }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f1217] border border-white/10 text-slate-300 hover:text-white text-sm font-medium transition-all"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>View Bio & Resume</span>
            </button>
          </div>
        </section>

        {/* BENTO GRID */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Profile Matrix</span>
            <h2 className="text-3xl font-bold text-white mt-1">Bento Grid Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Card 1: About Me */}
            <div 
              id="about"
              onMouseMove={handleMouseMove}
              className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-[#0a0c10]/80 border border-white/10 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 01 // Origin & Philosophy
                </span>
                <span className="text-xs font-mono text-slate-400">Newton School • 2024-2028</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">The Convergence of Code, Logic & Ambition</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                At Newton School, I immerse myself in first-principles engineering. My work focuses on writing clean, high-performance Python, mastering data structures, and building scalable full-stack applications.
              </p>

              <div className="rounded-xl bg-[#050608] border border-white/5 p-4 font-mono text-xs text-slate-300">
                <div className="text-slate-400 border-b border-white/10 pb-2 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-sky-400" /> student_profile.py
                </div>
                <pre className="text-slate-300">
                  <span className="text-purple-400">class</span> <span className="text-yellow-300">Sudhanshu</span>:
                  {"\n"}    institution = <span className="text-emerald-300">"Newton School"</span>
                  {"\n"}    degree = <span className="text-emerald-300">"B.Tech CS & AI (1st Year)"</span>
                  {"\n"}    focus = [<span className="text-emerald-300">"Python"</span>, <span className="text-emerald-300">"Competitive Programming"</span>, <span className="text-emerald-300">"AI/ML"</span>]
                </pre>
              </div>
            </div>

            {/* Card 2: Core Focus */}
            <div 
              onMouseMove={handleMouseMove}
              className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#0a0c10]/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                  <Binary className="w-3.5 h-3.5" /> 02 // Core Focus
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#050608]/70 border border-white/5 flex items-start gap-3">
                  <Binary className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-white text-xs font-semibold">Algorithmic Problem Solving</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">Python & C++ competitive programming rigor.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#050608]/70 border border-white/5 flex items-start gap-3">
                  <Cpu className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-white text-xs font-semibold">AI / Machine Learning</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">Deep learning, GenAI pipelines, PyTorch fundamentals.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#050608]/70 border border-white/5 flex items-start gap-3">
                  <Globe className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-white text-xs font-semibold">Full-Stack Web Prototyping</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">Building high-impact MVPs with modern web frameworks.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Daily Practice</span>
              </div>
            </div>

            {/* Card 3: Competitive Edge (MUN & Hackathons) */}
            <div 
              id="competitive"
              onMouseMove={handleMouseMove}
              className="md:col-span-8 rounded-3xl p-6 sm:p-8 bg-[#0a0c10]/80 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> 03 // The Competitive Edge
                </span>
                <span className="text-xs font-mono text-slate-400">Velocity & Rhetoric</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">Where High-Stakes Diplomacy Meets Rapid Prototyping</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                My background in Model United Nations (MUNs) and Hackathons forms a rare synergy: the technical ability to prototype under 24-hour pressure combined with the articulate rhetoric to pitch and negotiate effectively.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#050608]/70 border border-white/5">
                  <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs mb-2">
                    <Zap className="w-4 h-4" /> Hackathons & Sprints
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Rapid MVP execution, high-pressure debugging, and cross-functional team delivery within strict deadlines.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050608]/70 border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-2">
                    <Globe className="w-4 h-4" /> Model United Nations (MUN)
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Persuasive public speaking, multilateral consensus building, and translating technical nuance into diplomacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: Beyond The Code (Athletics) */}
            <div 
              id="beyond"
              onMouseMove={handleMouseMove}
              className="md:col-span-4 rounded-3xl p-6 sm:p-8 bg-[#0a0c10]/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-mono flex items-center gap-1.5 w-fit mb-4">
                  <Shield className="w-3.5 h-3.5" /> 04 // Beyond The Code
                </span>
                <h3 className="text-lg font-bold text-white mb-2">Physical Discipline & Grit</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Endurance on the field translates directly to resilience in debugging and engineering.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#050608]/70 border border-white/5 flex items-center gap-2.5">
                    <span className="text-base">🤼</span>
                    <div>
                      <strong className="text-white block">Kabaddi</strong>
                      <span className="text-slate-400 text-[11px]">Tactical reflexes & rapid coordination.</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#050608]/70 border border-white/5 flex items-center gap-2.5">
                    <span className="text-base">⚓</span>
                    <div>
                      <strong className="text-white block">Tug of War</strong>
                      <span className="text-slate-400 text-[11px]">Unbending anchor tenacity and torque.</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#050608]/70 border border-white/5 flex items-center gap-2.5">
                    <span className="text-base">🏊</span>
                    <div>
                      <strong className="text-white block">Swimming & Exploration</strong>
                      <span className="text-slate-400 text-[11px]">Endurance and relentless curiosity.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Crafted Software</span>
              <h2 className="text-3xl font-bold text-white mt-1">Featured Projects</h2>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0a0c10] border border-white/10 text-xs font-mono">
              {['all', 'ai', 'python', 'web'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveFilter(tab); playSound(550); }}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    activeFilter === tab ? 'bg-sky-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'ai' ? 'AI / ML' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((p) => {
              const IconComponent = p.icon;
              return (
                <div 
                  key={p.id}
                  className="rounded-3xl p-6 bg-[#0a0c10]/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between group hover:border-sky-400/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-400/30 text-sky-300 text-[11px] font-mono">
                        {p.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">{p.status}</span>
                    </div>

                    <div className="h-32 rounded-2xl bg-[#050608] border border-white/5 p-4 flex items-center justify-center mb-4 text-sky-400">
                      <IconComponent className="w-10 h-10" />
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">{p.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.stack.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded bg-[#050608] text-[10px] font-mono text-slate-300 border border-white/5">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <button 
                      onClick={() => { setSelectedProject(p); playSound(600); }}
                      className="text-xs font-mono text-slate-400 hover:text-white"
                    >
                      View Details
                    </button>
                    <a 
                      href="https://github.com/sudhanshukhetan" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-2 rounded-xl bg-[#0f1217] text-slate-300 hover:text-white border border-white/10"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="rounded-3xl p-6 sm:p-10 bg-[#0a0c10]/80 border border-white/10 backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono">
              Initiate Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              Let's Build Something <span className="text-sky-400">Impactful.</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Reach out for hackathons, open-source projects, student collaborations, or technical discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#050608]/80 border border-white/5 flex flex-col justify-between">
              <div>
                <Mail className="w-5 h-5 text-sky-400 mb-2" />
                <span className="text-xs text-slate-400 font-mono">Direct Email</span>
                <p className="text-white text-xs font-semibold mt-1">sudhanshukhetan@gmail.com</p>
              </div>
              <button 
                onClick={copyEmail}
                className="mt-4 px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-300 text-xs font-mono flex items-center justify-center gap-1.5 hover:bg-sky-500/20 transition-all"
              >
                <Copy className="w-3.5 h-3.5" /> Copy Email
              </button>
            </div>

            <a 
              href="https://linkedin.com/in/sudhanshu-khetan" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-2xl bg-[#050608]/80 border border-white/5 flex flex-col justify-between hover:border-sky-400/30 transition-all"
            >
              <div>
                <Linkedin className="w-5 h-5 text-sky-400 mb-2" />
                <span className="text-xs text-slate-400 font-mono">LinkedIn Profile</span>
                <p className="text-white text-xs font-semibold mt-1">Sudhanshu Khetan</p>
              </div>
              <span className="mt-4 text-xs font-mono text-sky-300 flex items-center justify-between">
                Connect <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>

            <a 
              href="https://github.com/sudhanshukhetan" 
              target="_blank" 
              rel="noreferrer"
              className="p-4 rounded-2xl bg-[#050608]/80 border border-white/5 flex flex-col justify-between hover:border-sky-400/30 transition-all"
            >
              <div>
                <Github className="w-5 h-5 text-sky-400 mb-2" />
                <span className="text-xs text-slate-400 font-mono">Code Repositories</span>
                <p className="text-white text-xs font-semibold mt-1">GitHub @sudhanshu</p>
              </div>
              <span className="mt-4 text-xs font-mono text-sky-300 flex items-center justify-between">
                Explore <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </a>
          </div>
        </section>

      </main>

      {/* TERMINAL OVERLAY */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050608]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 font-mono">
          <div className="max-w-4xl w-full mx-auto h-full flex flex-col rounded-2xl border border-sky-400/30 bg-[#0a0c10] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#050608] border-b border-white/10">
              <div className="flex items-center gap-2">
                <button onClick={() => setTerminalOpen(false)} className="w-3 h-3 rounded-full bg-red-500" />
                <button onClick={() => setTerminalHistory([])} className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs text-slate-400 ml-2">sudhanshu@newton-os: ~/portfolio (zsh)</span>
              </div>
              <button onClick={() => setTerminalOpen(false)} className="text-xs text-slate-400 hover:text-white">
                Close (Esc)
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1017] border-b border-white/5 text-[11px] overflow-x-auto">
              {['neofetch', 'skills', 'projects', 'mun', 'hobbies', 'sudo hire', 'clear'].map((c) => (
                <button 
                  key={c}
                  onClick={() => executeCommand(c)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Output */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs text-slate-300">
              {terminalHistory.map((item, idx) => (
                <div key={idx}>
                  {item.type === 'input' && (
                    <div className="text-emerald-400 font-bold">
                      sudhanshu@newton:~$ <span className="text-white">{item.text}</span>
                    </div>
                  )}
                  {item.type === 'output' && <pre className="whitespace-pre-wrap">{item.text}</pre>}
                  {item.type === 'system' && <div className="text-slate-400">{item.text}</div>}
                  {item.type === 'error' && <div className="text-red-400">{item.text}</div>}
                  {item.type === 'sudo' && <div className="p-3 bg-purple-500/10 border border-purple-400/30 text-purple-200 rounded">{item.text}</div>}
                  {item.type === 'neofetch' && (
                    <div className="p-2 border border-white/10 rounded-xl bg-[#050608] space-y-1">
                      <div><strong className="text-emerald-400">sudhanshu</strong>@<span className="text-sky-400">newton-school</span></div>
                      <div>OS: NewtonOS x86_64 | Year: 1st Year B.Tech CS & AI</div>
                      <div>Languages: Python (Advanced), C++, JavaScript, SQL</div>
                      <div>Focus: AI/ML, Algorithms, Hackathons, MUN Diplomacy</div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Prompt input */}
            <div className="p-3 bg-[#050608] border-t border-white/10 flex items-center gap-2">
              <span className="text-emerald-400 text-xs font-semibold">sudhanshu@newton:~$</span>
              <input 
                type="text" 
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') executeCommand(commandInput);
                }}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent border-none outline-none text-sky-300 text-xs font-mono"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-[#0a0c10] border border-sky-400/40 text-white rounded-xl shadow-2xl text-xs font-sans">
          {toastMessage}
        </div>
      )}

      {/* RESUME MODAL */}
      {resumeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#0a0c10] border border-white/10 rounded-2xl p-6 text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Sudhanshu Khetan - Profile Sheet</h3>
              <button onClick={() => setResumeOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <div>
              <strong className="text-white block">Newton School (2024 - 2028)</strong>
              <p className="text-slate-400">B.Tech Computer Science & Artificial Intelligence (1st Year)</p>
            </div>
            <div>
              <strong className="text-white block">Key Competencies:</strong>
              <p className="text-slate-400">Python, Competitive Programming, Deep Learning, MUN Diplomacy, Agile Sprints.</p>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button onClick={() => setResumeOpen(false)} className="px-4 py-1.5 rounded-lg bg-white/10 text-white">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


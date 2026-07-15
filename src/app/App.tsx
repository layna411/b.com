import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown, ChevronRight, Mail, Phone, MapPin, Menu, X,
  BookOpen, Users, Award, Globe, Clock, Play, FileText,
  CheckCircle, Star, ArrowRight, Download, ExternalLink,
  GraduationCap, Laptop, HelpCircle, Send, Shield,
  BarChart2, AlertCircle, BookMarked, Video, Layers,
  User, Lock, Eye, EyeOff, Building2, Briefcase, TrendingUp,
  Upload, Zap,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import marbleBg from "@/imports/ChatGPT_Image_Jul_15__2026__10_40_30_AM.png";

// ─── Types ────────────────────────────────────────────────────

type Page = "home" | "about" | "programmes" | "lms" | "apply" | "faq" | "disclosures";

// ─── Shared Components ────────────────────────────────────────

function Glass({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`glass-panel rounded-[20px] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function Pill({ label, color = "#1e3a8a" }: { label: string; color?: string }) {
  return (
    <span
      className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full"
      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-0.5 rounded" style={{ background: "#c9a84c" }} />
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#c9a84c" }}>{children}</span>
    </div>
  );
}

function PrimaryBtn({
  children,
  onClick,
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}) {
  const pad = size === "lg" ? "px-8 py-3.5 text-sm" : size === "sm" ? "px-4 py-1.5 text-xs" : "px-6 py-2.5 text-sm";
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${pad} rounded-xl font-semibold text-white transition-all`}
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #2563EB)",
        boxShadow: "0 4px 20px rgba(30,58,138,0.35)",
      }}
    >
      {children}
    </motion.button>
  );
}

function OutlineBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, background: "rgba(30,58,138,0.08)" } as never}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
      style={{ background: "rgba(30,58,138,0)", border: "1px solid rgba(30,58,138,0.35)", color: "#1e3a8a" }}
    >
      {children}
    </motion.button>
  );
}

// ─── Navbar ───────────────────────────────────────────────────

const NAV: { id: Page; label: string; sub?: { label: string; page: Page; section?: string }[] }[] = [
  { id: "home", label: "Home" },
  {
    id: "about",
    label: "About SIMATS",
    sub: [
      { label: "About SIMATS",          page: "about",    section: "about-hero"        },
      { label: "Leadership",             page: "about",    section: "about-leadership"  },
      { label: "Rankings & Recognition", page: "about",    section: "about-rankings"    },
      { label: "Milestones",             page: "about",    section: "about-milestones"  },
    ],
  },
  {
    id: "programmes",
    label: "Online Programmes",
    sub: [
      { label: "Programme Overview",   page: "programmes", section: "prog-hero"        },
      { label: "Eligibility",           page: "programmes", section: "prog-eligibility" },
      { label: "Fee Structure",         page: "programmes", section: "prog-fee"         },
      { label: "Curriculum",            page: "programmes", section: "prog-curriculum"  },
      { label: "Career Opportunities",  page: "programmes", section: "prog-careers"     },
    ],
  },
  {
    id: "lms",
    label: "LMS",
    sub: [
      { label: "Student Login",     page: "lms" },
      { label: "Faculty Login",     page: "lms" },
      { label: "Live Classes",      page: "lms" },
      { label: "Digital Resources", page: "lms" },
    ],
  },
  { id: "apply", label: "Apply Now" },
  { id: "faq",   label: "FAQ" },
];

function Navbar({ current, setPage }: { current: Page; setPage: (p: Page, section?: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      {/* Gold gradient underline */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1.5px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), #e8d5a3, rgba(201,168,76,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 h-[70px] flex items-center">
        {/* SAVEETHA Logo */}
        <button onClick={() => setPage("home")} className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
          <svg viewBox="0 0 262 58" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
            {/* Star mark – 5-pointed, navy body, cyan top spike, green lower-left spike */}
            <g transform="translate(2,5)">
              {/* Full navy star */}
              <polygon points="25,2 30.3,17.7 46.9,17.9 33.6,27.8 38.5,43.6 25,34 11.5,43.6 16.4,27.8 3.1,17.9 19.7,17.7" fill="#2d3280" />
              {/* Cyan top spike overlay */}
              <polygon points="25,2 30.3,17.7 19.7,17.7" fill="#00aeef" />
              {/* Green lower-left spike overlay */}
              <polygon points="11.5,43.6 16.4,27.8 25,34" fill="#7cc540" />
            </g>
            {/* SAVEETHA wordmark */}
            <text x="58" y="34" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="900" fontSize="29" fill="#2d3280" letterSpacing="1.5">SAVEETHA</text>
            {/* Navy subtitle banner */}
            <rect x="58" y="40" width="200" height="16" rx="2.5" fill="#2d3280" />
            <text x="158" y="51.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" fontSize="8.2" fill="white" textAnchor="middle" letterSpacing="0.6">COLLEGE OF LIBERAL ARTS AND SCIENCES</text>
          </svg>
        </button>

        {/* Left spacer */}
        <div className="flex-1 hidden lg:block" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {NAV.map((item) => (
            <div key={item.id} className="relative" onMouseEnter={() => setHover(item.id)} onMouseLeave={() => setHover(null)}>
              <button
                onClick={() => setPage(item.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border"
                style={current === item.id
                  ? {
                      background: "rgba(201, 168, 76, 0.08)",
                      borderColor: "rgba(201, 168, 76, 0.35)",
                      color: "#c9a84c",
                      boxShadow: "0 2px 8px rgba(201,168,76,0.06), inset 0 1px 0 rgba(255,255,255,0.6)"
                    }
                  : {
                      background: "transparent",
                      borderColor: "transparent",
                      color: "#374151"
                    }}
              >
                <span>{item.label}</span>
                {item.sub && <ChevronDown size={13} className={`transition-transform duration-300 ${hover === item.id ? "rotate-180" : ""}`} />}
              </button>

              {item.sub && hover === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-56 rounded-2xl overflow-hidden z-50 glass-dropdown p-1.5 flex flex-col gap-0.5"
                >
                  {item.sub.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => { setPage(s.page, s.section); setHover(null); }}
                      className="w-full text-left px-3.5 py-2.5 text-xs rounded-xl font-medium transition-all duration-200 flex items-center gap-2 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] text-slate-700"
                    >
                      <ChevronRight size={11} className="text-[#c9a84c] shrink-0" />
                      {s.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        {/* Right spacer */}
        <div className="flex-1 hidden lg:block" />

        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          <OutlineBtn onClick={() => setPage("lms")}>Student Login</OutlineBtn>
          <PrimaryBtn onClick={() => setPage("apply")} size="sm">Apply Now</PrimaryBtn>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 rounded-xl hover:bg-slate-100/50 transition-colors"
          style={{ color: "#374151" }}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden px-4 pb-6 glass-dropdown rounded-b-2xl border-t border-[rgba(201,168,76,0.15)] flex flex-col gap-1 shadow-xl"
          >
            {NAV.map((item) => (
              <div key={item.id} className="flex flex-col">
                <button
                  onClick={() => {
                    if (item.sub) {
                      // Toggle expanded mobile sub-items or navigate directly
                      setPage(item.id);
                      setOpen(false);
                    } else {
                      setPage(item.id);
                      setOpen(false);
                    }
                  }}
                  className={`w-full text-left px-3.5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    current === item.id
                      ? "bg-[#c9a84c]/10 text-[#c9a84c] border-l-2 border-[#c9a84c]"
                      : "hover:bg-[#1e3a8a]/5 text-slate-700"
                  }`}
                >
                  {item.label}
                </button>
                {item.sub && (
                  <div className="pl-4 pr-2 flex flex-col border-l border-slate-200/50 ml-3.5 mt-0.5 mb-1.5 gap-0.5">
                    {item.sub.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => { setPage(s.page, s.section); setOpen(false); }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all flex items-center gap-1.5"
                      >
                        <ChevronRight size={10} className="text-[#c9a84c]" />
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-2.5 mt-3 pt-3 border-t border-slate-100">
              <OutlineBtn onClick={() => { setPage("lms"); setOpen(false); }}>Student Login</OutlineBtn>
              <PrimaryBtn onClick={() => { setPage("apply"); setOpen(false); }} size="sm">Apply Now</PrimaryBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page, section?: string) => void }) {
  return (
    <footer
      className="mt-16"
      style={{
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(20px)",
        borderTop: "2px solid rgba(201,168,76,0.25)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <svg viewBox="0 0 262 58" className="h-10 w-auto" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(2,5)">
                  <polygon points="25,2 30.3,17.7 46.9,17.9 33.6,27.8 38.5,43.6 25,34 11.5,43.6 16.4,27.8 3.1,17.9 19.7,17.7" fill="#2d3280" />
                  <polygon points="25,2 30.3,17.7 19.7,17.7" fill="#00aeef" />
                  <polygon points="11.5,43.6 16.4,27.8 25,34" fill="#7cc540" />
                </g>
                <text x="58" y="34" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="900" fontSize="29" fill="#2d3280" letterSpacing="1.5">SAVEETHA</text>
                <rect x="58" y="40" width="200" height="16" rx="2.5" fill="#2d3280" />
                <text x="158" y="51.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" fontSize="8.2" fill="white" textAnchor="middle" letterSpacing="0.6">COLLEGE OF LIBERAL ARTS AND SCIENCES</text>
              </svg>
              <p className="text-[10px] mt-1" style={{ color: "#c9a84c", fontStyle: "italic", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Dare to Dream</p>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "#6b7280" }}>
              Saveetha College of Liberal Arts and Sciences — interdisciplinary education across Arts, Science, Commerce, and Business. Ask deeply. Create boldly. Grow purposefully.
            </p>
            <div className="flex gap-2">
              {["NAAC A++", "UGC", "NIRF"].map((b) => (
                <Pill key={b} label={b} color="#c9a84c" />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1e3a8a" }}>Quick Links</h4>
            <div className="space-y-2">
              {(["home","about","programmes","lms","apply","faq","disclosures"] as Page[]).map((p) => {
                const labels: Record<Page, string> = { home: "Home", about: "About SIMATS", programmes: "Online Programmes", lms: "LMS / Student Portal", apply: "Apply Now", faq: "FAQ", disclosures: "Disclosures" };
                return (
                  <button key={p} onClick={() => setPage(p)} className="flex items-center gap-2 text-xs transition-colors hover:text-amber-600" style={{ color: "#6b7280" }}>
                    <ChevronRight size={11} style={{ color: "#c9a84c" }} />{labels[p]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disclosures */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1e3a8a" }}>Disclosures</h4>
            <div className="space-y-2">
              {[
                { label: "UGC Approval",        section: "ugc"       },
                { label: "NAAC Certificate",    section: "naac"      },
                { label: "e-Samiksha Portal",   section: "esamiksha" },
                { label: "CIQA",               section: "ciqa"      },
                { label: "CIQF",               section: "ciqf"      },
                { label: "Grievance Redressal", section: "grievance" },
                { label: "Fee Refund Policy",   section: "refund"    },
                { label: "Anti-Ragging Cell",   section: "grievance" },
              ].map((d) => (
                <button key={d.label} onClick={() => setPage("disclosures", d.section)} className="flex items-center gap-2 text-xs transition-colors hover:text-amber-600 text-left" style={{ color: "#6b7280" }}>
                  <ExternalLink size={10} className="shrink-0" style={{ color: "#c9a84c" }} />{d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1e3a8a" }}>Contact</h4>
            <div className="space-y-3 text-xs" style={{ color: "#6b7280" }}>
              <div className="flex gap-2"><MapPin size={13} className="shrink-0 mt-0.5" style={{ color: "#c9a84c" }} /><span>Saveetha Nagar, Thandalam, Chennai — 602 105, Tamil Nadu, India</span></div>
              <div className="flex gap-2"><Clock size={13} className="shrink-0" style={{ color: "#c9a84c" }} /><span>Office Hours: 9:00 AM – 1:00 PM (Mon–Sat)</span></div>
              <div className="flex gap-2"><Phone size={13} className="shrink-0" style={{ color: "#c9a84c" }} /><span>+91 44 2680 1900</span></div>
              <div className="flex gap-2"><Mail size={13} className="shrink-0" style={{ color: "#c9a84c" }} /><span>admissions@saveetha.com</span></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-8 text-xs" style={{ borderTop: "1px solid rgba(201,168,76,0.2)", color: "#9ca3af" }}>
          <span>© 2026 SIMATS · Saveetha Institute of Medical and Technical Sciences · All Rights Reserved</span>
          <span>Ask deeply. Create boldly. Grow purposefully.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────

const advantages = [
  { Icon: Award,       title: "World Ranked Institution",   desc: "Recognised by QS World Rankings and NIRF among India's top universities.", color: "#2563EB" },
  { Icon: Shield,      title: "UGC Approved Degrees",       desc: "All programmes are UGC & AICTE approved and recognised by employers.", color: "#7C3AED" },
  { Icon: Globe,       title: "100% Online Flexibility",    desc: "Study anywhere, anytime with our fully online asynchronous curriculum.", color: "#10B981" },
  { Icon: Users,       title: "Expert Faculty",             desc: "Learn from PhD holders and industry practitioners with 15+ years experience.", color: "#F59E0B" },
  { Icon: Briefcase,   title: "Placement Support",          desc: "Dedicated career cell with 500+ industry partners for placements.", color: "#EF4444" },
  { Icon: TrendingUp,  title: "Affordable Fees",            desc: "EMI options, scholarships and fee waivers for meritorious students.", color: "#06B6D4" },
];

const stats = [
  { value: "5,000+",  label: "Students Enrolled",   color: "#2563EB" },
  { value: "50+",     label: "Expert Faculty",       color: "#7C3AED" },
  { value: "15+",     label: "Programmes",           color: "#10B981" },
  { value: "NAAC A++",label: "Accreditation Grade",  color: "#F59E0B" },
  { value: "2008",    label: "Year Established",     color: "#EF4444" },
];

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-5">
              <Pill label="NAAC A++ Accredited" color="#10B981" />
              <Pill label="UGC Approved" color="#F59E0B" />
            </div>
            <h1
              className="font-extrabold leading-tight mb-4"
              style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#1a2340", fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              Welcome to Your<br />Learning Journey
            </h1>
            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md">
              Explore programs, access resources, and achieve your goals with SCLAS Online Education.
            </p>
            <div className="flex flex-wrap gap-3">
              <PrimaryBtn onClick={() => setPage("programmes")} size="lg">
                Explore Programmes <ArrowRight size={16} className="inline ml-1" />
              </PrimaryBtn>
              <OutlineBtn onClick={() => setPage("apply")}>Apply Now</OutlineBtn>
            </div>
            <div className="flex flex-wrap gap-5 mt-8">
              {[
                { Icon: CheckCircle, text: "Interdisciplinary Learning" },
                { Icon: CheckCircle, text: "Dual Degree Options" },
                { Icon: CheckCircle, text: "Industry Internships" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-sm text-slate-600">
                  <Icon size={15} style={{ color: "#2563EB" }} /> {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero Card */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <Glass className="p-6 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: "#2563EB" }} />
              {/* Hero illustration — no external image dependency */}
              <div
                className="w-full rounded-xl mb-4 flex items-center justify-center gap-8 relative overflow-hidden"
                style={{
                  height: 220,
                  background: "linear-gradient(135deg, rgba(37,99,235,0.25) 0%, rgba(96,165,250,0.15) 50%, rgba(124,58,237,0.2) 100%)",
                  border: "1px solid rgba(96,165,250,0.18)",
                }}
              >
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #2563EB 0%, transparent 60%), radial-gradient(circle at 70% 50%, #7C3AED 0%, transparent 60%)" }} />
                {[
                  { Icon: GraduationCap, label: "5,000+\nGraduates",  color: "#60A5FA" },
                  { Icon: Award,          label: "NAAC\nA++",          color: "#A78BFA" },
                  { Icon: Globe,          label: "100%\nOnline",       color: "#34D399" },
                ].map(({ Icon, label, color }, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}35` }}>
                      <Icon size={26} style={{ color }} />
                    </div>
                    <span className="text-center text-[11px] font-semibold leading-tight" style={{ color, whiteSpace: "pre-line" }}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {stats.slice(0, 3).map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: `${s.color}14`, border: `1px solid ${s.color}28` }}>
                    <div className="text-slate-800 font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: s.color }}>{s.value}</div>
                    <div className="text-slate-500 text-[10px] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </Glass>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-6">
        <Glass className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center divide-x divide-white/[0.06]">
            {stats.map((s) => (
              <div key={s.label} className="px-4">
                <div className="font-extrabold text-xl" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: s.color }}>{s.value}</div>
                <div className="text-slate-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Glass>
      </section>

      {/* Advantages */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <SectionLabel>Why Choose SIMATS</SectionLabel>
          <h2 className="text-slate-800 text-3xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            The SIMATS Advantage
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">
            Join World Ranked SIMATS — an institution that combines academic excellence with cutting-edge online delivery.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {advantages.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Glass className="p-6 h-full" style={{ border: `1px solid ${a.color}25` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${a.color}18`, border: `1px solid ${a.color}28` }}>
                  <a.Icon size={20} style={{ color: a.color }} />
                </div>
                <h3 className="text-slate-800 font-semibold text-sm mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{a.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{a.desc}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Programme Highlight */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <SectionLabel>Featured Programme</SectionLabel>
            <h2 className="text-slate-800 text-3xl font-bold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              UGC Approved Online<br />B.Com Degree Programme
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              A 3-year Bachelor of Commerce programme designed for working professionals and fresh graduates. Gain industry-ready skills in accounting, finance, and business management — fully online.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: "Duration", value: "3 Years" },
                { label: "Mode", value: "100% Online" },
                { label: "Eligibility", value: "10+2 Pass" },
                { label: "Recognition", value: "UGC Approved" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <div className="text-slate-500 text-[10px]">{item.label}</div>
                  <div className="text-slate-800 font-semibold text-sm mt-0.5">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <PrimaryBtn onClick={() => setPage("programmes")}>View Full Details</PrimaryBtn>
              <OutlineBtn onClick={() => setPage("apply")}>Apply Now</OutlineBtn>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Glass className="overflow-hidden">
              {/* Programme illustration */}
              <div
                className="w-full flex items-center justify-center relative overflow-hidden"
                style={{
                  height: 220,
                  background: "linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(37,99,235,0.25) 100%)",
                }}
              >
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(37,99,235,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.25) 0%, transparent 50%)" }} />
                <div className="relative z-10 grid grid-cols-3 gap-5 px-8">
                  {[
                    { Icon: Laptop,       label: "Online\nLearning",  color: "#34D399" },
                    { Icon: BookOpen,     label: "6\nSemesters",      color: "#60A5FA" },
                    { Icon: Briefcase,    label: "Career\nReady",     color: "#A78BFA" },
                  ].map(({ Icon, label, color }, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${color}20`, border: `1px solid ${color}35` }}>
                        <Icon size={22} style={{ color }} />
                      </div>
                      <span className="text-center text-[10px] font-semibold leading-tight" style={{ color, whiteSpace: "pre-line" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={16} className="text-blue-600" />
                  <span className="text-slate-800 font-semibold text-sm">B.Com (Hons.) — Online</span>
                  <Pill label="Open" color="#10B981" />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Accounting","Finance","Taxation","Business Law","E-Commerce"].map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-lg text-slate-600" style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }}>{t}</span>
                  ))}
                </div>
              </div>
            </Glass>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "🔭", label: "Our Vision", color: "#2563EB",
              text: "To be a globally recognised leader in online higher education, delivering transformative, accessible, and industry-aligned academic programmes that empower learners worldwide to achieve their fullest potential.",
            },
            {
              icon: "🎯", label: "Our Mission", color: "#7C3AED",
              text: "To provide affordable, flexible, and high-quality education through innovative technology, enabling students to gain professional competencies, critical thinking skills, and ethical values essential for the evolving global workplace.",
            },
          ].map((item) => (
            <motion.div key={item.label} whileHover={{ y: -4 }}>
              <Glass className="p-8 h-full" style={{ border: `1px solid ${item.color}25` }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-slate-800 font-bold text-lg mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: item.color }}>{item.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links (Regulatory) */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionLabel>Regulatory & Compliance</SectionLabel>
        <h2 className="text-slate-800 text-2xl font-bold mb-6" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "UGC Approval",        Icon: Shield,       color: "#2563EB", page: "disclosures" as Page, hint: "UGC-DEB recognition details" },
            { label: "NAAC Certificate",    Icon: Award,        color: "#7C3AED", page: "disclosures" as Page, hint: "A++ accreditation & CGPA" },
            { label: "e-Samiksha Portal",   Icon: Globe,        color: "#10B981", page: "disclosures" as Page, hint: "UGC compliance status" },
            { label: "SIMATSOL Support",    Icon: Laptop,       color: "#F59E0B", page: "lms"         as Page, hint: "LMS login & student portal" },
            { label: "CIQA",               Icon: CheckCircle,  color: "#EF4444", page: "disclosures" as Page, hint: "Internal quality assurance" },
            { label: "CIQF",               Icon: FileText,     color: "#06B6D4", page: "disclosures" as Page, hint: "International quality framework" },
            { label: "Grievance Redressal", Icon: AlertCircle,  color: "#EC4899", page: "disclosures" as Page, hint: "Submit a grievance online" },
            { label: "Fee Refund Policy",   Icon: Download,     color: "#8B5CF6", page: "disclosures" as Page, hint: "Refund slabs & process" },
          ].map((l) => (
            <motion.button
              key={l.label}
              whileHover={{ y: -3, scale: 1.02 }}
              onClick={() => setPage(l.page)}
              className="glass-card flex items-center gap-3 p-4 rounded-xl text-left transition-all group"
            >
              <l.Icon size={18} style={{ color: l.color }} className="shrink-0" />
              <div className="min-w-0">
                <div className="text-slate-700 text-xs font-medium leading-tight">{l.label}</div>
                <div className="text-slate-500 text-[10px] mt-0.5 group-hover:text-slate-500 transition-colors">{l.hint}</div>
              </div>
              <ChevronRight size={12} className="ml-auto text-slate-600 group-hover:text-slate-500 shrink-0 transition-colors" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div
          className="rounded-[24px] p-10 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg,rgba(37,99,235,0.35),rgba(124,58,237,0.3))",
            border: "1px solid rgba(96,165,250,0.25)",
            boxShadow: "0 20px 60px rgba(37,99,235,0.2)",
          }}
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "#2563EB" }} />
          <h2 className="text-slate-800 text-3xl font-bold mb-3 relative" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Ready to Transform Your Career?
          </h2>
          <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm relative">
            Applications for the 2026–27 batch are now open. Seats are limited — apply today.
          </p>
          <div className="flex justify-center gap-3 relative">
            <PrimaryBtn onClick={() => setPage("apply")} size="lg">Apply for Free</PrimaryBtn>
            <OutlineBtn onClick={() => setPage("faq")}>Got Questions? See FAQ</OutlineBtn>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────

const leadership = [
  { name: "Dr. N.M. Veeraiyan",       role: "Chancellor",               initials: "NV", color: "#2563EB" },
  { name: "Dr. Gunita Arun Chandhok", role: "Principal",                initials: "GC", color: "#7C3AED" },
  { name: "Dr. S. Parveen Banu",      role: "Admission Coordinator",    initials: "PB", color: "#10B981" },
  { name: "Dr. B. R. Celia",          role: "Examination Coordinator",  initials: "BC", color: "#F59E0B" },
];

const milestones = [
  { year: "2008", event: "SIMATS established in Chennai, Tamil Nadu" },
  { year: "2012", event: "First batch of 500 students enrolled" },
  { year: "2015", event: "NAAC Accreditation — 'A' Grade achieved" },
  { year: "2018", event: "Online programmes launched across India" },
  { year: "2020", event: "B.Com UGC-approved online degree introduced" },
  { year: "2022", event: "NAAC upgraded to 'A++' — highest grade" },
  { year: "2024", event: "5,000+ students enrolled across programmes" },
  { year: "2026", event: "AI-powered LMS 2.0 launched" },
];

function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 space-y-16">
      {/* Hero */}
      <section id="about-hero" className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionLabel>About Us</SectionLabel>
          <h1 className="text-slate-800 text-4xl font-extrabold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            Saveetha Institute of Medical and Technical Sciences
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Founded in 2008, SIMATS is a deemed-to-be University under Section 3 of the UGC Act, 1956. Located in Thandalam, Chennai, SIMATS has grown into one of India's most recognised higher education institutions with NAAC A++ accreditation and a global NIRF ranking.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Our Online Education division was established to democratise access to quality higher education, offering fully UGC-approved degree programmes to students across India and abroad.
          </p>
          <div className="flex gap-3">
            <PrimaryBtn onClick={() => setPage("programmes")}>View Programmes</PrimaryBtn>
            <OutlineBtn onClick={() => setPage("apply")}>Apply Now</OutlineBtn>
          </div>
        </div>
        <Glass className="overflow-hidden">
          {/* Campus illustration */}
          <div
            className="w-full flex items-end justify-center relative overflow-hidden"
            style={{
              height: 280,
              background: "linear-gradient(180deg, rgba(8,15,30,0.2) 0%, rgba(37,99,235,0.18) 50%, rgba(8,15,30,0.6) 100%)",
            }}
          >
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 50% 30%, rgba(37,99,235,0.35) 0%, transparent 65%), radial-gradient(ellipse at 80% 80%, rgba(124,58,237,0.25) 0%, transparent 50%)" }} />
            {/* Stylised campus skyline */}
            <svg viewBox="0 0 600 200" className="w-full relative z-10 opacity-60" preserveAspectRatio="xMidYMax meet">
              <rect x="50"  y="80"  width="60"  height="120" rx="4" fill="rgba(96,165,250,0.35)" />
              <rect x="60"  y="50"  width="40"  height="30"  rx="2" fill="rgba(96,165,250,0.5)" />
              <rect x="160" y="60"  width="80"  height="140" rx="4" fill="rgba(167,139,250,0.3)" />
              <rect x="185" y="30"  width="30"  height="30"  rx="2" fill="rgba(167,139,250,0.5)" />
              <rect x="290" y="40"  width="100" height="160" rx="4" fill="rgba(96,165,250,0.4)" />
              <rect x="325" y="10"  width="30"  height="30"  rx="2" fill="rgba(96,165,250,0.6)" />
              <rect x="330" y="0"   width="10"  height="10"  rx="1" fill="rgba(96,165,250,0.8)" />
              <rect x="440" y="70"  width="70"  height="130" rx="4" fill="rgba(52,211,153,0.25)" />
              <rect x="460" y="45"  width="30"  height="25"  rx="2" fill="rgba(52,211,153,0.4)" />
              <rect x="530" y="90"  width="55"  height="110" rx="4" fill="rgba(96,165,250,0.3)" />
              <rect x="0"   y="140" width="600" height="60"  fill="rgba(8,15,30,0.5)" />
            </svg>
            <div className="absolute bottom-5 left-5 right-5 z-20 text-center">
              <span className="text-white/60 text-xs font-medium">SIMATS Campus, Thandalam, Chennai</span>
            </div>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            {[
              { label: "Established", value: "2008" },
              { label: "Accreditation", value: "NAAC A++" },
              { label: "Students", value: "5,000+" },
              { label: "Faculty", value: "50+ PhDs" },
            ].map((s) => (
              <div key={s.label} className="p-2 rounded-xl text-center" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.18)" }}>
                <div className="text-blue-600 font-bold text-sm">{s.value}</div>
                <div className="text-slate-500 text-[10px]">{s.label}</div>
              </div>
            ))}
          </div>
        </Glass>
      </section>

      {/* Leadership */}
      <section id="about-leadership">
        <SectionLabel>Leadership</SectionLabel>
        <h2 className="text-slate-800 text-2xl font-bold mb-8" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Our Leadership Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leadership.map((l, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
              <Glass className="p-5 text-center" style={{ border: `1px solid ${l.color}22` }}>
                {/* Avatar with initials — no external image */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl font-extrabold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${l.color}55, ${l.color}22)`,
                    border: `2px solid ${l.color}40`,
                    boxShadow: `0 8px 24px ${l.color}30`,
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}
                >
                  {l.initials}
                </div>
                <div className="text-slate-800 font-semibold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{l.name}</div>
                <div className="text-xs mt-1" style={{ color: l.color }}>{l.role}</div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Rankings */}
      <section id="about-rankings">
        <SectionLabel>Recognition</SectionLabel>
        <h2 className="text-slate-800 text-2xl font-bold mb-6" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Rankings & Accreditations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "NAAC", value: "A++", sub: "Highest Grade", color: "#10B981" },
            { label: "NIRF", value: "#42", sub: "University Rank", color: "#2563EB" },
            { label: "QS", value: "Top 5%", sub: "Asian Rankings", color: "#7C3AED" },
            { label: "UGC", value: "Approved", sub: "Recognised", color: "#F59E0B" },
            { label: "AICTE", value: "Approved", sub: "Technical", color: "#EF4444" },
            { label: "NBA", value: "Accredited", sub: "Engineering", color: "#06B6D4" },
          ].map((r) => (
            <Glass key={r.label} className="p-4 text-center" style={{ border: `1px solid ${r.color}28` }}>
              <div className="text-lg font-extrabold" style={{ color: r.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{r.value}</div>
              <div className="text-slate-800 text-xs font-semibold mt-1">{r.label}</div>
              <div className="text-slate-500 text-[10px] mt-0.5">{r.sub}</div>
            </Glass>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section id="about-milestones">
        <SectionLabel>Our Journey</SectionLabel>
        <h2 className="text-slate-800 text-2xl font-bold mb-8" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Key Milestones</h2>
        <div className="relative">
          <div className="absolute left-[76px] top-0 bottom-0 w-0.5" style={{ background: "linear-gradient(180deg,#2563EB,#7C3AED,transparent)" }} />
          <div className="space-y-5">
            {milestones.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-5">
                <div className="w-[76px] shrink-0 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: i % 2 === 0 ? "#2563EB" : "#7C3AED", boxShadow: `0 0 10px ${i % 2 === 0 ? "#2563EB" : "#7C3AED"}` }} />
                  <span className="text-blue-600 text-xs font-bold">{m.year}</span>
                </div>
                <Glass className="flex-1 px-5 py-3">
                  <p className="text-slate-700 text-sm">{m.event}</p>
                </Glass>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROGRAMMES PAGE ──────────────────────────────────────────

const curriculum = [
  { sem: "Sem I",   subjects: ["Financial Accounting","Business Mathematics","Business Communication","Computer Applications","Principles of Management"] },
  { sem: "Sem II",  subjects: ["Corporate Accounting","Business Statistics","Business Economics","Marketing Management","E-Commerce"] },
  { sem: "Sem III", subjects: ["Cost Accounting","Income Tax","Business Regulatory Framework","Financial Management","Entrepreneurship"] },
  { sem: "Sem IV",  subjects: ["Advanced Accounting","GST & Indirect Taxes","Banking & Insurance","Human Resource Management","Business Ethics"] },
  { sem: "Sem V",   subjects: ["Auditing","International Business","Investment & Portfolio Management","Supply Chain Management","Research Methodology"] },
  { sem: "Sem VI",  subjects: ["Strategic Management","Corporate Finance","Digital Marketing","Project Work","Comprehensive Viva Voce"] },
];

const feeTable = [
  { year: "Year 1", tuition: "₹25,000", exam: "₹3,000", total: "₹28,000" },
  { year: "Year 2", tuition: "₹25,000", exam: "₹3,000", total: "₹28,000" },
  { year: "Year 3", tuition: "₹25,000", exam: "₹3,000", total: "₹28,000" },
];

function ProgrammesPage({ setPage }: { setPage: (p: Page, section?: string) => void }) {
  const [selectedCourse, setSelectedCourse] = useState<{ sem: string; title: string; progress: number } | null>(null);
  const [courseProgress, setCourseProgress] = useState<{ [key: string]: number }>({
    "Semester I": 60,
    "Semester II": 30,
    "Semester III": 0
  });
  const [checkedTopics, setCheckedTopics] = useState<{ [key: string]: boolean }>({
    "topic-1-1": true, "topic-1-2": true, "topic-1-3": true,
    "topic-2-1": true, "topic-2-2": false, "topic-2-3": false
  });

  const handleTopicToggle = (courseKey: string, topicId: string, totalTopics: number) => {
    const nextChecked = { ...checkedTopics, [topicId]: !checkedTopics[topicId] };
    setCheckedTopics(nextChecked);

    // Calculate new progress percentage
    const courseTopics = Object.keys(nextChecked).filter(k => k.startsWith(`topic-${courseKey === "Semester I" ? 1 : courseKey === "Semester II" ? 2 : 3}-`));
    const completedCount = courseTopics.filter(k => nextChecked[k]).length;
    const percentage = Math.round((completedCount / totalTopics) * 100);

    setCourseProgress(prev => ({
      ...prev,
      [courseKey]: percentage
    }));
  };

  const menuItems = [
    { label: "Dashboard", icon: Laptop, page: "programmes" as Page, active: true },
    { label: "About SIMATS", icon: Users, page: "about" as Page, section: "about-hero" },
    { label: "Online Programme", icon: BookOpen, page: "programmes" as Page },
    { label: "LMS", icon: Shield, page: "lms" as Page },
    { label: "Apply Now", icon: FileText, page: "apply" as Page },
    { label: "FAQ", icon: HelpCircle, page: "faq" as Page },
  ];

  const quickLinks = [
    { label: "SIMATS Info", page: "about" as Page, section: "about-hero" },
    { label: "Leadership", page: "about" as Page, section: "about-leadership" },
    { label: "News", page: "home" as Page },
    { label: "Ranking & Recognition", page: "about" as Page, section: "about-rankings" },
    { label: "Milestones", page: "about" as Page, section: "about-milestones" },
  ];

  const quickAccess = [
    { label: "Live Classes", desc: "Join live sessions", Icon: Video },
    { label: "E-books", desc: "Access study materials", Icon: BookOpen },
    { label: "Recorded Videos", desc: "Watch anytime", Icon: Play },
    { label: "PPTs", desc: "Download presentations", Icon: Download },
    { label: "Question Bank", desc: "Practice and prepare", Icon: HelpCircle },
  ];

  const studentAccess = [
    { label: "Student Login", desc: "Access your student portal", Icon: User, page: "lms" as Page },
    { label: "Faculty Login", desc: "Access faculty portal", Icon: Users, page: "lms" as Page },
    { label: "Live Classes", desc: "Join live sessions", Icon: Video, page: "lms" as Page },
    { label: "Digital Resources", desc: "Access learning materials", Icon: Layers, page: "lms" as Page },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ─── Left Sidebar ────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
          <Glass className="p-4 flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3.5 mb-2 block">Menu</span>
            <div className="flex flex-col gap-0.5">
              {menuItems.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setPage(m.page, m.section)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                    m.active 
                      ? "sidebar-active" 
                      : "text-slate-600 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]"
                  }`}
                >
                  <m.icon size={15} className={m.active ? "text-[#c9a84c]" : "text-slate-400"} />
                  {m.label}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 my-4" />

            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3.5 mb-2 block">Quick Links</span>
            <div className="flex flex-col gap-0.5">
              {quickLinks.map((ql, i) => (
                <button
                  key={i}
                  onClick={() => setPage(ql.page, ql.section)}
                  className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a] transition-all flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] opacity-60" />
                  {ql.label}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 my-4" />

            <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-3.5 mb-3 block">Contact Us</span>
            <div className="px-3.5 space-y-2.5 text-[11px] text-slate-500">
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-[#c9a84c] shrink-0 mt-0.5" />
                <span>SIMATS, Thandalam, Chennai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#c9a84c] shrink-0" />
                <span>044 6672 1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#c9a84c] shrink-0" />
                <span className="truncate">info@sclas.saveetha.com</span>
              </div>
              <button 
                onClick={() => window.open("https://maps.app.goo.gl/yLzV8hYqS9X1T9kGA", "_blank")}
                className="w-full mt-2 py-2 rounded-xl text-xs font-bold border border-[rgba(201,168,76,0.3)] text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <MapPin size={12} /> View on Map
              </button>
            </div>
          </Glass>
        </div>

        {/* ─── Center Column ───────────────────────────────────────── */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Welcome Banner Card */}
          <Glass className="p-6 relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
            {/* Background design swirls */}
            <svg className="absolute right-0 top-0 h-full w-auto opacity-30 select-none pointer-events-none" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
              <path d="M200,160 Q240,80 160,40 Q120,20 80,60" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
              <path d="M220,170 Q260,90 180,45" stroke="#e8c96a" strokeWidth="1" fill="none" />
            </svg>
            
            <div className="flex-1 space-y-2 z-10 text-center sm:text-left">
              <h1 className="font-extrabold text-slate-800 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "24px" }}>
                Welcome to Your Learning Journey
              </h1>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                Explore programs, access resources, and achieve your goals with SIMATS Online Education.
              </p>
            </div>
            
            {/* Cap illustration matching screenshot */}
            <div className="relative shrink-0 w-40 h-32 flex items-center justify-center z-10">
              <svg viewBox="0 0 200 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Book stack */}
                <rect x="45" y="110" width="110" height="16" rx="3" fill="#b8c4d8" />
                <rect x="50" y="95" width="100" height="16" rx="3" fill="#8fa3c0" />
                {/* Book spines */}
                <rect x="45" y="110" width="8" height="16" rx="2" fill="#9aaec7" />
                <rect x="50" y="95" width="8" height="16" rx="2" fill="#7a95b8" />
                {/* Graduation cap base/mortarboard */}
                <ellipse cx="100" cy="72" rx="46" ry="10" fill="#2d3280" />
                {/* Cap top */}
                <rect x="75" y="45" width="50" height="28" rx="4" fill="#2d3280" />
                {/* Cap highlight */}
                <rect x="77" y="47" width="46" height="5" rx="2" fill="#4d53a0" opacity="0.4" />
                {/* Tassel string */}
                <line x1="140" y1="70" x2="148" y2="92" stroke="#c9a84c" strokeWidth="2" />
                <circle cx="148" cy="94" r="3" fill="#c9a84c" />
                {/* Tassel fringe */}
                <line x1="147" y1="97" x2="145" y2="105" stroke="#c9a84c" strokeWidth="1.5" />
                <line x1="149" y1="97" x2="151" y2="105" stroke="#c9a84c" strokeWidth="1.5" />
              </svg>
            </div>
          </Glass>

          {/* Your Programmes Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-slate-800 font-bold text-sm uppercase tracking-wide" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Your Programmes
              </h2>
              <button onClick={() => setPage("programmes")} className="text-xs text-[#c9a84c] hover:underline font-bold flex items-center gap-0.5">
                View All Programmes <ChevronRight size={12} className="mt-0.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { sem: "Semester I", title: "Financial Accounting", total: 3, progress: courseProgress["Semester I"] },
                { sem: "Semester II", title: "Business Statistics", total: 3, progress: courseProgress["Semester II"] },
                { sem: "Semester III", title: "Cost Accounting", total: 3, progress: courseProgress["Semester III"] }
              ].map((course, idx) => (
                <Glass key={idx} className="glass-card p-5 relative flex flex-col justify-between h-56">
                  {/* Card options dots */}
                  <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>

                  <div className="space-y-2">
                    {/* Circle icon */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#fbf5e6] border border-amber-100 mb-3">
                      {idx === 0 && <GraduationCap size={22} className="text-[#c9a84c]" />}
                      {idx === 1 && <BarChart2 size={20} className="text-[#c9a84c]" />}
                      {idx === 2 && <BookOpen size={20} className="text-[#c9a84c]" />}
                    </div>

                    <div className="text-[10px] font-extrabold text-[#c9a84c] tracking-wider uppercase">{course.sem}</div>
                    <div className="text-slate-800 font-bold text-xs leading-snug">{course.title}</div>
                  </div>

                  <div className="space-y-3 mt-4">
                    {/* Progress Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold">
                        <span>Progress</span>
                        <span>{course.progress}% Complete</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${course.progress}%`,
                            background: idx === 0 ? "linear-gradient(90deg, #c9a84c, #e8d5a3)" : idx === 1 ? "linear-gradient(90deg, #7c3aed, #a78bfa)" : "linear-gradient(90deg, #10b981, #34d399)"
                          }} 
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedCourse({ sem: course.sem, title: course.title, progress: course.progress })}
                      className="w-full py-2 rounded-xl text-center text-xs font-bold text-white transition-all shadow-md"
                      style={{ 
                        background: course.progress > 0 ? "linear-gradient(135deg,#233c7b,#1e3a8a)" : "linear-gradient(135deg,#344e41,#2a3f35)",
                        boxShadow: "0 2px 8px rgba(30,58,138,0.2)"
                      }}
                    >
                      {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                    </button>
                  </div>
                </Glass>
              ))}
            </div>
          </section>

          {/* Quick Access Section */}
          <section className="space-y-4">
            <h2 className="text-slate-800 font-bold text-sm uppercase tracking-wide px-1" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Quick Access
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {quickAccess.map((qa, i) => (
                <Glass key={i} className="glass-card p-3 flex flex-col items-center text-center cursor-pointer justify-center h-28 gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#fbf5e6] border border-amber-100 shrink-0">
                    <qa.Icon size={18} className="text-[#c9a84c]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-800 font-bold text-[10px] leading-tight truncate">{qa.label}</div>
                    <div className="text-slate-400 text-[8px] mt-0.5 truncate">{qa.desc}</div>
                  </div>
                </Glass>
              ))}
            </div>
          </section>
          
        </div>

        {/* ─── Right Sidebar ───────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
          
          {/* Student Access widget */}
          <Glass className="p-5 space-y-4">
            <h3 className="text-slate-800 font-bold text-xs uppercase tracking-wide border-b border-slate-100 pb-2 flex items-center gap-1.5" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              <User size={14} className="text-[#c9a84c]" /> Student Access
            </h3>
            <div className="space-y-3">
              {studentAccess.map((sa, i) => (
                <button
                  key={i}
                  onClick={() => setPage(sa.page)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left group"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fbf5e6] border border-amber-50 shrink-0">
                    <sa.Icon size={16} className="text-[#c9a84c]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-slate-800 font-bold text-xs group-hover:text-blue-600 transition-colors leading-tight">{sa.label}</div>
                    <div className="text-slate-400 text-[9px] mt-0.5 truncate">{sa.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </Glass>

          {/* B.Com Course card */}
          <Glass className="p-5 flex flex-col justify-between h-64 text-center relative overflow-hidden">
            {/* Swirl background */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-amber-500/5 blur-xl" />
            <div className="absolute -bottom-12 -left-12 w-28 h-28 rounded-full bg-blue-500/5 blur-xl" />

            <div className="space-y-2 relative z-10">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#fbf5e6] border border-amber-100 mx-auto mb-2">
                <GraduationCap size={24} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-slate-800 font-extrabold text-base leading-tight" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>B.Com</h3>
              <p className="text-[#c9a84c] text-[10px] font-bold tracking-wider uppercase">Bachelor of Commerce</p>
              <p className="text-slate-400 text-xs max-w-[200px] mx-auto leading-relaxed mt-1">
                Build your future with standard, high-quality, fully online UGC-approved business education.
              </p>
            </div>

            <button 
              onClick={() => setPage("programmes")}
              className="w-full mt-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md relative z-10"
              style={{ background: "linear-gradient(135deg,#c9a84c,#e8d5a3)", boxShadow: "0 2px 10px rgba(201,168,76,0.2)" }}
            >
              Know More
            </button>
          </Glass>

          {/* Frequently Asked Questions card */}
          <Glass className="p-5 flex flex-col justify-between h-56 text-center relative overflow-hidden">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#fbf5e6] border border-amber-100 mx-auto mb-2 text-xl font-bold text-[#c9a84c]" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                ?
              </div>
              <h3 className="text-slate-800 font-bold text-sm" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Frequently Asked Questions</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-[180px] mx-auto mt-1">
                Find clear answers to commonly asked questions about our online courses.
              </p>
            </div>

            <button 
              onClick={() => setPage("faq")}
              className="w-full mt-4 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              Go to FAQ
            </button>
          </Glass>

        </div>

      </div>

      {/* ─── Interactive Mock Course Learning Drawer ───────────────── */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setSelectedCourse(null)} />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xl h-full shadow-2xl glass-dropdown overflow-hidden flex flex-col"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.4)" }}
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-[#c9a84c] tracking-widest uppercase">{selectedCourse.sem}</span>
                  <h3 className="text-slate-800 font-bold text-base leading-tight mt-0.5">{selectedCourse.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Mock Video Player */}
                <div className="rounded-2xl overflow-hidden relative shadow-lg aspect-video bg-slate-900 flex items-center justify-center text-white">
                  {/* Decorative background image grid */}
                  <div className="absolute inset-0 opacity-20 bg-cover" style={{ backgroundImage: "radial-gradient(circle, #2d3280 10%, transparent 11%)", backgroundSize: "12px 12px" }} />
                  
                  <div className="text-center z-10 space-y-2">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 cursor-pointer mx-auto transition-transform hover:scale-105 active:scale-95 shadow-md">
                      <Play size={22} fill="white" className="text-white ml-1" />
                    </div>
                    <p className="text-xs font-semibold text-white/90">Unit 1: Introduction Lecture video</p>
                    <p className="text-[10px] text-white/60">Duration: 42:18 mins</p>
                  </div>
                </div>

                {/* Checklist Course Syllabus */}
                <div className="space-y-3.5">
                  <h4 className="text-slate-800 font-bold text-xs uppercase tracking-wider">Course Curriculum Topics</h4>
                  <p className="text-[11px] text-slate-500">Check topics to complete tasks and watch your progress update in the dashboard live!</p>
                  
                  <div className="space-y-2.5">
                    {[
                      { id: "1", topic: "Introduction to Core Concepts", desc: "Foundational definitions and framework overview." },
                      { id: "2", topic: "Regulatory Standards and Principles", desc: "Legal requirements, compliance, and academic standards." },
                      { id: "3", topic: "Practical Applications & Case Studies", desc: "Hands-on exercises, analysis, and problem-solving." }
                    ].map((topic) => {
                      const topicId = `topic-${selectedCourse.sem === "Semester I" ? 1 : selectedCourse.sem === "Semester II" ? 2 : 3}-${topic.id}`;
                      const isChecked = !!checkedTopics[topicId];
                      return (
                        <div 
                          key={topic.id}
                          onClick={() => handleTopicToggle(selectedCourse.sem, topicId, 3)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                            isChecked 
                              ? "bg-[#c9a84c]/5 border-[#c9a84c]/30 text-slate-800" 
                              : "bg-white/40 border-slate-200/50 hover:bg-slate-50/50 text-slate-600"
                          }`}
                        >
                          <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all ${
                            isChecked 
                              ? "bg-[#c9a84c] border-[#c9a84c] text-white" 
                              : "border-slate-300"
                          }`}>
                            {isChecked && <CheckCircle size={12} className="text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-tight">{topic.topic}</div>
                            <div className="text-[10px] text-slate-400 mt-1 leading-normal">{topic.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Additional Study Materials */}
                <div className="space-y-3">
                  <h4 className="text-slate-800 font-bold text-xs uppercase tracking-wider">Study Resources</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { name: "Syllabus Handout", type: "PDF", size: "1.4 MB", Icon: FileText },
                      { name: "Lecture Slides", type: "PPTX", size: "4.8 MB", Icon: Download },
                      { name: "Practice MCQ Test", type: "Quiz", size: "15 questions", Icon: HelpCircle },
                      { name: "Core Textbook", type: "E-Book", size: "12.2 MB", Icon: BookOpen }
                    ].map((res, i) => (
                      <div key={i} className="p-3 rounded-xl border border-slate-100 hover:border-slate-200/60 bg-white/40 flex items-center justify-between group transition-colors">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <res.Icon size={16} className="text-[#c9a84c] shrink-0" />
                          <div className="min-w-0">
                            <div className="text-slate-700 text-xs font-semibold leading-tight truncate">{res.name}</div>
                            <div className="text-slate-400 text-[9px] mt-0.5 uppercase">{res.type} · {res.size}</div>
                          </div>
                        </div>
                        <button className="text-slate-400 group-hover:text-[#c9a84c] transition-colors p-1.5">
                          <Download size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 bg-white/30 backdrop-blur-md flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-bold">Progress Rate</div>
                  <div className="text-[#c9a84c] font-black text-sm">{courseProgress[selectedCourse.sem]}% Done</div>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1e3a8a] shadow-md hover:bg-[#233c7b] transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── LMS PAGE ─────────────────────────────────────────────────

const lmsResources = [
  { Icon: Video,     label: "Recorded Lectures", count: "180+ Videos",   color: "#2563EB" },
  { Icon: BookOpen,  label: "E-Books",            count: "45 Textbooks",  color: "#7C3AED" },
  { Icon: Layers,    label: "PPT Slides",         count: "300+ Slides",   color: "#10B981" },
  { Icon: FileText,  label: "Question Bank",      count: "2,000+ MCQs",  color: "#F59E0B" },
  { Icon: Play,      label: "Live Classes",       count: "3 / Week",      color: "#EF4444" },
  { Icon: Download,  label: "Study Materials",    count: "Free Download", color: "#06B6D4" },
];

const liveClasses = [
  { subject: "Financial Accounting", faculty: "Dr. Priya Rajan",   time: "Mon, Wed 10:00 AM", status: "live"     },
  { subject: "Business Statistics",  faculty: "Prof. Arjun Mehta", time: "Tue, Thu 02:00 PM", status: "upcoming" },
  { subject: "Cost Accounting",      faculty: "Dr. Kavitha S.",    time: "Fri 11:00 AM",       status: "upcoming" },
  { subject: "Income Tax Law",       faculty: "Prof. Ramesh T.",   time: "Sat 09:00 AM",       status: "upcoming" },
];

const studentScores = [
  { month: "Feb", score: 72 }, { month: "Mar", score: 78 },
  { month: "Apr", score: 75 }, { month: "May", score: 83 },
  { month: "Jun", score: 80 }, { month: "Jul", score: 88 },
];

const facultySubjects = [
  { name: "Financial Accounting", code: "BC101", students: 142, section: "Sec A", next: "Mon 10:00 AM", color: "#2563EB" },
  { name: "Cost Accounting",      code: "BC301", students: 128, section: "Sec B", next: "Wed 02:00 PM", color: "#7C3AED" },
  { name: "Business Statistics",  code: "BC201", students: 156, section: "Sec A", next: "Fri 11:00 AM", color: "#10B981" },
  { name: "Income Tax Law",       code: "BC401", students: 98,  section: "Sec C", next: "Sat 09:00 AM", color: "#F59E0B" },
];

const pendingGrading = [
  { subject: "Financial Accounting", task: "Unit 3 Assignment",    due: "Jul 14", graded: 47,  total: 142, color: "#2563EB" },
  { subject: "Cost Accounting",      task: "Mid-term Paper",       due: "Jul 16", graded: 89,  total: 128, color: "#7C3AED" },
  { subject: "Business Statistics",  task: "Case Study 2",         due: "Jul 18", graded: 12,  total: 156, color: "#10B981" },
];

const classAvgData = [
  { month: "Mar", avg: 71 }, { month: "Apr", avg: 75 },
  { month: "May", avg: 73 }, { month: "Jun", avg: 79 },
  { month: "Jul", avg: 82 },
];

// ── Student Dashboard ──────────────────────────────────────────
function StudentDashboard({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#2563EB,#60A5FA)" }}>RK</div>
            <h1 className="font-extrabold text-slate-800 text-xl" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Welcome back, Rajesh Kumar 👋
            </h1>
          </div>
          <p className="text-slate-500 text-sm">B.Com Year 2 · Reg: 22CSEB001 · Last login: Today 9:14 AM</p>
        </div>
        <button onClick={onSignOut}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors"
          style={{ border: "1px solid rgba(30,58,138,0.2)" }}>
          <X size={12} /> Sign Out
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Attendance",     value: "87%",     color: "#2563EB", Icon: CheckCircle },
          { label: "CGPA",           value: "8.6",     color: "#7C3AED", Icon: TrendingUp  },
          { label: "Courses Active", value: "4",       color: "#10B981", Icon: BookOpen    },
          { label: "Assignments Due",value: "2",       color: "#F59E0B", Icon: FileText    },
        ].map((s) => (
          <Glass key={s.label} className="glass-card p-4" style={{ borderColor: `${s.color}35` }}>
            <div className="flex items-center justify-between mb-2">
              <s.Icon size={16} style={{ color: s.color }} />
              <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
            </div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </Glass>
        ))}
      </div>

      {/* Live Classes */}
      <section>
        <h2 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <Play size={15} className="text-red-400" /> Today's Live Classes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {liveClasses.map((c, i) => (
            <div key={i}>
              <Glass className="glass-card p-4 h-full" style={{ borderColor: c.status === "live" ? "rgba(239,68,68,0.45)" : "rgba(255,255,255,0.7)" }}>
                {c.status === "live" && (
                  <div className="text-[9px] font-bold px-2 py-0.5 rounded-full mb-2 inline-block animate-pulse"
                    style={{ background: "rgba(239,68,68,0.2)", color: "#EF4444" }}>● LIVE NOW</div>
                )}
                <div className="text-slate-800 font-semibold text-xs mb-1">{c.subject}</div>
                <div className="text-slate-500 text-[11px]">{c.faculty}</div>
                <div className="text-slate-500 text-[10px] mt-1.5 flex items-center gap-1"><Clock size={10} />{c.time}</div>
                <motion.button whileHover={{ scale: 1.03 }}
                  className="mt-3 w-full py-1.5 rounded-xl text-[11px] font-semibold"
                  style={c.status === "live"
                    ? { background: "rgba(239,68,68,0.2)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.3)" }
                    : { background: "rgba(37,99,235,0.15)", color: "#60A5FA", border: "1px solid rgba(37,99,235,0.25)" }}>
                  {c.status === "live" ? "Join Now" : "Set Reminder"}
                </motion.button>
              </Glass>
            </div>
          ))}
        </div>
      </section>

      {/* Resources + Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <BookOpen size={15} className="text-blue-600" /> Digital Resources
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {lmsResources.map((r, i) => (
              <div key={i}>
                <Glass className="glass-card p-4 cursor-pointer h-full" style={{ borderColor: `${r.color}28` }}>
                  <r.Icon size={19} style={{ color: r.color }} className="mb-2" />
                  <div className="text-slate-800 text-xs font-semibold">{r.label}</div>
                  <div className="text-slate-500 text-[10px] mt-0.5">{r.count}</div>
                </Glass>
              </div>
            ))}
          </div>
        </div>
        <Glass className="p-5">
          <h3 className="text-slate-800 font-semibold text-sm mb-4 flex items-center gap-2">
            <BarChart2 size={13} className="text-purple-400" /> My Performance
          </h3>
          <ResponsiveContainer width="100%" height={155}>
            <AreaChart data={studentScores} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "10px", fontSize: "11px", color: "#1a1a2e" }} cursor={{ stroke: "rgba(255,255,255,0.06)" }} />
              <Area type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={2} fill="url(#sg)" dot={{ fill: "#2563EB", r: 3, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-slate-500">Avg. Score</span>
            <span className="text-blue-600 font-bold">79.3%</span>
          </div>
        </Glass>
      </div>

      {/* Support */}
      <section>
        <h2 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <HelpCircle size={15} className="text-blue-600" /> Student Support
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Technical Support",   desc: "LMS login issues, video playback, portal errors",   action: "Raise Ticket", color: "#2563EB" },
            { label: "Academic Counselling",desc: "Speak with a faculty mentor for academic guidance",  action: "Book Session", color: "#7C3AED" },
            { label: "Fee & Admissions",    desc: "Fee payment, scholarship queries, admission status", action: "Contact Now",  color: "#10B981" },
          ].map((s) => (
            <Glass key={s.label} className="p-5" style={{ border: `1px solid ${s.color}22` }}>
              <div className="text-slate-800 font-semibold text-sm mb-1">{s.label}</div>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{s.desc}</p>
              <button className="text-xs font-semibold px-4 py-1.5 rounded-xl"
                style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}28` }}>
                {s.action}
              </button>
            </Glass>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Faculty Dashboard ──────────────────────────────────────────
function FacultyDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [announce, setAnnounce] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#7C3AED,#A78BFA)" }}>PR</div>
            <h1 className="font-extrabold text-slate-800 text-xl" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              Welcome back, Dr. Priya Rajan 👋
            </h1>
          </div>
          <p className="text-slate-500 text-sm">Faculty — Financial Accounting · Dept. of Commerce · Last login: Today 8:45 AM</p>
        </div>
        <button onClick={onSignOut}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors"
          style={{ border: "1px solid rgba(30,58,138,0.2)" }}>
          <X size={12} /> Sign Out
        </button>
      </div>

      {/* Faculty Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Courses Teaching", value: "4",    color: "#7C3AED", Icon: BookOpen    },
          { label: "Total Students",   value: "524",  color: "#2563EB", Icon: Users       },
          { label: "Pending Reviews",  value: "47",   color: "#F59E0B", Icon: FileText    },
          { label: "Next Class",       value: "Mon",  color: "#10B981", Icon: Clock       },
        ].map((s) => (
          <Glass key={s.label} className="glass-card p-4" style={{ borderColor: `${s.color}35` }}>
            <div className="flex items-center justify-between mb-2">
              <s.Icon size={16} style={{ color: s.color }} />
              <span className="text-base font-bold" style={{ color: s.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.value}</span>
            </div>
            <div className="text-slate-500 text-xs">{s.label}</div>
          </Glass>
        ))}
      </div>

      {/* My Courses */}
      <section>
        <h2 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <Laptop size={15} className="text-purple-400" /> My Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facultySubjects.map((s, i) => (
            <div key={i}>
              <Glass className="glass-card p-4 h-full" style={{ borderColor: `${s.color}35` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}28` }}>
                    <BookOpen size={16} style={{ color: s.color }} />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${s.color}18`, color: s.color }}>{s.code}</span>
                </div>
                <div className="text-slate-800 font-semibold text-xs mb-1 leading-tight">{s.name}</div>
                <div className="text-slate-500 text-[10px]">{s.section} · {s.students} students</div>
                <div className="text-slate-500 text-[10px] mt-1.5 flex items-center gap-1">
                  <Clock size={9} /> Next: {s.next}
                </div>
                <div className="flex gap-1.5 mt-3">
                  <motion.button whileHover={{ scale: 1.04 }}
                    className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold"
                    style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}25` }}>
                    Start Class
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04 }}
                    className="flex-1 py-1.5 rounded-lg text-[10px] font-semibold text-slate-600"
                    style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.12)" }}>
                    Materials
                  </motion.button>
                </div>
              </Glass>
            </div>
          ))}
        </div>
      </section>

      {/* Pending Grading + Class Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending submissions */}
        <div className="lg:col-span-2">
          <h2 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
            <FileText size={15} className="text-yellow-400" /> Pending Submissions to Grade
          </h2>
          <div className="space-y-3">
            {pendingGrading.map((p, i) => (
              <Glass key={i} className="glass-card p-4" style={{ borderColor: `${p.color}35` }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}28` }}>
                    <FileText size={16} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-slate-800 font-semibold text-sm">{p.task}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full text-slate-600"
                        style={{ background: "rgba(30,58,138,0.08)" }}>{p.subject}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(30,58,138,0.1)" }}>
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${Math.round((p.graded / p.total) * 100)}%`, background: p.color }} />
                      </div>
                      <span className="text-slate-500 text-[11px] shrink-0">{p.graded}/{p.total} graded</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-slate-500 text-[10px]">Due {p.due}</div>
                    <motion.button whileHover={{ scale: 1.04 }}
                      className="mt-1.5 px-3 py-1 rounded-lg text-[10px] font-semibold"
                      style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}28` }}>
                      Grade Now
                    </motion.button>
                  </div>
                </div>
              </Glass>
            ))}
          </div>
        </div>

        {/* Class avg performance */}
        <Glass className="p-5">
          <h3 className="text-slate-800 font-semibold text-sm mb-4 flex items-center gap-2">
            <BarChart2 size={13} className="text-purple-400" /> Class Avg. Score
          </h3>
          <ResponsiveContainer width="100%" height={155}>
            <AreaChart data={classAvgData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#7C3AED" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} domain={[60, 100]} />
              <Tooltip contentStyle={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "10px", fontSize: "11px", color: "#1a1a2e" }} cursor={{ stroke: "rgba(255,255,255,0.06)" }} />
              <Area type="monotone" dataKey="avg" stroke="#7C3AED" strokeWidth={2} fill="url(#fg)" dot={{ fill: "#7C3AED", r: 3, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-slate-500">Latest Avg.</span>
            <span className="font-bold" style={{ color: "#A78BFA" }}>82%</span>
          </div>
        </Glass>
      </div>

      {/* Faculty Quick Actions */}
      <section>
        <h2 className="text-slate-800 font-bold text-base mb-4 flex items-center gap-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <Zap size={15} className="text-blue-600" /> Quick Actions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Upload Materials */}
          <Glass className="p-5" style={{ border: "1px solid rgba(37,99,235,0.22)" }}>
            <h3 className="text-slate-800 font-semibold text-sm mb-3 flex items-center gap-2">
              <Upload size={14} className="text-blue-600" /> Upload Study Material
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <select className="glass-input text-xs px-3 py-2 rounded-xl outline-none">
                {facultySubjects.map(s => <option key={s.code}>{s.name}</option>)}
              </select>
              <select className="glass-input text-xs px-3 py-2 rounded-xl outline-none">
                <option>Lecture Notes</option>
                <option>PPT Slides</option>
                <option>Assignment</option>
                <option>Question Bank</option>
              </select>
            </div>
            <div className="flex items-center justify-center rounded-xl p-6 mb-3 cursor-pointer hover:bg-blue-50/50 transition-colors"
              style={{ border: "2px dashed rgba(37,99,235,0.3)" }}>
              <div className="text-center">
                <Upload size={20} className="text-blue-600 mx-auto mb-1" />
                <span className="text-slate-500 text-xs">Click to upload or drag & drop</span>
              </div>
            </div>
            <PrimaryBtn size="sm">Upload File</PrimaryBtn>
          </Glass>

          {/* Post Announcement */}
          <Glass className="p-5" style={{ border: "1px solid rgba(124,58,237,0.22)" }}>
            <h3 className="text-slate-800 font-semibold text-sm mb-3 flex items-center gap-2">
              <Send size={14} className="text-purple-400" /> Post Announcement
            </h3>
            <select className="glass-input w-full text-xs px-3 py-2 rounded-xl outline-none mb-2">
              <option>All My Students</option>
              {facultySubjects.map(s => <option key={s.code}>{s.name} — {s.section}</option>)}
            </select>
            <textarea
              value={announce}
              onChange={e => setAnnounce(e.target.value)}
              placeholder="Type your announcement here…"
              rows={4}
              className="glass-input w-full text-xs px-3 py-2.5 rounded-xl outline-none resize-none mb-3"
            />
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)" }}>
              <Send size={12} /> Post to Students
            </motion.button>
          </Glass>
        </div>
      </section>
    </div>
  );
}

// ── LMS Page (login gate) ──────────────────────────────────────
function LMSPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState<"student" | "faculty">("student");
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  if (loggedIn) {
    return role === "student"
      ? <StudentDashboard onSignOut={() => setLoggedIn(false)} />
      : <FacultyDashboard onSignOut={() => setLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen pt-20 pb-16">

      {/* ── Hero Banner ── */}
      <div className="w-full overflow-hidden" style={{
        background: "rgba(255,255,255,0.42)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        borderBottom: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between" style={{ minHeight: 200 }}>
          {/* Left text */}
          <div className="py-10 max-w-sm md:max-w-md z-10 relative">
            <h1 className="font-extrabold leading-tight mb-3" style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "#1a2340",
            }}>
              Welcome to Your<br />Learning Journey
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Explore programs, access resources,<br className="hidden sm:block" />
              and achieve your goals with<br className="hidden sm:block" />
              SCLAS Online Education.
            </p>
          </div>

          {/* Right — graduation cap illustration + decorative swirls */}
          <div className="relative flex-shrink-0 hidden sm:block" style={{ width: 280, height: 180 }}>
            {/* Decorative gold swirl lines */}
            <svg viewBox="0 0 280 180" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M200,160 Q240,80 160,40 Q120,20 80,60" stroke="#c9a84c" strokeWidth="1.5" fill="none" opacity="0.35" />
              <path d="M220,170 Q260,90 180,45 Q135,22 90,65" stroke="#c9a84c" strokeWidth="1" fill="none" opacity="0.22" />
              <path d="M180,170 Q230,100 155,55 Q115,30 70,70" stroke="#e8c96a" strokeWidth="1" fill="none" opacity="0.18" />
              <circle cx="75" cy="75" r="3" fill="#c9a84c" opacity="0.35" />
              <circle cx="95" cy="55" r="2" fill="#c9a84c" opacity="0.25" />
              <circle cx="115" cy="85" r="1.5" fill="#c9a84c" opacity="0.2" />
            </svg>
            {/* Graduation cap + books SVG illustration */}
            <svg viewBox="0 0 200 160" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Books stack */}
              <rect x="45" y="110" width="110" height="18" rx="3" fill="#b8c4d8" />
              <rect x="50" y="95" width="100" height="18" rx="3" fill="#8fa3c0" />
              <rect x="55" y="80" width="90" height="18" rx="3" fill="#7490b3" />
              {/* Book spines */}
              <rect x="45" y="110" width="8" height="18" rx="2" fill="#9aaec7" />
              <rect x="50" y="95" width="8" height="18" rx="2" fill="#7a95b8" />
              <rect x="55" y="80" width="8" height="18" rx="2" fill="#6080a8" />
              {/* Graduation cap base/mortarboard */}
              <ellipse cx="100" cy="75" rx="52" ry="10" fill="#1e2d4a" />
              {/* Cap top */}
              <rect x="70" y="45" width="60" height="32" rx="4" fill="#1e2d4a" />
              {/* Cap highlight */}
              <rect x="72" y="47" width="56" height="6" rx="2" fill="#2d3f60" opacity="0.5" />
              {/* Tassel string */}
              <line x1="148" y1="74" x2="155" y2="100" stroke="#c9a84c" strokeWidth="2" />
              <circle cx="155" cy="103" r="4" fill="#c9a84c" />
              {/* Tassel fringe */}
              <line x1="153" y1="107" x2="150" y2="118" stroke="#c9a84c" strokeWidth="1.5" />
              <line x1="155" y1="107" x2="155" y2="120" stroke="#c9a84c" strokeWidth="1.5" />
              <line x1="157" y1="107" x2="160" y2="118" stroke="#c9a84c" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Login Form ── */}
      <div className="flex justify-center px-4 mt-10">
        <div className="w-full max-w-md">
          <Glass className="p-8">
            {/* Role toggle */}
            <div className="flex p-1 rounded-xl mb-6" style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }}>
              {(["student", "faculty"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
                  style={role === r
                    ? { background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }
                    : { color: "#64748b" }}
                >
                  {r === "student" ? <GraduationCap size={15} /> : <Users size={15} />}
                  {r}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-slate-500 text-xs mb-1.5 block">
                  {role === "student" ? "Register Number / Email" : "Faculty Email"}
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === "student" ? "22CSEB001@simats.ac.in" : "faculty@simats.ac.in"}
                    className="glass-input w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 text-xs mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="Enter your password"
                    className="glass-input w-full pl-9 pr-10 py-2.5 text-sm rounded-xl outline-none"
                  />
                  <button onClick={() => setShowPwd((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                    {showPwd ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer select-none">
                  <input type="checkbox" className="rounded accent-blue-500" /> Remember me
                </label>
                <button className="text-blue-600 hover:underline">Forgot password?</button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setLoggedIn(true)}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#2563EB,#3B82F6)", boxShadow: "0 4px 20px rgba(37,99,235,0.4)" }}
              >
                Sign In as {role === "student" ? "Student" : "Faculty"}
              </motion.button>
            </div>

            <p className="text-slate-500 text-[11px] text-center mt-5">
              New student?{" "}
              <button className="text-blue-600 hover:underline">Apply for admission</button>
            </p>
          </Glass>
        </div>
      </div>
    </div>
  );
}

// ─── APPLY PAGE ───────────────────────────────────────────────

function ApplyPage({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", gender: "", state: "", school: "", year: "", marks: "", stream: "", declaration: false });

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const steps = ["Personal Details", "Academic Details", "Declaration & Submit"];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-24">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(16,185,129,0.2)", border: "2px solid rgba(16,185,129,0.4)" }}>
            <CheckCircle size={36} className="text-blue-600" />
          </div>
          <h2 className="text-slate-800 text-2xl font-bold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Application Submitted!</h2>
          <p className="text-slate-600 text-sm mb-2">Your application has been received. Reference ID: <span className="text-blue-600 font-bold">SIMATS-2026-{Math.floor(Math.random() * 90000) + 10000}</span></p>
          <p className="text-slate-500 text-xs mb-8">We will review your application and send a confirmation email to <span className="text-slate-700">{form.email || "your email"}</span> within 2 working days.</p>
          <div className="flex justify-center gap-3">
            <PrimaryBtn onClick={() => setPage("lms")}>Go to Student Portal</PrimaryBtn>
            <OutlineBtn onClick={() => setPage("home")}>Back to Home</OutlineBtn>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pt-24 pb-16">
      <div className="text-center mb-8">
        <SectionLabel>Admissions 2026–27</SectionLabel>
        <h1 className="text-slate-800 text-3xl font-extrabold" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Apply for B.Com (Online)</h1>
        <p className="text-slate-500 text-sm mt-2">Complete your application in 3 simple steps. Free to apply.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={step > i + 1
                  ? { background: "#10B981", color: "#fff" }
                  : step === i + 1
                  ? { background: "linear-gradient(135deg,#2563EB,#3B82F6)", color: "#fff", boxShadow: "0 0 16px rgba(37,99,235,0.5)" }
                  : { background: "rgba(30,58,138,0.06)", color: "#64748b", border: "1px solid rgba(30,58,138,0.12)" }}
              >
                {step > i + 1 ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-[10px] mt-1 text-center ${step >= i + 1 ? "text-blue-600" : "text-slate-600"}`}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mb-4" style={{ background: step > i + 1 ? "#10B981" : "rgba(30,58,138,0.12)" }} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <Glass className="p-7">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-slate-800 font-semibold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Personal Details</h3>
                {[
                  { label: "Full Name", key: "name", placeholder: "As per 10th marksheet", type: "text" },
                  { label: "Email Address", key: "email", placeholder: "your@email.com", type: "email" },
                  { label: "Mobile Number", key: "phone", placeholder: "+91 XXXXX XXXXX", type: "tel" },
                  { label: "Date of Birth", key: "dob", placeholder: "", type: "date" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-slate-500 text-xs mb-1.5 block">{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key as keyof typeof form] as string}
                      onChange={(e) => update(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="glass-input w-full px-4 py-2.5 text-sm rounded-xl outline-none"
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-500 text-xs mb-1.5 block">Gender</label>
                    <select value={form.gender} onChange={(e) => update("gender", e.target.value)}
                      className="glass-input w-full px-4 py-2.5 text-sm rounded-xl outline-none">
                      <option value="">Select</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs mb-1.5 block">State</label>
                    <select value={form.state} onChange={(e) => update("state", e.target.value)}
                      className="glass-input w-full px-4 py-2.5 text-sm rounded-xl outline-none">
                      <option value="">Select State</option>
                      {["Tamil Nadu","Karnataka","Maharashtra","Delhi","Kerala","Andhra Pradesh","Telangana","Gujarat","Rajasthan","Others"].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-slate-800 font-semibold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Academic Details</h3>
                {[
                  { label: "School / College Name", key: "school", placeholder: "Name of your 12th standard institution" },
                  { label: "Year of Passing (12th)", key: "year", placeholder: "e.g. 2024" },
                  { label: "Aggregate Marks (%)", key: "marks", placeholder: "e.g. 72.5" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-slate-500 text-xs mb-1.5 block">{f.label}</label>
                    <input
                      value={form[f.key as keyof typeof form] as string}
                      onChange={(e) => update(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="glass-input w-full px-4 py-2.5 text-sm rounded-xl outline-none"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-slate-500 text-xs mb-1.5 block">Stream (12th)</label>
                  <select value={form.stream} onChange={(e) => update("stream", e.target.value)}
                    className="glass-input w-full px-4 py-2.5 text-sm rounded-xl outline-none">
                    <option value="">Select Stream</option>
                    <option>Commerce</option><option>Science</option><option>Arts / Humanities</option><option>Vocational</option>
                  </select>
                </div>
                <div className="p-4 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <div className="text-blue-600 text-xs font-semibold mb-1 flex items-center gap-1"><CheckCircle size={12} /> You are Eligible</div>
                  <p className="text-slate-500 text-xs">Based on your stream, you meet the basic eligibility for B.Com (Online). Apply to confirm your seat.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h3 className="text-slate-800 font-semibold mb-4" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Review & Submit</h3>
                <div className="space-y-2 p-4 rounded-xl" style={{ background: "rgba(30,58,138,0.04)", border: "1px solid rgba(30,58,138,0.1)" }}>
                  {[
                    ["Programme", "B.Com (Hons.) — Online"],
                    ["Name", form.name || "—"],
                    ["Email", form.email || "—"],
                    ["Phone", form.phone || "—"],
                    ["12th Marks", form.marks ? `${form.marks}%` : "—"],
                    ["Stream", form.stream || "—"],
                    ["State", form.state || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs">
                      <span className="text-slate-500">{k}</span>
                      <span className="text-slate-700">{v}</span>
                    </div>
                  ))}
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.declaration}
                    onChange={(e) => update("declaration", e.target.checked)}
                    className="mt-0.5 rounded"
                  />
                  <span className="text-slate-500 text-xs leading-relaxed">
                    I hereby declare that all information provided is true and correct to the best of my knowledge. I agree to the <button className="text-blue-600 hover:underline">Terms & Conditions</button> and <button className="text-blue-600 hover:underline">Privacy Policy</button> of SIMATS Online Education.
                  </span>
                </label>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <button onClick={() => setStep((v) => v - 1)} className="text-slate-500 text-sm hover:text-slate-800 flex items-center gap-1.5 px-4 py-2 rounded-xl hover:bg-amber-50 transition-colors">
                  ← Back
                </button>
              ) : <div />}
              {step < 3 ? (
                <PrimaryBtn onClick={() => setStep((v) => v + 1)}>
                  Continue <ArrowRight size={14} className="inline ml-1" />
                </PrimaryBtn>
              ) : (
                <PrimaryBtn onClick={() => { if (form.declaration) setSubmitted(true); }}>
                  <Send size={14} className="inline mr-1.5" /> Submit Application
                </PrimaryBtn>
              )}
            </div>
          </Glass>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── FAQ PAGE ─────────────────────────────────────────────────

const faqs = [
  { q: "Is the B.Com degree recognised by UGC and employers?", a: "Yes. The B.Com (Hons.) Online degree from SIMATS is fully approved by the University Grants Commission (UGC) and recognised by all central and state government employers, PSUs, and private sector companies across India." },
  { q: "What is the admission process for the online B.Com programme?", a: "The process is simple: fill the online application form, upload required documents (10th & 12th marksheets, ID proof, photograph), pay the application fee (₹500), and receive your admission confirmation within 2 working days. No entrance exam is required." },
  { q: "Can I pursue this course while working full-time?", a: "Absolutely. The programme is designed for working professionals. All lectures are pre-recorded and available 24/7. Live classes are held on weekends. There are no mandatory physical attendance requirements." },
  { q: "What are the fee payment options?", a: "You can pay the annual fee of ₹28,000 as a lump sum or opt for semester-wise payment (₹14,000 per semester). EMI options starting from ₹2,500/month are available through our banking partners. Scholarships up to 50% are available for meritorious students." },
  { q: "How are examinations conducted?", a: "Examinations are conducted online through our proctored LMS platform at the end of each semester. Students appear from home using a webcam. Question papers include MCQs, short answers, and case studies. Results are declared within 45 days." },
  { q: "Will I receive a physical degree certificate?", a: "Yes. Upon successful completion of all 6 semesters and passing all examinations, you will receive a physical degree certificate by courier. You will also receive a digital certificate that can be verified online using a QR code." },
  { q: "Is placement assistance provided?", a: "Yes. Our dedicated Career Cell provides resume-building workshops, mock interviews, and connects students with our 500+ industry partners. While placement is not guaranteed, we have an 85% placement record for students who actively participate." },
  { q: "What technical requirements are needed to access the LMS?", a: "You need a laptop or desktop with a modern browser (Chrome/Firefox), a stable internet connection (4G or broadband), a webcam for live classes and exams, and a microphone. A smartphone can be used for viewing lectures but is not recommended for examinations." },
  { q: "Can I transfer credits from another university?", a: "Credit transfer is possible for students who have completed equivalent courses at another UGC-recognised institution. Applications for credit transfer must be submitted within 30 days of admission and are subject to approval by the Academic Council." },
  { q: "What is the refund policy if I withdraw?", a: "Refund policy follows UGC guidelines: full refund (minus ₹1,000 processing fee) if withdrawn before the commencement date, 80% refund within 15 days of commencement, 50% within 30 days, and no refund after 30 days. See the Fee Refund Policy document for full details." },
];

function FAQPage({ setPage }: { setPage: (p: Page) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <SectionLabel>Support</SectionLabel>
        <h1 className="text-slate-800 text-3xl font-extrabold mb-3" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Frequently Asked Questions
        </h1>
        <p className="text-slate-500 text-sm mb-6">Everything you need to know about SIMATS Online Education.</p>
        <div className="relative max-w-sm mx-auto">
          <HelpCircle size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl text-slate-700 placeholder-slate-500 outline-none"
            style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }}
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filtered.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Glass
              className="overflow-hidden"
              style={open === i ? { border: "1px solid rgba(37,99,235,0.35)", boxShadow: "0 8px 30px rgba(37,99,235,0.15)" } : {}}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-start gap-4 p-5 text-left"
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all"
                  style={open === i
                    ? { background: "rgba(37,99,235,0.15)", color: "#2563EB" }
                    : { background: "rgba(30,58,138,0.06)", color: "#64748b" }}
                >
                  <ChevronDown size={13} className={`transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
                </div>
                <span
                  className="text-sm font-medium flex-1 transition-colors"
                  style={{ color: open === i ? "#1e3a8a" : "#475569", fontFamily: "'Plus Jakarta Sans',sans-serif" }}
                >
                  {f.q}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-[3.75rem]">
                      <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Glass>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">No matching questions found.</div>
        )}
      </div>

      {/* Still have questions */}
      <div
        className="mt-10 p-8 rounded-[20px] text-center"
        style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.22)" }}
      >
        <Mail size={24} className="text-blue-600 mx-auto mb-3" />
        <h3 className="text-slate-800 font-semibold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Still have questions?
        </h3>
        <p className="text-slate-500 text-xs mb-4">Our admissions team is available Mon–Sat, 9 AM – 1 PM</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <PrimaryBtn onClick={() => setPage("apply")}>Apply Now</PrimaryBtn>
          <OutlineBtn onClick={() => setPage("home")}>Contact Admissions</OutlineBtn>
        </div>
      </div>
    </div>
  );
}

// ─── DISCLOSURES PAGE ─────────────────────────────────────────

function DisclosuresPage({ setPage, initialSection = "ugc" }: { setPage: (p: Page) => void; initialSection?: string }) {
  const [grievanceForm, setGrievanceForm] = useState({ name: "", reg: "", category: "Academic", email: "", desc: "" });
  const [submitted, setSubmitted] = useState(false);

  const sections = [
    { id: "ugc",       label: "UGC Approval",        Icon: Shield,      color: "#2563EB" },
    { id: "naac",      label: "NAAC Certificate",     Icon: Award,       color: "#7C3AED" },
    { id: "esamiksha", label: "e-Samiksha Portal",    Icon: Globe,       color: "#10B981" },
    { id: "ciqa",      label: "CIQA",                 Icon: CheckCircle, color: "#EF4444" },
    { id: "ciqf",      label: "CIQF",                 Icon: FileText,    color: "#06B6D4" },
    { id: "grievance", label: "Grievance Redressal",  Icon: AlertCircle, color: "#EC4899" },
    { id: "refund",    label: "Fee Refund Policy",    Icon: Download,    color: "#8B5CF6" },
  ];

  const [active, setActive] = useState(initialSection);

  const content: Record<string, React.ReactNode> = {
    ugc: (
      <div className="space-y-6">
        <div>
          <h3 className="text-slate-800 font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>UGC Approval — Online B.Com (Hons.)</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Saveetha Institute of Medical and Technical Sciences (SIMATS) is a Deemed-to-be University established under Section 3 of the UGC Act, 1956, vide notification No. F.9-30/2006-U.3 (A). The Online B.Com (Hons.) programme is approved by the University Grants Commission — Distance Education Bureau (UGC-DEB).
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "University Status",    value: "Deemed-to-be University" },
            { label: "Established",          value: "2008 (Deemed 2017)" },
            { label: "UGC Act Section",      value: "Section 3, UGC Act 1956" },
            { label: "DEB Approval",         value: "UGC-DEB Recognised" },
            { label: "Approval Valid Until", value: "2025–26 Academic Year" },
            { label: "Programmes Approved",  value: "B.Com (Hons.) — Online" },
          ].map((r) => (
            <Glass key={r.label} className="p-4" style={{ border: "1px solid rgba(37,99,235,0.22)" }}>
              <div className="text-slate-500 text-[11px] mb-1">{r.label}</div>
              <div className="text-slate-800 font-semibold text-sm">{r.value}</div>
            </Glass>
          ))}
        </div>
        <Glass className="p-5" style={{ border: "1px solid rgba(37,99,235,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-3 flex items-center gap-2">
            <CheckCircle size={14} className="text-blue-600" /> UGC Compliance Checklist
          </h4>
          {[
            "Programme curriculum approved by Academic Council",
            "Credit framework aligned with UGC guidelines (120 credits / 3 years)",
            "Examination system approved and proctored online",
            "Faculty qualifications meet UGC norms (NET/SET/PhD)",
            "Annual reports submitted to UGC-DEB",
            "Student grievance mechanism in place as per UGC norms",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 mb-2">
              <CheckCircle size={13} className="text-blue-600 mt-0.5 shrink-0" />
              <span className="text-slate-600 text-xs">{item}</span>
            </div>
          ))}
        </Glass>
        <div className="flex gap-3">
          <PrimaryBtn onClick={() => setPage("programmes")}>View Programme Details</PrimaryBtn>
          <OutlineBtn onClick={() => setPage("apply")}>Apply Now</OutlineBtn>
        </div>
      </div>
    ),

    naac: (
      <div className="space-y-6">
        <div>
          <h3 className="text-slate-800 font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>NAAC A++ Accreditation</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            SIMATS has been accredited by the National Assessment and Accreditation Council (NAAC) with the highest grade of <span className="text-purple-400 font-semibold">A++</span> (CGPA: 3.71/4.00). This places SIMATS among the top 1% of higher education institutions in India.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "NAAC Grade",    value: "A++",       color: "#10B981" },
            { label: "CGPA",          value: "3.71/4.00", color: "#7C3AED" },
            { label: "NIRF Rank",     value: "#42",       color: "#2563EB" },
            { label: "QS Rank",       value: "Top 5%",    color: "#F59E0B" },
          ].map((r) => (
            <Glass key={r.label} className="p-4 text-center" style={{ border: `1px solid ${r.color}28` }}>
              <div className="text-2xl font-extrabold mb-1" style={{ color: r.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{r.value}</div>
              <div className="text-slate-500 text-xs">{r.label}</div>
            </Glass>
          ))}
        </div>
        <Glass className="p-5" style={{ border: "1px solid rgba(124,58,237,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-4">NAAC Assessment Parameters</h4>
          <div className="space-y-3">
            {[
              { param: "Curricular Aspects",                score: 3.82, max: 4 },
              { param: "Teaching–Learning & Evaluation",    score: 3.75, max: 4 },
              { param: "Research, Innovations & Extension", score: 3.68, max: 4 },
              { param: "Infrastructure & Learning Resources",score: 3.70, max: 4 },
              { param: "Student Support & Progression",     score: 3.65, max: 4 },
              { param: "Governance, Leadership & Management",score: 3.72, max: 4 },
            ].map((p) => (
              <div key={p.param}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">{p.param}</span>
                  <span className="text-purple-400 font-semibold">{p.score}/{p.max}</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(30,58,138,0.1)" }}>
                  <div className="h-full rounded-full" style={{ width: `${(p.score / p.max) * 100}%`, background: "linear-gradient(90deg,#7C3AED,#A78BFA)" }} />
                </div>
              </div>
            ))}
          </div>
        </Glass>
        <Glass className="p-5" style={{ border: "1px solid rgba(124,58,237,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-3">Other Accreditations & Rankings</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { body: "NBA",    detail: "Accredited — B.Tech, B.Pharm, BDS programmes",   color: "#06B6D4" },
              { body: "AICTE",  detail: "Approved for all technical programmes",           color: "#F59E0B" },
              { body: "COA",    detail: "Council of Architecture — B.Arch approved",       color: "#EF4444" },
            ].map((a) => (
              <div key={a.body} className="p-3 rounded-xl" style={{ background: `${a.color}0f`, border: `1px solid ${a.color}22` }}>
                <div className="text-sm font-bold mb-0.5" style={{ color: a.color }}>{a.body}</div>
                <div className="text-slate-500 text-[11px]">{a.detail}</div>
              </div>
            ))}
          </div>
        </Glass>
      </div>
    ),

    esamiksha: (
      <div className="space-y-6">
        <div>
          <h3 className="text-slate-800 font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>e-Samiksha Portal Compliance</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            e-Samiksha is the UGC's online monitoring and compliance portal for higher education institutions. SIMATS is fully compliant with all e-Samiksha directives and regularly uploads mandatory reports, action-taken reports (ATRs), and compliance certificates.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Compliance Status",   value: "Fully Compliant ✓",      color: "#10B981" },
            { label: "Last ATR Submitted",  value: "March 2025",              color: "#2563EB" },
            { label: "Pending Directives",  value: "0 (All Cleared)",         color: "#10B981" },
            { label: "Portal Login",        value: "samiksha.ugc.ac.in",      color: "#F59E0B" },
          ].map((r) => (
            <Glass key={r.label} className="p-4" style={{ border: `1px solid ${r.color}22` }}>
              <div className="text-slate-500 text-[11px] mb-1">{r.label}</div>
              <div className="font-semibold text-sm" style={{ color: r.color }}>{r.value}</div>
            </Glass>
          ))}
        </div>
        <Glass className="p-5" style={{ border: "1px solid rgba(16,185,129,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-4">e-Samiksha Compliance Areas</h4>
          {[
            { area: "Annual Reports Submission",          status: "Compliant",  year: "2024–25" },
            { area: "Mandatory Disclosure Upload",        status: "Compliant",  year: "2024–25" },
            { area: "Affiliation / Recognition Details",  status: "Compliant",  year: "Current" },
            { area: "Action-Taken Report (ATR)",          status: "Submitted",  year: "Mar 2025" },
            { area: "Grievance Redressal Mechanism",      status: "Operational",year: "Ongoing"  },
            { area: "Student Welfare Schemes",            status: "Reported",   year: "2024–25" },
          ].map((c) => (
            <div key={c.area} className="flex items-center justify-between py-2.5 border-b border-amber-100 last:border-0">
              <span className="text-slate-600 text-xs">{c.area}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[10px]">{c.year}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>{c.status}</span>
              </div>
            </div>
          ))}
        </Glass>
      </div>
    ),

    ciqa: (
      <div className="space-y-6">
        <div>
          <h3 className="text-slate-800 font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>CIQA — Centre for Internal Quality Assurance</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            The Centre for Internal Quality Assurance (CIQA) at SIMATS Online Education is the nodal body responsible for implementing, monitoring, and continuously improving the quality of all online programmes in accordance with UGC-DEB norms and institutional standards.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Glass className="p-5" style={{ border: "1px solid rgba(239,68,68,0.22)" }}>
            <h4 className="text-slate-800 font-semibold text-sm mb-3">CIQA Mandate</h4>
            {[
              "Monitor academic quality of all online programmes",
              "Review and update curriculum every academic year",
              "Conduct student satisfaction surveys each semester",
              "Evaluate faculty performance and delivery quality",
              "Coordinate internal academic audits",
              "Ensure compliance with UGC-DEB quality benchmarks",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 mb-2">
                <CheckCircle size={12} className="text-red-400 mt-0.5 shrink-0" />
                <span className="text-slate-600 text-xs">{item}</span>
              </div>
            ))}
          </Glass>
          <Glass className="p-5" style={{ border: "1px solid rgba(239,68,68,0.22)" }}>
            <h4 className="text-slate-800 font-semibold text-sm mb-3">CIQA Committee Members</h4>
            {[
              { role: "Director, CIQA",            name: "Prof. Dr. R. Narayanan" },
              { role: "Academic Quality Officer",   name: "Dr. Anitha Krishnamurthy" },
              { role: "Faculty Representative",     name: "Dr. Priya Rajan" },
              { role: "Student Representative",     name: "Elected (each batch)" },
              { role: "Industry Expert",            name: "Mr. S. Venkataraman (CII)" },
              { role: "External Examiner",          name: "Nominated by UGC-DEB" },
            ].map((m) => (
              <div key={m.role} className="flex justify-between items-center py-2 border-b border-amber-100 last:border-0">
                <span className="text-slate-500 text-[11px]">{m.role}</span>
                <span className="text-slate-700 text-[11px] font-medium">{m.name}</span>
              </div>
            ))}
          </Glass>
        </div>
        <Glass className="p-5" style={{ border: "1px solid rgba(239,68,68,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-4">CIQA Activity Calendar 2025–26</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { month: "July 2025",     activity: "Curriculum review workshop" },
              { month: "September 2025",activity: "Mid-semester student survey" },
              { month: "November 2025", activity: "Internal academic audit" },
              { month: "January 2026",  activity: "Faculty development programme" },
              { month: "March 2026",    activity: "End-semester satisfaction survey" },
              { month: "May 2026",      activity: "Annual CIQA report submission" },
            ].map((a) => (
              <div key={a.month} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.12)" }}>
                <Clock size={12} className="text-red-400 shrink-0" />
                <div>
                  <div className="text-red-300 text-[10px] font-semibold">{a.month}</div>
                  <div className="text-slate-600 text-xs">{a.activity}</div>
                </div>
              </div>
            ))}
          </div>
        </Glass>
      </div>
    ),

    ciqf: (
      <div className="space-y-6">
        <div>
          <h3 className="text-slate-800 font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>CIQF — Centre for International Quality Framework</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            The Centre for International Quality Framework (CIQF) aligns SIMATS Online Education with globally recognised quality standards including ISO 21001:2018 (Educational Organizations Management Systems) and international e-learning benchmarks.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { std: "ISO 21001:2018", scope: "Educational Management Systems", status: "Certified", color: "#06B6D4" },
            { std: "EFQM Framework", scope: "Organisational Excellence Model", status: "Aligned",   color: "#7C3AED" },
            { std: "QAA UK Standards", scope: "Quality Assurance Agency benchmarks", status: "Mapped", color: "#10B981" },
          ].map((s) => (
            <Glass key={s.std} className="p-5" style={{ border: `1px solid ${s.color}28` }}>
              <div className="text-base font-bold mb-1" style={{ color: s.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.std}</div>
              <div className="text-slate-500 text-xs mb-3">{s.scope}</div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${s.color}18`, color: s.color }}>{s.status}</span>
            </Glass>
          ))}
        </div>
        <Glass className="p-5" style={{ border: "1px solid rgba(6,182,212,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-4">International Collaborations</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { partner: "University of Birmingham, UK",    type: "Academic Exchange",     since: "2021" },
              { partner: "Deakin University, Australia",    type: "Research Collaboration", since: "2022" },
              { partner: "NUS Singapore",                   type: "Faculty Development",    since: "2020" },
              { partner: "IIT Madras Online (India)",       type: "Joint Certification",    since: "2023" },
            ].map((c) => (
              <div key={c.partner} className="p-3 rounded-xl" style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.15)" }}>
                <div className="text-slate-800 text-xs font-semibold mb-0.5">{c.partner}</div>
                <div className="text-slate-500 text-[11px]">{c.type} · Since {c.since}</div>
              </div>
            ))}
          </div>
        </Glass>
        <Glass className="p-5" style={{ border: "1px solid rgba(6,182,212,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-3">CIQF Quality Pillars</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { pillar: "Learner-Centred Design",   icon: "🎯" },
              { pillar: "Technology-Enhanced Learning", icon: "💻" },
              { pillar: "Continuous Improvement",   icon: "🔄" },
              { pillar: "Global Benchmarking",      icon: "🌐" },
            ].map((p) => (
              <div key={p.pillar} className="p-3 rounded-xl text-center" style={{ background: "rgba(6,182,212,0.07)", border: "1px solid rgba(6,182,212,0.12)" }}>
                <div className="text-2xl mb-1">{p.icon}</div>
                <div className="text-slate-600 text-[11px] font-medium leading-tight">{p.pillar}</div>
              </div>
            ))}
          </div>
        </Glass>
      </div>
    ),

    grievance: (
      <div className="space-y-6">
        <div>
          <h3 className="text-slate-800 font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Grievance Redressal Mechanism</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            SIMATS Online Education has a robust grievance redressal system in compliance with UGC Grievance Redressal Regulations 2012. All complaints are acknowledged within 24 hours and resolved within 15 working days.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Acknowledged In",  value: "24 Hours",         color: "#EC4899" },
            { label: "Resolved Within",  value: "15 Working Days",  color: "#8B5CF6" },
            { label: "Escalation To",    value: "UGC Ombudsman",    color: "#EF4444" },
          ].map((r) => (
            <Glass key={r.label} className="p-4 text-center" style={{ border: `1px solid ${r.color}28` }}>
              <div className="text-base font-bold mb-1" style={{ color: r.color, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{r.value}</div>
              <div className="text-slate-500 text-xs">{r.label}</div>
            </Glass>
          ))}
        </div>

        {/* Grievance Form */}
        {submitted ? (
          <Glass className="p-8 text-center" style={{ border: "1px solid rgba(16,185,129,0.3)" }}>
            <CheckCircle size={40} className="text-blue-600 mx-auto mb-4" />
            <h4 className="text-slate-800 font-bold text-lg mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Grievance Submitted Successfully</h4>
            <p className="text-slate-500 text-sm mb-1">Your complaint has been registered with reference number <span className="text-blue-600 font-bold">GRV-2025-{Math.floor(Math.random() * 9000) + 1000}</span>.</p>
            <p className="text-slate-500 text-xs">You will receive an acknowledgement email within 24 hours. Resolution within 15 working days.</p>
            <button onClick={() => setSubmitted(false)} className="mt-5 text-blue-600 text-xs hover:underline">Submit another grievance</button>
          </Glass>
        ) : (
          <Glass className="p-6" style={{ border: "1px solid rgba(236,72,153,0.22)" }}>
            <h4 className="text-slate-800 font-semibold text-sm mb-5 flex items-center gap-2">
              <AlertCircle size={14} className="text-pink-400" /> Submit a Grievance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-slate-500 text-xs mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input value={grievanceForm.name} onChange={e => setGrievanceForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl text-slate-700 placeholder-slate-600 outline-none"
                    style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }} />
                </div>
              </div>
              <div>
                <label className="text-slate-500 text-xs mb-1.5 block">Register Number / Employee ID *</label>
                <div className="relative">
                  <FileText size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input value={grievanceForm.reg} onChange={e => setGrievanceForm(f => ({ ...f, reg: e.target.value }))}
                    placeholder="e.g. 22CSEB001"
                    className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl text-slate-700 placeholder-slate-600 outline-none"
                    style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }} />
                </div>
              </div>
              <div>
                <label className="text-slate-500 text-xs mb-1.5 block">Email Address *</label>
                <div className="relative">
                  <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input value={grievanceForm.email} onChange={e => setGrievanceForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full pl-8 pr-4 py-2.5 text-sm rounded-xl text-slate-700 placeholder-slate-600 outline-none"
                    style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }} />
                </div>
              </div>
              <div>
                <label className="text-slate-500 text-xs mb-1.5 block">Grievance Category *</label>
                <select value={grievanceForm.category} onChange={e => setGrievanceForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-3 py-2.5 text-sm rounded-xl text-slate-600 outline-none"
                  style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }}>
                  {["Academic","Examination","Fee & Finance","LMS Technical","Admission","Faculty Conduct","Other"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label className="text-slate-500 text-xs mb-1.5 block">Describe Your Grievance *</label>
              <textarea value={grievanceForm.desc} onChange={e => setGrievanceForm(f => ({ ...f, desc: e.target.value }))}
                placeholder="Please describe your grievance in detail. Include relevant dates, names, and any supporting information…"
                rows={5}
                className="w-full px-3 py-2.5 text-sm rounded-xl text-slate-700 placeholder-slate-600 outline-none resize-none"
                style={{ background: "rgba(30,58,138,0.06)", border: "1px solid rgba(30,58,138,0.15)" }} />
            </div>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => { if (grievanceForm.name && grievanceForm.email && grievanceForm.desc) setSubmitted(true); }}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
                style={{ background: "linear-gradient(135deg,#EC4899,#8B5CF6)", boxShadow: "0 4px 16px rgba(236,72,153,0.3)" }}>
                <Send size={13} /> Submit Grievance
              </motion.button>
              <p className="text-slate-500 text-xs">All submissions are confidential and protected.</p>
            </div>
          </Glass>
        )}

        <Glass className="p-5" style={{ border: "1px solid rgba(236,72,153,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-3">Grievance Escalation Path</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-0">
            {[
              { step: "1", label: "Online Portal",   sub: "Submit via this form" },
              { step: "2", label: "CIQA Review",     sub: "Internal committee" },
              { step: "3", label: "Director Review", sub: "If unresolved in 7 days" },
              { step: "4", label: "UGC Ombudsman",   sub: "ugcportal.com" },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center text-center min-w-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mb-1"
                    style={{ background: "linear-gradient(135deg,#EC4899,#8B5CF6)" }}>{s.step}</div>
                  <div className="text-slate-800 text-xs font-semibold leading-tight">{s.label}</div>
                  <div className="text-slate-500 text-[10px]">{s.sub}</div>
                </div>
                {i < 3 && <ChevronRight size={14} className="text-slate-600 shrink-0 mb-4 hidden sm:block" />}
              </div>
            ))}
          </div>
        </Glass>
      </div>
    ),

    refund: (
      <div className="space-y-6">
        <div>
          <h3 className="text-slate-800 font-bold text-xl mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Fee Refund Policy</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            SIMATS Online Education follows the UGC Fee Refund Policy (2018) strictly. The refund amount depends on the date of withdrawal relative to the programme commencement date. All refund requests must be submitted in writing via the portal or by email.
          </p>
        </div>

        {/* Refund Slab Table */}
        <Glass className="overflow-hidden" style={{ border: "1px solid rgba(139,92,246,0.22)" }}>
          <div className="px-5 py-4 border-b border-purple-100" style={{ background: "rgba(139,92,246,0.08)" }}>
            <h4 className="text-slate-800 font-semibold text-sm">Refund Schedule (UGC Guidelines)</h4>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "rgba(30,58,138,0.04)", borderBottom: "1px solid rgba(30,58,138,0.08)" }}>
                {["Withdrawal Timing","Refund Percentage","Deduction","Processing Time"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-slate-600 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { timing: "Before commencement date",         pct: "100%",  deduction: "₹1,000 processing fee", days: "7 working days",  color: "#10B981" },
                { timing: "Within 15 days of commencement",  pct: "80%",   deduction: "20% retained",           days: "10 working days", color: "#F59E0B" },
                { timing: "16–30 days after commencement",   pct: "50%",   deduction: "50% retained",           days: "10 working days", color: "#EF4444" },
                { timing: "After 30 days of commencement",   pct: "0%",    deduction: "Full fee retained",      days: "N/A",             color: "#64748b" },
              ].map((row) => (
                <tr key={row.timing} className="border-b border-amber-100 last:border-0 hover:bg-amber-50 transition-colors">
                  <td className="px-5 py-4 text-slate-600">{row.timing}</td>
                  <td className="px-5 py-4 font-bold" style={{ color: row.color }}>{row.pct}</td>
                  <td className="px-5 py-4 text-slate-500">{row.deduction}</td>
                  <td className="px-5 py-4 text-slate-500">{row.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Glass>

        {/* Refund Process */}
        <Glass className="p-5" style={{ border: "1px solid rgba(139,92,246,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-4">How to Apply for a Refund</h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              { step: "01", title: "Submit Request", desc: "Fill refund request form on LMS portal or email accounts@simatsol.in" },
              { step: "02", title: "Attach Proof",   desc: "Upload fee receipt, ID, and withdrawal reason letter" },
              { step: "03", title: "Verification",   desc: "Accounts team verifies within 3 working days" },
              { step: "04", title: "Refund Credited", desc: "Amount credited to original payment source" },
            ].map((s) => (
              <div key={s.step} className="p-4 rounded-xl" style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
                <div className="text-2xl font-black mb-2" style={{ color: "#8B5CF6", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.step}</div>
                <div className="text-slate-800 text-xs font-semibold mb-1">{s.title}</div>
                <div className="text-slate-500 text-[11px] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </Glass>

        {/* Exceptions */}
        <Glass className="p-5" style={{ border: "1px solid rgba(239,68,68,0.22)" }}>
          <h4 className="text-slate-800 font-semibold text-sm mb-3 flex items-center gap-2">
            <AlertCircle size={14} className="text-red-400" /> Non-Refundable Fees
          </h4>
          {[
            "Application processing fee (₹500) — non-refundable under all circumstances",
            "Examination fee once the admit card is issued",
            "Late payment penalty charges",
            "Fees paid for supplementary / re-attempt examinations",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 mb-2">
              <X size={12} className="text-red-400 mt-0.5 shrink-0" />
              <span className="text-slate-600 text-xs">{item}</span>
            </div>
          ))}
          <p className="text-slate-500 text-xs mt-3">For refund queries contact: <span className="text-blue-600">accounts@simatsol.in</span> · +91-44-2680-1900 Ext. 215</p>
        </Glass>

        <div className="flex gap-3">
          <PrimaryBtn onClick={() => setPage("apply")}>Apply for Admission</PrimaryBtn>
          <OutlineBtn onClick={() => setPage("faq")}>More FAQs</OutlineBtn>
        </div>
      </div>
    ),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
      {/* Header */}
      <div className="mb-10">
        <SectionLabel>Regulatory & Compliance</SectionLabel>
        <h1 className="text-slate-800 text-3xl font-extrabold mb-2" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Disclosures & Compliance
        </h1>
        <p className="text-slate-500 text-sm">All mandatory regulatory disclosures, quality certifications, and statutory compliance documents.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar nav */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-1.5">
            {sections.map((s) => (
              <motion.button
                key={s.id}
                whileHover={{ x: 2 }}
                onClick={() => setActive(s.id)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                style={active === s.id
                  ? { background: `${s.color}18`, border: `1px solid ${s.color}35`, boxShadow: `0 0 20px ${s.color}15` }
                  : { background: "rgba(255,255,255,0.7)", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <s.Icon size={15} style={{ color: active === s.id ? s.color : "#64748b" }} className="shrink-0" />
                <span className="text-sm font-medium" style={{ color: active === s.id ? "#1e3a8a" : "#64748b" }}>{s.label}</span>
                {active === s.id && <ChevronRight size={12} className="ml-auto shrink-0" style={{ color: s.color }} />}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {content[active]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [disclosureSection, setDisclosureSection] = useState("ugc");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [page]);

  const navigate = (p: Page, section?: string) => {
    if (p === "disclosures" && section) setDisclosureSection(section);
    setPage(p);
    if (section && p !== "disclosures") {
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 320);
    }
  };

  const renderPage = () => {
    switch (page) {
      case "home":        return <HomePage setPage={navigate} />;
      case "about":       return <AboutPage setPage={navigate} />;
      case "programmes":  return <ProgrammesPage setPage={navigate} />;
      case "lms":         return <LMSPage />;
      case "apply":       return <ApplyPage setPage={navigate} />;
      case "faq":         return <FAQPage setPage={navigate} />;
      case "disclosures": return <DisclosuresPage setPage={navigate} initialSection={disclosureSection} />;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'Inter',sans-serif" }}
    >
      {/* Background — modern mesh gradient fixed across all pages like VStudy */}
      <div className="fixed inset-0 z-0" style={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #fef3c7 50%, #fdf2f8 100%)",
      }}>
        {/* Soft glass overlay */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 80%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.2) 0%, transparent 80%)"
        }} />
      </div>

      {/* App shell */}
      <div className="relative z-10">
        <Navbar current={page} setPage={navigate} />

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>

        <Footer setPage={navigate} />
      </div>
    </div>
  );
}

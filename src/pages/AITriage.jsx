import React, { useState, useEffect, useRef, useCallback } from "react";
import AiTriangleAPI from "../services/AiTriangleAPI";

/* ────────────────────────────────────────────
   INLINE MARKDOWN RENDERER  (zero‑dependency)
   ──────────────────────────────────────────── */

function fmtInline(text) {
  if (!text) return text;
  const parts = [];
  const re = /(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
  let last = 0,
    m,
    k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1])
      parts.push(
        <strong key={k++} className="font-bold italic text-white">
          {m[2]}
        </strong>
      );
    else if (m[3])
      parts.push(
        <strong key={k++} className="font-semibold text-white">
          {m[4]}
        </strong>
      );
    else if (m[5])
      parts.push(
        <em key={k++} className="italic text-gray-300">
          {m[6]}
        </em>
      );
    else if (m[7])
      parts.push(
        <code
          key={k++}
          className="bg-white/10 text-cyan-300 px-1.5 py-0.5 rounded text-[13px] font-mono"
        >
          {m[8]}
        </code>
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 0 ? text : parts;
}

function Markdown({ content }) {
  if (!content) return null;
  const lines = content.split("\n");
  const els = [];
  let inCode = false,
    codeBuf = "",
    codeLang = "",
    k = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();

    if (t.startsWith("```")) {
      if (!inCode) {
        inCode = true;
        codeLang = t.slice(3);
        codeBuf = "";
      } else {
        els.push(
          <pre
            key={k++}
            className="bg-black/50 rounded-xl p-4 my-3 overflow-x-auto border border-white/10"
          >
            {codeLang && (
              <span className="text-[10px] text-cyan-400/70 uppercase tracking-wider block mb-1">
                {codeLang}
              </span>
            )}
            <code className="text-sm text-emerald-300 whitespace-pre">
              {codeBuf.trimEnd()}
            </code>
          </pre>
        );
        inCode = false;
        codeBuf = "";
        codeLang = "";
      }
      continue;
    }
    if (inCode) {
      codeBuf += raw + "\n";
      continue;
    }
    if (!t) {
      els.push(<div key={k++} className="h-2" />);
      continue;
    }
    if (t.startsWith("### "))
      els.push(
        <h3
          key={k++}
          className="text-[15px] font-semibold text-white mt-3 mb-1"
        >
          {fmtInline(t.slice(4))}
        </h3>
      );
    else if (t.startsWith("## "))
      els.push(
        <h2 key={k++} className="text-lg font-bold text-white mt-4 mb-2">
          {fmtInline(t.slice(3))}
        </h2>
      );
    else if (t.startsWith("# "))
      els.push(
        <h1 key={k++} className="text-xl font-bold text-white mt-4 mb-2">
          {fmtInline(t.slice(2))}
        </h1>
      );
    else if (/^[-*•]\s/.test(t))
      els.push(
        <div key={k++} className="flex items-start gap-2 ml-3 my-0.5">
          <span className="text-cyan-400 mt-2 text-[5px]">●</span>
          <span className="text-gray-200 leading-relaxed">
            {fmtInline(t.replace(/^[-*•]\s/, ""))}
          </span>
        </div>
      );
    else if (/^\d+\.\s/.test(t)) {
      const n = t.match(/^(\d+)\./)[1];
      els.push(
        <div key={k++} className="flex items-start gap-2 ml-3 my-0.5">
          <span className="text-cyan-400 font-medium text-sm min-w-[1.2rem]">
            {n}.
          </span>
          <span className="text-gray-200 leading-relaxed">
            {fmtInline(t.replace(/^\d+\.\s/, ""))}
          </span>
        </div>
      );
    } else if (t.startsWith("> "))
      els.push(
        <div
          key={k++}
          className="border-l-2 border-cyan-500/40 pl-3 my-2 text-gray-400 italic"
        >
          {fmtInline(t.slice(2))}
        </div>
      );
    else if (/^[-*_]{3,}$/.test(t))
      els.push(<hr key={k++} className="border-white/10 my-4" />);
    else
      els.push(
        <p key={k++} className="text-gray-200 my-1 leading-relaxed">
          {fmtInline(t)}
        </p>
      );
  }
  return <div>{els}</div>;
}

/* ────────────  SVG ICONS (inline, no deps)  ──────────── */

const Icon = {
  Send: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  ),
  Upload: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  ),
  Trash: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Book: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
    </svg>
  ),
  Menu: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  ),
  X: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  ChevDown: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74z" />
    </svg>
  ),
  Stethoscope: (p) => (
    <svg
      {...p}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  ),
};

/* ────────────  TYPING DOTS  ──────────── */

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

/* ────────────  CONFIDENCE BAR  ──────────── */

function ConfidenceBar({ value }) {
  const pct = Math.round((value ?? 0) * 100);
  const color =
    pct >= 75
      ? "from-emerald-500 to-emerald-400"
      : pct >= 50
      ? "from-amber-500 to-yellow-400"
      : "from-red-500 to-orange-400";
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">Confidence</span>
        <span className="text-white font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ────────────  CITATION CARD  ──────────── */

function CitationCard({ c, idx }) {
  return (
    <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
      <span className="flex-shrink-0 w-5 h-5 rounded bg-cyan-500/20 text-cyan-300 text-[11px] flex items-center justify-center font-bold mt-0.5">
        {idx + 1}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-white font-medium truncate">
          {c.book_title}
        </p>
        {c.page_number && (
          <p className="text-xs text-gray-400">Page {c.page_number}</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function AiTriangle() {
  /* ── state ── */
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [books, setBooks] = useState([]);
  const [health, setHealth] = useState(null);
  const [querying, setQuerying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [topK, setTopK] = useState(5);
  const [minScore, setMinScore] = useState(0.25);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState(null);
  const [openChunks, setOpenChunks] = useState({});
  const [showSettings, setShowSettings] = useState(false);

  const endRef = useRef(null);
  const fileRef = useRef(null);

  /* ── toast helper ── */
  const flash = useCallback((msg, type = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  /* ── boot ── */
 useEffect(() => {
  (async () => {
    try {
      const h = await AiTriangleAPI.checkHealth();
      setHealth(h);
      // only fetch books if backend is reachable
      const b = await AiTriangleAPI.listBooks();
      setBooks(b.books || []);
    } catch (e) {
      console.error("Boot error:", e.message);
      setHealth(null);
      setBooks([]);
    }
  })();
}, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, querying]);

  /* ── upload ── */
  const handleFiles = async (files) => {
    const file = files?.[0];
    if (!file) return;
    const allowed = [".pdf", ".txt", ".md"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) {
      flash("Only .pdf, .txt, .md files are supported", "error");
      return;
    }
    setUploading(true);
    try {
      const res = await AiTriangleAPI.uploadBook(file);
      flash(`"${res.book_title}" indexed (${res.chunks_count} chunks)`, "success");
      const b = await AiTriangleAPI.listBooks();
      setBooks(b.books || []);
      const h = await AiTriangleAPI.checkHealth();
      setHealth(h);
    } catch (e) {
      flash(e.message, "error");
    } finally {
      setUploading(false);
    }
  };

  /* ── delete book ── */
  const handleDelete = async (id) => {
    try {
      await AiTriangleAPI.deleteBook(id);
      flash("Book removed", "success");
      const b = await AiTriangleAPI.listBooks();
      setBooks(b.books || []);
      const h = await AiTriangleAPI.checkHealth();
      setHealth(h);
    } catch (e) {
      flash(e.message, "error");
    }
  };

  /* ── query ── */
  const handleSend = async () => {
  const q = input.trim();
  if (!q || querying) return;
  setInput("");
  const userMsg = { role: "user", text: q, ts: Date.now() };
  setMessages((p) => [...p, userMsg]);
  setQuerying(true);
  try {
    const res = await AiTriangleAPI.query(q, topK, minScore);
    const aiMsg = {
      role: "ai",
      text: res.answer,
      citations: res.citations || [],
      confidence: res.confidence,
      chunks: res.retrieved_chunks || [],
      ts: Date.now(),
    };
    setMessages((p) => [...p, aiMsg]);
  } catch (e) {
    setMessages((p) => [
      ...p,
      {
        role: "ai",
        text: `⚠️ ${e.message}`,
        citations: [],
        confidence: 0,
        chunks: [],
        ts: Date.now(),
      },
    ]);
  } finally {
    setQuerying(false);
  }
};
  const toggleChunks = (ts) =>
    setOpenChunks((p) => ({ ...p, [ts]: !p[ts] }));

  /* ── suggested prompts ── */
  const suggestions = [
    "What are early signs of dehydration in children?",
    "Explain neonatal jaundice management",
    "Common pediatric emergencies and first response",
    "Vaccination schedule for infants under 1 year",
  ];

  /* ═══════════════  RENDER  ═══════════════ */
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100 overflow-hidden font-sans">
      {/* ─── TOAST ─── */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 animate-slide-in
            ${
              toast.type === "success"
                ? "bg-emerald-500/90 text-white"
                : toast.type === "error"
                ? "bg-red-500/90 text-white"
                : "bg-cyan-500/90 text-white"
            }`}
        >
          {toast.type === "success" ? "✓" : toast.type === "error" ? "✕" : "ℹ"}{" "}
          {toast.msg}
        </div>
      )}

      {/* ─── MOBILE OVERLAY ─── */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      {/* ═══════════  SIDEBAR  ═══════════ */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-80 bg-gray-900 border-r border-white/[0.06]
          flex flex-col transition-transform duration-300
          ${sidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:min-w-0 lg:overflow-hidden lg:border-0"}`}
      >
        {/* logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Icon.Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight">
                PediAI<span className="text-cyan-400">.</span>
              </h1>
              <p className="text-[10px] text-gray-500 -mt-0.5 tracking-wide uppercase">
                Pediatrics RAG
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebar(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-white/10 text-gray-400"
          >
            <Icon.X className="w-5 h-5" />
          </button>
        </div>

        {/* health */}
        <div className="px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              Backend
            </span>
            <span
              className={`flex items-center gap-1.5 text-xs font-medium ${
                health ? "text-emerald-400" : "text-red-400"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  health
                    ? "bg-emerald-400 shadow-[0_0_6px] shadow-emerald-400/60"
                    : "bg-red-400"
                }`}
              />
              {health ? "Online" : "Offline"}
            </span>
          </div>
          {health && (
            <div className="flex gap-3 mt-2">
              <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-center">
                <p className="text-lg font-bold text-white">
                  {health.index_size}
                </p>
                <p className="text-[10px] text-gray-500 uppercase">Chunks</p>
              </div>
              <div className="flex-1 bg-white/5 rounded-lg px-3 py-2 text-center">
                <p className="text-lg font-bold text-white">
                  {health.books_count}
                </p>
                <p className="text-[10px] text-gray-500 uppercase">Books</p>
              </div>
            </div>
          )}
        </div>

        {/* upload zone */}
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
            Upload Book
          </p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileRef.current?.click()}
            className={`relative cursor-pointer border-2 border-dashed rounded-xl p-5 text-center transition-all
              ${
                dragOver
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
              }
              ${uploading ? "pointer-events-none opacity-60" : ""}`}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.txt,.md"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <svg
                  className="w-6 h-6 text-cyan-400 animate-spin"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="31.4"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-xs text-gray-400">Indexing…</p>
              </div>
            ) : (
              <>
                <Icon.Upload className="w-6 h-6 mx-auto text-gray-500 mb-1" />
                <p className="text-xs text-gray-400">
                  Drop <span className="text-cyan-400">.pdf .txt .md</span> here
                </p>
              </>
            )}
          </div>
        </div>

        {/* books list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2 scrollbar-thin">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Library ({books.length})
          </p>
          {books.length === 0 && (
            <p className="text-xs text-gray-600 italic">No books yet</p>
          )}
          {books.map((b) => (
            <div
              key={b.book_id}
              className="group flex items-start gap-2.5 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl px-3 py-2.5 transition"
            >
              <Icon.Book className="w-4 h-4 text-cyan-400/70 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 font-medium truncate">
                  {b.book_title}
                </p>
                <p className="text-[11px] text-gray-500">
                  {b.chunks_count} chunks
                </p>
              </div>
              <button
                onClick={() => handleDelete(b.book_id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition"
                title="Delete"
              >
                <Icon.Trash className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* settings */}
        <div className="px-5 py-3 border-t border-white/[0.06]">
          <button
            onClick={() => setShowSettings((s) => !s)}
            className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-gray-200 transition"
          >
            <span className="uppercase tracking-wider">Query Settings</span>
            <Icon.ChevDown
              className={`w-4 h-4 transition-transform ${
                showSettings ? "rotate-180" : ""
              }`}
            />
          </button>
          {showSettings && (
            <div className="mt-3 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>top_k</span>
                  <span className="text-white font-medium">{topK}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={topK}
                  onChange={(e) => setTopK(+e.target.value)}
                  className="w-full accent-cyan-500 h-1"
                />
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>min_score</span>
                  <span className="text-white font-medium">
                    {minScore.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={minScore * 100}
                  onChange={(e) => setMinScore(+e.target.value / 100)}
                  className="w-full accent-cyan-500 h-1"
                />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ═══════════  MAIN  ═══════════ */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* header */}
        <header className="flex items-center gap-3 px-4 lg:px-6 py-3 border-b border-white/[0.06] bg-gray-900/50 backdrop-blur-sm">
          <button
            onClick={() => setSidebar(true)}
            className={`p-2 rounded-xl hover:bg-white/10 text-gray-400 ${
              sidebar ? "lg:hidden" : ""
            }`}
          >
            <Icon.Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Icon.Sparkle className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold tracking-tight text-sm">
              Pediatrics AI Assistant
            </span>
          </div>
          <div className="ml-auto text-[11px] text-gray-500">
            {books.length > 0 &&
              `${books.length} book${books.length > 1 ? "s" : ""} loaded`}
          </div>
        </header>

        {/* messages area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-3xl mx-auto px-4 lg:px-0 py-6 space-y-6">
            {/* ── empty / welcome ── */}
            {messages.length === 0 && !querying && (
              <div className="flex flex-col items-center justify-center pt-16 pb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center mb-5">
                  <Icon.Stethoscope className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold mb-1">
                  Pediatrics Knowledge Base
                </h2>
                <p className="text-sm text-gray-500 mb-8 text-center max-w-md">
                  Ask any question about pediatric medicine. Answers are
                  grounded in your uploaded textbooks with citations.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                      }}
                      className="text-left text-sm text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl px-4 py-3 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── messages ── */}
            {messages.map((m, i) =>
              m.role === "user" ? (
                /* ──  USER  ── */
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] bg-cyan-600/90 rounded-2xl rounded-tr-md px-4 py-3 shadow-lg">
                    <p className="text-sm text-white leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                </div>
              ) : (
                /* ──  AI  ── */
                <div key={i} className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon.Sparkle className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.06] rounded-2xl rounded-tl-md px-5 py-4 space-y-3">
                    {/* answer */}
                    <Markdown content={m.text} />

                    {/* confidence */}
                    {m.confidence != null && m.confidence > 0 && (
                      <ConfidenceBar value={m.confidence} />
                    )}

                    {/* citations */}
                    {m.citations?.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">
                          Sources
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {m.citations.map((c, ci) => (
                            <CitationCard key={ci} c={c} idx={ci} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* retrieved chunks (toggle) */}
                    {m.chunks?.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleChunks(m.ts)}
                          className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 transition"
                        >
                          <Icon.ChevDown
                            className={`w-3.5 h-3.5 transition-transform ${
                              openChunks[m.ts] ? "rotate-180" : ""
                            }`}
                          />
                          {openChunks[m.ts] ? "Hide" : "Show"} retrieved chunks
                          ({m.chunks.length})
                        </button>
                        {openChunks[m.ts] && (
                          <div className="mt-2 space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                            {m.chunks.map((ch, ci) => (
                              <div
                                key={ci}
                                className="bg-black/30 rounded-lg p-3 border border-white/5"
                              >
                                <p className="text-xs text-gray-300 leading-relaxed line-clamp-4">
                                  {ch.text}
                                </p>
                                <p className="text-[10px] text-cyan-400/60 mt-1">
                                  similarity: {ch.score?.toFixed(3)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* disclaimer */}
                    <p className="text-[10px] text-gray-600 pt-1 border-t border-white/5">
                      ⚕ For educational reference only — not a substitute for
                      professional medical advice.
                    </p>
                  </div>
                </div>
              )
            )}

            {/* typing indicator */}
            {querying && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <Icon.Sparkle className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl rounded-tl-md">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>
        </div>

        {/* ── input bar ── */}
        <div className="border-t border-white/[0.06] bg-gray-900/60 backdrop-blur-sm px-4 lg:px-0 py-4">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={
                  books.length === 0
                    ? "Upload a book first…"
                    : "Ask a pediatric question…"
                }
                rows={1}
                disabled={querying}
                className="w-full bg-white/[0.05] border border-white/10 focus:border-cyan-500/50 rounded-2xl px-5 py-3.5 pr-14 text-sm text-white placeholder-gray-500 resize-none outline-none transition focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-40"
                style={{ minHeight: 48, maxHeight: 150 }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 150) + "px";
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || querying}
                className="absolute right-2 bottom-2 w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 text-white flex items-center justify-center transition shadow-lg shadow-cyan-500/20 disabled:shadow-none"
              >
                <Icon.Send className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="max-w-3xl mx-auto text-[10px] text-gray-600 mt-2 text-center">
            Shift + Enter for new line · Answers sourced from uploaded books
            only
          </p>
        </div>
      </main>

      {/* ── global animation styles ── */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        .animate-slide-in { animation: slideIn .3s ease-out; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,.1); border-radius: 99px; }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
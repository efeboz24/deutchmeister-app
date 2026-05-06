"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FloatingPanel } from "@ark-ui/react/floating-panel";
import { Portal } from "@ark-ui/react/portal";
import { toast } from "sonner";
import {
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Minus,
  Maximize2,
  ArrowDownLeft,
} from "lucide-react";
import { useNotepad } from "@/contexts/NotepadContext";

interface Tab {
  id: string;
  title: string;
  content: string;
}

const STORAGE_KEY = "dm_notepad_v1";
const DEFAULT_TABS: Tab[] = [{ id: "1", title: "Not 1", content: "" }];

export function Notepad() {
  const { isOpen, close } = useNotepad();

  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
  const [activeId, setActiveId] = useState<string>("1");
  const [editingId, setEditingId] = useState<string | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const hasFetched = useRef(false);

  /* ── Load from localStorage after hydration ── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: Tab[] = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTabs(parsed);
          setActiveId(parsed[0].id);
        }
      }
    } catch { /* ignore */ }
  }, []);

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];
  const activeIdx = tabs.findIndex((t) => t.id === activeId);

  /* ── Fetch from DB on first open ── */
  useEffect(() => {
    if (!isOpen || hasFetched.current) return;
    hasFetched.current = true;
    fetch("/api/notepad")
      .then((r) => r.json())
      .then(({ tabs: raw }: { tabs: string }) => {
        if (!raw || raw === "[]") return;
        try {
          const dbTabs: Tab[] = JSON.parse(raw);
          if (Array.isArray(dbTabs) && dbTabs.length > 0) {
            setTabs(dbTabs);
            setActiveId(dbTabs[0].id);
          }
        } catch { /* ignore */ }
      })
      .catch(() => { /* keep localStorage data on error */ });
  }, [isOpen]);

  /* ── Debounced save to DB + localStorage ── */
  useEffect(() => {
    if (!hasFetched.current) return;
    const timer = setTimeout(() => {
      const serialized = JSON.stringify(tabs);
      fetch("/api/notepad", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tabs: serialized }),
      }).catch(() => { toast.error("Notlar kaydedilemedi"); });
      try { localStorage.setItem(STORAGE_KEY, serialized); } catch { /* ignore */ }
    }, 1500);
    return () => clearTimeout(timer);
  }, [tabs]);

  const setContent = useCallback(
    (content: string) => setTabs((prev) => prev.map((t) => (t.id === activeId ? { ...t, content } : t))),
    [activeId]
  );

  const addTab = () => {
    const id = Date.now().toString();
    setTabs((prev) => [...prev, { id, title: `Not ${prev.length + 1}`, content: "" }]);
    setActiveId(id);
  };

  const removeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) { setTabs([{ id: "1", title: "Not 1", content: "" }]); setActiveId("1"); return; }
    const idx = tabs.findIndex((t) => t.id === id);
    const next = tabs.filter((t) => t.id !== id);
    setTabs(next);
    if (activeId === id) setActiveId(next[Math.max(0, idx - 1)].id);
  };

  const moveTab = (dir: "left" | "right") => {
    const idx = tabs.findIndex((t) => t.id === activeId);
    if (dir === "left" && idx === 0) return;
    if (dir === "right" && idx === tabs.length - 1) return;
    const arr = [...tabs];
    const si = dir === "left" ? idx - 1 : idx + 1;
    [arr[idx], arr[si]] = [arr[si], arr[idx]];
    setTabs(arr);
  };

  const wrapSel = (before: string, after: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const v = activeTab?.content ?? "";
    setContent(v.slice(0, s) + before + v.slice(s, e) + after + v.slice(e));
    requestAnimationFrame(() => { ta.setSelectionRange(s + before.length, e + before.length); ta.focus(); });
  };

  const insertAt = (text: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart;
    const v = activeTab?.content ?? "";
    setContent(v.slice(0, s) + text + v.slice(s));
    requestAnimationFrame(() => { ta.setSelectionRange(s + text.length, s + text.length); ta.focus(); });
  };

  const insertList = (type: "bullet" | "numbered") => {
    const ta = taRef.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    const v = activeTab?.content ?? "";
    const lines = (v.slice(s, e) || "").split("\n");
    const out = lines.map((l, i) => (type === "bullet" ? `• ${l}` : `${i + 1}. ${l}`)).join("\n") || (type === "bullet" ? "• " : "1. ");
    setContent(v.slice(0, s) + out + v.slice(e));
    requestAnimationFrame(() => { ta.setSelectionRange(s, s + out.length); ta.focus(); });
  };

  return (
    <FloatingPanel.Root
      open={isOpen}
      onOpenChange={({ open }) => { if (!open) close(); }}
      defaultSize={{ width: 520, height: 460 }}
      minSize={{ width: 340, height: 280 }}
    >
      <Portal>
        <FloatingPanel.Positioner style={{ zIndex: 9999 }}>
          <FloatingPanel.Content
            className="flex flex-col"
            style={{
              background: "#152236",
              border: "1px solid #243650",
              borderRadius: 12,
              boxShadow:
                "0 32px 64px rgba(0,0,0,0.75), 0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,166,35,0.12)",
              overflow: "hidden",
            }}
          >
            {/* ── Title bar ── */}
            <FloatingPanel.DragTrigger style={{ cursor: "move", flexShrink: 0 }}>
              <FloatingPanel.Header
                className="flex items-center justify-between relative"
                style={{
                  height: 46,
                  padding: "0 14px",
                  background: "linear-gradient(180deg, #1e3452 0%, #172d48 100%)",
                  borderBottom: "1px solid #243650",
                }}
              >
                {/* Gold shimmer at top */}
                <div
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: "linear-gradient(90deg, transparent 0%, #F5A623 40%, #F5A623 60%, transparent 100%)",
                    opacity: 0.6,
                  }}
                />
                {/* Left: icon + title */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{ width: 28, height: 28, background: "rgba(245,166,35,0.12)", border: "1px solid rgba(245,166,35,0.2)" }}
                  >
                    <BookOpen size={14} style={{ color: "#F5A623" }} />
                  </div>
                  <div className="min-w-0">
                    <FloatingPanel.Title
                      style={{ color: "#F5A623", fontWeight: 700, fontSize: 13, letterSpacing: "0.02em", lineHeight: 1.2 }}
                    >
                      Not Defteri
                    </FloatingPanel.Title>
                    {activeTab && (
                      <p className="truncate" style={{ fontSize: 10, color: "#6B7E96", marginTop: 1 }}>
                        {activeTab.title}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: control buttons */}
                <FloatingPanel.Control className="flex items-center gap-1 ml-3 flex-shrink-0">
                  {[
                    { stage: "minimized" as const, icon: <Minus size={11} />, title: "Küçült" },
                    { stage: "maximized" as const, icon: <Maximize2 size={11} />, title: "Büyüt" },
                    { stage: "default" as const, icon: <ArrowDownLeft size={11} />, title: "Geri yükle" },
                  ].map(({ stage, icon, title }) => (
                    <FloatingPanel.StageTrigger
                      key={stage}
                      stage={stage}
                      title={title}
                      className="flex items-center justify-center rounded-md transition-all hover:bg-white/10"
                      style={{ width: 24, height: 24, border: "none", background: "transparent", color: "#6B7E96", cursor: "pointer" }}
                    >
                      {icon}
                    </FloatingPanel.StageTrigger>
                  ))}
                  <FloatingPanel.CloseTrigger
                    title="Kapat"
                    className="flex items-center justify-center rounded-md transition-all hover:bg-red-500/20"
                    style={{ width: 24, height: 24, border: "none", background: "transparent", color: "#6B7E96", cursor: "pointer" }}
                  >
                    <X size={11} />
                  </FloatingPanel.CloseTrigger>
                </FloatingPanel.Control>
              </FloatingPanel.Header>
            </FloatingPanel.DragTrigger>

            <FloatingPanel.Body
              className="flex flex-col"
              style={{ flex: 1, overflow: "hidden", minHeight: 0 }}
            >
              {/* ── Tab bar ── */}
              <div
                className="flex items-end overflow-x-auto overflow-y-hidden flex-shrink-0"
                style={{ height: 38, background: "#0D1B2A", borderBottom: "1px solid #243650" }}
              >
                {tabs.map((tab) => {
                  const isActive = tab.id === activeId;
                  return (
                    <div
                      key={tab.id}
                      onClick={() => setActiveId(tab.id)}
                      className="flex items-center gap-1.5 flex-shrink-0 group"
                      style={{
                        height: 32,
                        padding: "0 10px",
                        cursor: "pointer",
                        maxWidth: 140,
                        minWidth: 72,
                        borderBottom: isActive ? "2px solid #F5A623" : "2px solid transparent",
                        background: isActive ? "#152236" : "transparent",
                        borderRadius: "5px 5px 0 0",
                        transition: "all 0.15s",
                      }}
                    >
                      {editingId === tab.id ? (
                        <input
                          style={{
                            flex: 1, minWidth: 0,
                            background: "transparent", outline: "none", border: "none",
                            color: "#F0F4F8", fontSize: 12, fontFamily: "inherit",
                          }}
                          value={tab.title}
                          onChange={(e) =>
                            setTabs((prev) => prev.map((t) => (t.id === tab.id ? { ...t, title: e.target.value } : t)))
                          }
                          onBlur={() => setEditingId(null)}
                          onKeyDown={(e) => e.key === "Enter" && setEditingId(null)}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span
                          className="truncate flex-1 select-none"
                          style={{
                            fontSize: 12,
                            color: isActive ? "#F0F4F8" : "#6B7E96",
                            fontWeight: isActive ? 500 : 400,
                          }}
                          onDoubleClick={(e) => { e.stopPropagation(); setEditingId(tab.id); }}
                          title="Çift tıkla: yeniden adlandır"
                        >
                          {tab.title}
                        </span>
                      )}
                      <button
                        onClick={(e) => removeTab(tab.id, e)}
                        className="flex items-center justify-center rounded flex-shrink-0 transition-colors opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:!text-red-400"
                        style={{ width: 14, height: 14, border: "none", background: "transparent", color: "#6B7E96", cursor: "pointer", padding: 0 }}
                        title="Sekmeyi kapat"
                      >
                        <X size={9} />
                      </button>
                    </div>
                  );
                })}

                <button
                  onClick={addTab}
                  className="flex items-center justify-center flex-shrink-0 rounded-md transition-colors hover:bg-white/8 hover:text-gold"
                  style={{ width: 28, height: 28, border: "none", background: "transparent", color: "#6B7E96", cursor: "pointer", margin: "auto 4px" }}
                  title="Yeni sekme ekle"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* ── Toolbar ── */}
              <div
                className="flex items-center gap-0.5 flex-shrink-0"
                style={{ height: 34, padding: "0 8px", background: "#1A2940", borderBottom: "1px solid #243650" }}
              >
                <NpBtn onClick={() => moveTab("left")} disabled={activeIdx <= 0} title="Sekmeyi sola taşı">
                  <ChevronLeft size={13} />
                </NpBtn>
                <NpBtn onClick={() => moveTab("right")} disabled={activeIdx >= tabs.length - 1} title="Sekmeyi sağa taşı">
                  <ChevronRight size={13} />
                </NpBtn>

                <NpDivider />

                <NpBtn onClick={() => wrapSel("**", "**")} title="Kalın">
                  <span style={{ fontWeight: 800, fontSize: 12, fontFamily: "serif", lineHeight: 1 }}>B</span>
                </NpBtn>
                <NpBtn onClick={() => wrapSel("_", "_")} title="İtalik">
                  <span style={{ fontStyle: "italic", fontSize: 12, fontFamily: "serif", lineHeight: 1 }}>I</span>
                </NpBtn>
                <NpBtn onClick={() => wrapSel("__", "__")} title="Altı çizili">
                  <span style={{ textDecoration: "underline", fontSize: 11, lineHeight: 1 }}>U</span>
                </NpBtn>

                <NpDivider />

                <NpBtn onClick={() => insertList("numbered")} title="Numaralı liste">
                  <span style={{ fontSize: 10, fontWeight: 700, lineHeight: 1 }}>1.</span>
                </NpBtn>
                <NpBtn onClick={() => insertList("bullet")} title="Madde işareti">
                  <span style={{ fontSize: 13, lineHeight: 1 }}>•</span>
                </NpBtn>

                <NpDivider />

                <NpBtn onClick={() => insertAt(new Date().toLocaleString("tr-TR"))} title="Tarih ve saat ekle">
                  <Clock size={12} />
                </NpBtn>
              </div>

              {/* ── Textarea ── */}
              <textarea
                ref={taRef}
                value={activeTab?.content ?? ""}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Notlarınızı buraya yazın..."
                spellCheck={false}
                className="flex-1 resize-none outline-none w-full min-h-0 placeholder:text-text-muted"
                style={{
                  background: "#0D1B2A",
                  color: "#F0F4F8",
                  fontFamily: "'Geist Mono', Consolas, 'Courier New', monospace",
                  fontSize: 13,
                  lineHeight: 1.75,
                  padding: "14px 16px",
                  border: "none",
                  caretColor: "#F5A623",
                }}
              />

              {/* ── Status bar ── */}
              <div
                className="flex items-center justify-between flex-shrink-0"
                style={{
                  height: 26,
                  padding: "0 14px",
                  background: "#1A2940",
                  borderTop: "1px solid #243650",
                }}
              >
                <span style={{ fontSize: 10, color: "#4A5E78" }}>
                  {tabs.length} sekme &nbsp;·&nbsp; çift tıkla: yeniden adlandır
                </span>
                <span style={{ fontSize: 10, color: "#4A5E78" }}>
                  {activeTab?.content.length ?? 0} karakter
                </span>
              </div>
            </FloatingPanel.Body>

            {/* ── Resize handles ── */}
            <FloatingPanel.ResizeTrigger axis="n" className="absolute top-0 left-3 right-3 h-1.5 cursor-n-resize" />
            <FloatingPanel.ResizeTrigger axis="e" className="absolute top-3 right-0 bottom-3 w-1.5 cursor-e-resize" />
            <FloatingPanel.ResizeTrigger axis="w" className="absolute top-3 left-0 bottom-3 w-1.5 cursor-w-resize" />
            <FloatingPanel.ResizeTrigger axis="s" className="absolute bottom-0 left-3 right-3 h-1.5 cursor-s-resize" />
            <FloatingPanel.ResizeTrigger axis="ne" className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize" />
            <FloatingPanel.ResizeTrigger axis="se" className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize" />
            <FloatingPanel.ResizeTrigger axis="sw" className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize" />
            <FloatingPanel.ResizeTrigger axis="nw" className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize" />
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  );
}

/* ── Toolbar helpers ── */
function NpBtn({
  onClick,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="flex items-center justify-center rounded-md transition-all"
      style={{
        width: 26,
        height: 26,
        border: "none",
        background: "transparent",
        color: disabled ? "#2A3E58" : "#6B7E96",
        cursor: disabled ? "not-allowed" : "pointer",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; if (!disabled) (e.currentTarget as HTMLButtonElement).style.color = "#F5A623"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = disabled ? "#2A3E58" : "#6B7E96"; }}
    >
      {children}
    </button>
  );
}

function NpDivider() {
  return (
    <div
      style={{ width: 1, height: 16, background: "#243650", margin: "0 5px", flexShrink: 0 }}
    />
  );
}

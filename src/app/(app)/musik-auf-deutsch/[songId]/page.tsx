"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { songs, LEVEL_COLORS, GENRE_COLORS, type LuckentextLine, type TranslationLine, type Song } from "@/data/songs";
import { fetchSyncedLyrics, type SyncedLine } from "@/lib/lrclib";

// ── YouTube IFrame API types ──────────────────────────────────────────────────
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: unknown) => void;
            onStateChange?: (e: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}
interface YTPlayerInstance {
  getCurrentTime(): number;
  destroy(): void;
}

// ── Lückentext line ───────────────────────────────────────────────────────────
function LuckenLine({ line, revealed }: { line: LuckentextLine; revealed: boolean }) {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);

  const correct = value.trim().toLowerCase() === line.blank.toLowerCase();
  const parts = line.german.split(new RegExp(`\\b${line.blank}\\b`, "i"));
  const reset = () => { setValue(""); setChecked(false); };

  return (
    <div className="px-4 py-3 flex flex-col gap-1 text-sm border-b border-navy-border/30 last:border-0">
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1">
        {parts.map((part, i) => (
          <span key={i} className="text-text-primary leading-relaxed">
            {part}
            {i < parts.length - 1 && (
              revealed ? (
                <span className="mx-1 text-emerald-400 font-semibold">{line.blank}</span>
              ) : checked ? (
                <span className={`mx-1 inline-flex items-center gap-1 font-medium ${correct ? "text-emerald-400" : "text-red-400"}`}>
                  {correct
                    ? <><CheckCircle2 className="w-3.5 h-3.5" />{value}</>
                    : <><XCircle className="w-3.5 h-3.5" />{value}<span className="text-emerald-400 ml-1">({line.blank})</span></>}
                </span>
              ) : (
                <input
                  value={value}
                  onChange={(e) => { setValue(e.target.value); setChecked(false); }}
                  onKeyDown={(e) => { if (e.key === "Enter") setChecked(true); }}
                  placeholder="___"
                  className="mx-1 inline-block w-24 px-2 py-0.5 bg-navy-light border border-navy-border rounded text-text-primary text-sm focus:outline-none focus:border-purple-500/60 text-center"
                />
              )
            )}
          </span>
        ))}
        {!revealed && !checked && value && (
          <button onClick={() => setChecked(true)} className="text-xs text-purple-400 hover:text-purple-300 ml-1">✓</button>
        )}
        {!revealed && checked && (
          <button onClick={reset} className="ml-1 text-text-muted hover:text-text-secondary">
            <RotateCcw className="w-3 h-3" />
          </button>
        )}
      </div>
      <p className="text-text-muted text-xs italic">{line.turkish}</p>
    </div>
  );
}

// ── Karaoke line style ────────────────────────────────────────────────────────
function getLyricClass(distance: number): string {
  if (distance === 0) return "text-white font-bold text-[15px] opacity-100";
  if (distance === 1) return "text-text-secondary text-sm opacity-85";
  if (distance === 2) return "text-text-secondary text-sm opacity-65";
  return "text-text-muted text-sm opacity-50";
}

// ── Song detail ───────────────────────────────────────────────────────────────
function SongDetail({ song }: { song: Song }) {
  type Tab = "sozler" | "ceviri" | "luckentext" | "kelimeler";
  const [tab, setTab] = useState<Tab>("sozler");
  const [revealed, setRevealed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [syncedLines, setSyncedLines] = useState<SyncedLine[]>([]);
  const [lyricsLoading, setLyricsLoading] = useState(true);

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lyricRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const userScrolledRef = useRef(false);
  const isAutoScrollingRef = useRef(false);
  const scrollResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch synced lyrics from lrclib
  useEffect(() => {
    setLyricsLoading(true);
    setSyncedLines([]);
    fetchSyncedLyrics(song.lyricsQuery.artist, song.lyricsQuery.track)
      .then((result) => {
        if (result?.lines.length) setSyncedLines(result.lines);
      })
      .finally(() => setLyricsLoading(false));
  }, [song.lyricsQuery.artist, song.lyricsQuery.track]);

  // Active line: last line where seconds <= currentTime
  const activeIndex = syncedLines.reduce(
    (best, line, i) => (line.seconds <= currentTime ? i : best),
    -1
  );

  // YouTube IFrame API
  const initPlayer = useCallback(() => {
    if (!window.YT?.Player) return;
    playerRef.current = new window.YT.Player(`yt-player-${song.id}`, {
      videoId: song.youtubeId,
      playerVars: { rel: 0, modestbranding: 1 },
    });
  }, [song.id, song.youtubeId]);

  useEffect(() => {
    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer(); };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }
    return () => {
      try { playerRef.current?.destroy(); } catch {}
      playerRef.current = null;
      if (scrollResumeTimer.current) clearTimeout(scrollResumeTimer.current);
    };
  }, [initPlayer]);

  // Poll currentTime every 200ms
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      try {
        if (playerRef.current?.getCurrentTime) {
          setCurrentTime(playerRef.current.getCurrentTime());
        }
      } catch {}
    }, 200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  // Auto-scroll to active line (paused if user is manually scrolling)
  useEffect(() => {
    if (tab !== "sozler" || activeIndex < 0 || userScrolledRef.current) return;
    const el = lyricRefs.current[activeIndex];
    const box = containerRef.current;
    if (!el || !box) return;
    const elRect = el.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    const target = box.scrollTop + elRect.top - boxRect.top - boxRect.height / 2 + elRect.height / 2;
    isAutoScrollingRef.current = true;
    box.scrollTo({ top: target, behavior: "smooth" });
    setTimeout(() => { isAutoScrollingRef.current = false; }, 600);
  }, [activeIndex, tab]);

  const handleLyricScroll = () => {
    if (isAutoScrollingRef.current) return;
    userScrolledRef.current = true;
    if (scrollResumeTimer.current) clearTimeout(scrollResumeTimer.current);
    scrollResumeTimer.current = setTimeout(() => {
      userScrolledRef.current = false;
    }, 5000);
  };

  const levelColor = LEVEL_COLORS[song.level] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
  const genreColor = GENRE_COLORS[song.genre] ?? "bg-zinc-500/15 text-zinc-400";

  const TABS: { id: Tab; label: string }[] = [
    { id: "sozler", label: "Sözler" },
    { id: "ceviri", label: "Çeviri" },
    { id: "luckentext", label: "Lückentext" },
    { id: "kelimeler", label: "Kelimeler" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-5 pb-12">
      {/* Back + title */}
      <div className="space-y-3">
        <Link href="/musik-auf-deutsch" className="inline-flex items-center gap-2 text-text-muted hover:text-text-secondary text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Müzik listesine dön
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{song.title}</h1>
            <p className="text-text-secondary mt-0.5">{song.artist} · {song.year}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${levelColor}`}>{song.level}</span>
            <span className={`text-xs px-2.5 py-1 rounded-full ${genreColor}`}>{song.genre}</span>
          </div>
        </div>
        <p className="text-text-muted text-sm">{song.description}</p>
      </div>

      {/* Grid: video left, panel right */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">
        {/* YouTube player */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden bg-navy-light border border-navy-border">
          <div id={`yt-player-${song.id}`} className="w-full aspect-video" />
        </div>

        {/* Tab panel */}
        <div className="lg:col-span-2 bg-navy-card border border-navy-border rounded-2xl overflow-hidden flex flex-col" style={{ height: "clamp(380px, 56vh, 520px)" }}>
          {/* Tab bar */}
          <div className="flex border-b border-navy-border shrink-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-2.5 text-[11px] font-medium transition-colors border-b-2 ${
                  tab === t.id
                    ? "text-purple-300 border-purple-500"
                    : "text-text-muted border-transparent hover:text-text-secondary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── SÖZLER (karaoke) ── */}
            {tab === "sozler" && (
              <motion.div
                key="sozler"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex flex-col flex-1 overflow-hidden"
              >
                {lyricsLoading ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 text-text-muted">
                    <Music className="w-6 h-6 animate-pulse" />
                    <span className="text-sm">Sözler yükleniyor…</span>
                  </div>
                ) : syncedLines.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 text-text-muted px-6 text-center">
                    <Music className="w-6 h-6 opacity-40" />
                    <p className="text-sm">Bu şarkı için senkronize söz bulunamadı.</p>
                  </div>
                ) : (
                  <div
                    ref={containerRef}
                    className="overflow-y-auto flex-1 px-4 pb-6 space-y-0.5"
                    style={{ scrollBehavior: "smooth" }}
                    onScroll={handleLyricScroll}
                  >
                    <div className="h-16" />
                    {syncedLines.map((line, i) => {
                      const distance = activeIndex >= 0 ? Math.abs(i - activeIndex) : 99;
                      const isActive = i === activeIndex;
                      return (
                        <div
                          key={i}
                          ref={(el) => { lyricRefs.current[i] = el; }}
                          className={`py-1.5 transition-all duration-300 leading-snug ${getLyricClass(distance)}`}
                        >
                          <span className={`transition-all duration-300 ${isActive ? "border-l-[3px] border-purple-500 pl-3" : "pl-0"}`}>
                            {line.text}
                          </span>
                        </div>
                      );
                    })}
                    <div className="h-16" />
                  </div>
                )}
              </motion.div>
            )}

            {/* ── ÇEVİRİ ── */}
            {tab === "ceviri" && (
              <motion.div
                key="ceviri"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex-1 overflow-y-auto"
              >
                {song.translationLines.map((line, i) => (
                  <div
                    key={i}
                    className="px-4 py-2.5 border-b border-navy-border/20 last:border-0 hover:bg-navy-light/30 transition-colors"
                  >
                    <p className="text-text-primary text-sm leading-relaxed">{line.german}</p>
                    <p className="text-purple-300/70 text-xs italic mt-0.5">{line.turkish}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ── LÜCKENTEXT ── */}
            {tab === "luckentext" && (
              <motion.div
                key="luckentext"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex flex-col flex-1 overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 shrink-0 border-b border-navy-border/40">
                  <p className="text-text-muted text-xs">Enter veya <span className="text-purple-400">✓</span> ile kontrol et</p>
                  <button
                    onClick={() => setRevealed((v) => !v)}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                      revealed
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-navy-light text-text-muted border-navy-border hover:border-purple-500/30"
                    }`}
                  >
                    {revealed ? "Gizle" : "Cevapları gör"}
                  </button>
                </div>
                <div className="overflow-y-auto flex-1">
                  {song.luckentextLines.map((line, i) => (
                    <LuckenLine key={i} line={line} revealed={revealed} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── KELİMELER ── */}
            {tab === "kelimeler" && (
              <motion.div
                key="kelimeler"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex-1 overflow-y-auto p-3 space-y-2"
              >
                {song.vocabulary.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-navy-light border border-navy-border rounded-xl p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-text-primary font-semibold text-sm">{item.word}</span>
                      <span className="text-purple-400 text-xs font-medium shrink-0 text-right">{item.translation}</span>
                    </div>
                    <p className="text-text-muted text-xs italic mt-1 leading-relaxed">{item.example}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ── Route wrapper ─────────────────────────────────────────────────────────────
export default function SongDetailPage() {
  const { songId } = useParams<{ songId: string }>();
  const song = songs.find((s) => s.id === songId);
  if (!song) notFound();
  return <SongDetail song={song!} />;
}

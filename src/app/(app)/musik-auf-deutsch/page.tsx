"use client";

import { useState } from "react";
import Link from "next/link";
import { Music, Music2 } from "lucide-react";
import { motion } from "framer-motion";
import { songs, LEVEL_COLORS, GENRE_COLORS, type Song } from "@/data/songs";

const LEVELS = ["Hepsi", "A1", "A2", "B1", "B2", "C1"] as const;
type LevelFilter = (typeof LEVELS)[number];

function SongCard({ song, index }: { song: Song; index: number }) {
  const levelColor = LEVEL_COLORS[song.level] ?? "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
  const genreColor = GENRE_COLORS[song.genre] ?? "bg-zinc-500/15 text-zinc-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/musik-auf-deutsch/${song.id}`} className="group block">
        <div className="bg-navy-card border border-navy-border rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/5">
          {/* Thumbnail */}
          <div className="relative aspect-video bg-navy-light overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`}
              alt={song.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Year badge */}
            <span className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {song.year}
            </span>
          </div>

          {/* Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-text-primary text-sm leading-snug group-hover:text-purple-300 transition-colors line-clamp-1">
                {song.title}
              </h3>
              <p className="text-text-muted text-xs mt-0.5">{song.artist}</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${levelColor}`}>
                {song.level}
              </span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${genreColor}`}>
                {song.genre}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function MusikAufDeutschPage() {
  const [activeLevel, setActiveLevel] = useState<LevelFilter>("Hepsi");

  const filtered =
    activeLevel === "Hepsi" ? songs : songs.filter((s) => s.level === activeLevel);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
          <Music className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Musik auf Deutsch</h1>
          <p className="text-text-muted text-sm mt-1">
            Almanca şarkılar aracılığıyla dinle, sözleri takip et ve kelime dağarcığını genişlet.
          </p>
        </div>
      </div>

      {/* Level Filter */}
      <div className="flex gap-2 flex-wrap">
        {LEVELS.map((level) => {
          const isActive = activeLevel === level;
          const count =
            level === "Hepsi"
              ? songs.length
              : songs.filter((s) => s.level === level).length;

          return (
            <button
              key={level}
              onClick={() => setActiveLevel(level)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                isActive
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/50"
                  : "bg-navy-card text-text-muted border-navy-border hover:border-purple-500/30 hover:text-text-secondary"
              }`}
            >
              {level}
              <span className={`ml-1.5 text-xs ${isActive ? "text-purple-400" : "text-text-muted"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Song Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Music2 className="w-10 h-10 text-text-muted mb-3" />
          <p className="text-text-muted text-sm">Bu seviyede henüz şarkı yok.</p>
        </div>
      )}
    </div>
  );
}

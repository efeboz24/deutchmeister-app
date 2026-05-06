"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, BookOpen, Target, Sparkles } from "lucide-react";

export default function PruefungstrainingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden bg-gradient-to-br from-navy-light via-navy-card to-navy rounded-3xl border border-navy-border p-8 md:p-10"
      >
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
          <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-8 h-8 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                YENİ BÖLÜM
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-skill-grammatik/20 text-skill-grammatik border border-skill-grammatik/30">
                Sınav Hazırlık
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-3">
              Prüfungstraining
            </h1>
            <p className="text-text-secondary text-base leading-relaxed max-w-xl">
              Geçmiş sınavlara benzeyen sorularla pratik yap. Gerçek sınav formatında alıştırmalarla
              kendinizi test edin ve eksiklerinizi keşfedin.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Coming soon area */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            icon: Target,
            title: "Gerçek Sınav Formatı",
            desc: "Sertifika sınavlarına benzer sorular",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
          },
          {
            icon: BookOpen,
            title: "Konu Bazlı Testler",
            desc: "Sınav kazandıran konulardan özel soru setleri",
            color: "text-skill-lesen",
            bg: "bg-skill-lesen/10",
            border: "border-skill-lesen/20",
          },
          {
            icon: Sparkles,
            title: "Anlık Geri Bildirim",
            desc: "Her sorudan sonra açıklama ve ipuçları",
            color: "text-gold",
            bg: "bg-gold/10",
            border: "border-gold/20",
          },
        ].map(({ icon: Icon, title, desc, color, bg, border }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: "easeOut" }}
            className={`${bg} border ${border} rounded-2xl p-5 flex flex-col gap-3`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} border ${border}`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <h3 className="text-text-primary font-bold text-sm mb-1">{title}</h3>
              <p className="text-text-muted text-xs leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        className="bg-navy-card border border-dashed border-navy-border rounded-2xl p-16 flex flex-col items-center justify-center gap-4 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-navy-border/50 flex items-center justify-center">
          <ClipboardCheck className="w-8 h-8 text-text-muted" />
        </div>
        <div>
          <p className="text-text-secondary font-semibold text-base">Sınav setleri hazırlanıyor</p>
          <p className="text-text-muted text-sm mt-1">Yakında bu bölüme sınav soruları eklenecek</p>
        </div>
      </motion.div>
    </div>
  );
}

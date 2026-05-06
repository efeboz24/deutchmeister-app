"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Headphones, BookOpen, PenLine, Mic } from "lucide-react";

const shortcuts = [
  { href: "/practice", label: "Hören Pratiği", icon: Headphones, color: "text-blue-400",   bg: "bg-blue-500/10" },
  { href: "/practice", label: "Lesen Pratiği", icon: BookOpen,   color: "text-green-400",  bg: "bg-green-500/10" },
  { href: "/practice", label: "Schreiben",     icon: PenLine,    color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { href: "/practice", label: "Sprechen",      icon: Mic,        color: "text-purple-400", bg: "bg-purple-500/10" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export function PracticeShortcuts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Pratik Kısayolları</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-2 gap-3">
          {shortcuts.map(({ href, label, icon: Icon, color, bg }, i) => (
            <motion.div
              key={label}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -3, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              <Link
                href={href}
                className="flex flex-col items-center gap-2 p-4 bg-navy border border-navy-border rounded-lg hover:border-gold/40 transition-colors duration-150 group"
              >
                <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <span className="text-xs text-text-secondary group-hover:text-text-primary text-center font-medium transition-colors">
                  {label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

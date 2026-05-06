import { Music } from "lucide-react";

export default function MusikAufDeutschPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
        <Music className="w-8 h-8 text-purple-400" />
      </div>
      <h1 className="text-2xl font-bold text-text-primary">Musik auf Deutsch</h1>
      <p className="text-text-muted text-sm max-w-sm">Bu bölüm yakında aktif olacak.</p>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { LESSON_CONTENT } from "@/lib/lesson-content";
import { LessonViewer } from "@/components/learn/LessonViewer";

interface PageProps {
  params: Promise<{ levelId: string; unitId: string; lessonId: string }>;
}

export default async function LessonPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { levelId, unitId, lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      unit: {
        include: { level: true },
      },
    },
  });

  if (!lesson || lesson.unit.levelId !== levelId || lesson.unitId !== unitId) notFound();

  const content = LESSON_CONTENT[lesson.name];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted flex-wrap">
        <Link href="/learn" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Öğrenme Yolu
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/learn/${levelId}`} className="hover:text-text-primary transition-colors">
          {lesson.unit.level.name}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/learn/${levelId}/${unitId}`} className="hover:text-text-primary transition-colors truncate max-w-[120px]">
          {lesson.unit.name.replace(/^Ünite \d+: /, "")}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-text-secondary truncate max-w-[120px]">{lesson.name}</span>
      </div>

      {content ? (
        <LessonViewer content={content} lessonName={lesson.name} />
      ) : (
        <div className="bg-navy-card border border-navy-border rounded-2xl p-12 text-center">
          <p className="text-text-secondary text-sm mb-2">Bu ders için içerik henüz hazırlanmadı.</p>
          <p className="text-text-muted text-xs">Yakında eklenecek.</p>
        </div>
      )}
    </div>
  );
}

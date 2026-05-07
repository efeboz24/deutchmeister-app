import { toast } from "sonner";

type Skill = "horen" | "lesen" | "schreiben" | "sprechen" | "grammatik";

export async function saveProgress(opts: {
  xp: number;
  skill: Skill;
  skillScore: number;
  minutes?: number;
}) {
  const headers = { "Content-Type": "application/json" };
  try {
    const requests: Promise<Response>[] = [
      fetch("/api/progress/xp",    { method: "POST", headers, body: JSON.stringify({ xp: opts.xp }) }),
      fetch("/api/progress/skill", { method: "POST", headers, body: JSON.stringify({ skill: opts.skill, score: opts.skillScore }) }),
    ];
    if (opts.minutes) {
      requests.push(fetch("/api/progress/session", { method: "POST", headers, body: JSON.stringify({ minutes: opts.minutes }) }));
    }

    const [xpRes, ...rest] = await Promise.all(requests);

    if (!xpRes.ok || rest.some((r) => !r.ok)) {
      toast.error("İlerleme kaydedilemedi");
      return;
    }

    const xpData = await xpRes.json() as {
      leveledUp: boolean;
      newLevel: string | null;
    };

    if (xpData.leveledUp && xpData.newLevel) {
      window.dispatchEvent(
        new CustomEvent("levelup", { detail: { newLevel: xpData.newLevel } })
      );
    }
  } catch {
    toast.error("İlerleme kaydedilemedi");
  }
}

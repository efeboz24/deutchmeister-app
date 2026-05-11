export interface SyncedLine {
  seconds: number;
  text: string;
}

export interface LrclibResult {
  lines: SyncedLine[];
  plainLyrics: string;
}

function parseLrc(lrc: string): SyncedLine[] {
  return lrc
    .split("\n")
    .flatMap((line) => {
      const match = line.match(/^\[(\d{2}):(\d{2})\.(\d+)\]\s*(.*)/);
      if (!match) return [];
      const text = match[4].trim();
      if (!text) return [];
      const seconds =
        parseInt(match[1]) * 60 +
        parseInt(match[2]) +
        parseInt(match[3].slice(0, 2)) / 100;
      return [{ seconds, text }];
    });
}

export async function fetchSyncedLyrics(
  artist: string,
  track: string
): Promise<LrclibResult | null> {
  try {
    const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(track)}`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.instrumental) return null;
    return {
      lines: parseLrc(data.syncedLyrics ?? ""),
      plainLyrics: data.plainLyrics ?? "",
    };
  } catch {
    return null;
  }
}

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT_PATH = resolve(__dirname, "../src/data/spotify.json");

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error("Missing env vars: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN");
  process.exit(1);
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

async function getAccessToken(): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json() as { access_token: string };
  return data.access_token;
}

async function fetchSpotifyApi(token: string, endpoint: string): Promise<any> {
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function main() {
  console.log("Fetching Spotify data...");

  let token: string;
  try {
    token = await getAccessToken();
    console.log("Access token obtained.");
  } catch (error) {
    console.error("Failed to get access token:", error);
    process.exit(1);
  }

  const playlistsResponse = await fetchSpotifyApi(token, "/me/playlists?limit=50");
  const playlistItems = playlistsResponse.items ?? [];

  console.log(`Found ${playlistItems.length} playlists.`);

  const playlists = [];

  for (const summary of playlistItems) {
    console.log(`  Fetching: ${summary.name}`);

    try {
      const full = await fetchSpotifyApi(token, `/playlists/${summary.id}`);

      const trackItems = full.items?.items ?? full.tracks?.items ?? [];

      const tracks = trackItems
        .filter((entry: any) => (entry.item ?? entry.track) !== null)
        .map((entry: any) => {
          const track = entry.item ?? entry.track;
          return {
            name: track.name,
            artist: track.artists?.map((a: any) => a.name).join(", ") ?? "Unknown",
            album: track.album?.name ?? "Unknown",
            duration: formatDuration(track.duration_ms ?? 0),
            image: track.album?.images?.[0]?.url ?? null,
            url: track.external_urls?.spotify ?? "",
          };
        });

      const totalTracks = full.items?.total ?? full.tracks?.total ?? tracks.length;

      playlists.push({
        id: summary.id,
        name: summary.name,
        description: summary.description || "",
        image: summary.images?.[0]?.url ?? null,
        url: summary.external_urls?.spotify ?? "",
        totalTracks,
        tracks,
      });

      console.log(`    → ${tracks.length} tracks`);
    } catch (error) {
      console.warn(`  Warning: Failed to fetch ${summary.name}:`, error);
    }
  }

  const data = {
    playlists,
    fetchedAt: new Date().toISOString(),
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`\nDone! Wrote ${playlists.length} playlists to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

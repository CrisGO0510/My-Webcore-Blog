export interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  duration: string;
  image: string | null;
  url: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  image: string | null;
  url: string;
  totalTracks: number;
  tracks: SpotifyTrack[];
}

export interface SpotifyData {
  playlists: SpotifyPlaylist[];
  fetchedAt: string;
}

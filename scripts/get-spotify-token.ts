import { createInterface } from "readline";

const CLIENT_ID = "11785dec0aa94685af03ced7f8f29fa6";
const CLIENT_SECRET = "74489ea904e345df90a283d45a11b6ad";
const REDIRECT_URI = "https://oauth.pstmn.io/v1/callback";
const SCOPES = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-private",
].join(" ");

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", CLIENT_ID);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
authUrl.searchParams.set("scope", SCOPES);

console.log("\n1. Abre este enlace en tu navegador:\n");
console.log(`   ${authUrl.toString()}\n`);
console.log("2. Autoriza la app en Spotify");
console.log("3. Postman te redirige a una URL con ?code=XXXXX");
console.log("4. Copia SOLO el valor del code de la URL\n");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Pega el code aquí: ", async (code) => {
  rl.close();

  if (!code.trim()) {
    console.error("No se proporcionó ningún code.");
    process.exit(1);
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code.trim(),
        redirect_uri: REDIRECT_URI,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Token exchange failed: ${response.status} ${text}`);
    }

    const data = (await response.json()) as {
      access_token: string;
      refresh_token: string;
      expires_in: number;
    };

    console.log("\n" + "=".repeat(50));
    console.log("SPOTIFY_REFRESH_TOKEN:");
    console.log(data.refresh_token);
    console.log("=".repeat(50));
    console.log("\nAgrega este valor como secret SPOTIFY_REFRESH_TOKEN en GitHub Actions.");
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
});

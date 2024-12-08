// app/api/steam/GetOwnedGamesSteam/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const steamId = url.searchParams.get("steamId");
  const steamIdRegex = /^\d{17}$/;
  
  if (!steamId || !steamIdRegex.test(steamId)) {
    return NextResponse.json(
      { error: "Invalid or missing steamId" },
      { status: 400 }
    );
  }
  
  const apiKey = process.env.STEAM_API_KEY;
  
  try {
    const res = await fetch(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1&format=json`
    );
    
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 }
      );
    }
    
    const data = await res.json();
    
    if (!data.response.games || data.response.games.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const gamesData = data.response.games.map((game) => ({
      appid: game.appid,
      name: game.name,
      playtime_forever: game.playtime_forever,
    }));
    
    return NextResponse.json({ response: { games: gamesData } });
  } catch (error) {
    console.error("Error fetching data", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching the data" },
      { status: 500 }
    );
  }
}

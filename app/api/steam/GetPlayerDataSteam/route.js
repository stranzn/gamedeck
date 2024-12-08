// app/api/steam/GetPlayerDataSteam/route.js

import { NextResponse } from "next/server";

export async function GET(request) {

  console.log("STARTING STEAM API PROCESS");

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
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (!data.response.players.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const playerData = data.response.players.map((player) => ({
      steamid: player.steamid,
      personaname: player.personaname, // users display name
      profileurl: player.profileurl,
      avatarfull: player.avatarfull, // users 184x184px avatar
      personastate: player.personastate, // users status (0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play)
    }));

    return NextResponse.json({ players: playerData });
  } catch (error) {
    console.error("Error fetching data", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching the data" },
      { status: 500 }
    );
  }
}

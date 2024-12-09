"use client";

import { useEffect, useState } from 'react';
import Game from "./game";

export default function GameList({ uid = null, steamId = null }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGamesDataSteam = async () => {
            if (steamId === null) return;
            setLoading(true);   
            try {
                const response = await fetch(`/api/steam/GetOwnedGamesSteam?steamId=${steamId}`)
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to fetch Steam profile');
                }

                const gameData = await response.json();
                setGames(gameData.response.games || []);
            } catch (error) {
                console.error("Error fetching steam data:", error);
                setError(error.message || "Error fetching steam data.");
            } finally {
                setLoading(false);
            }
        }

        if (steamId) {
            fetchGamesDataSteam();
        }
    }, [steamId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="font-alagard">Loading user data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center">
                <p>{error}</p>
            </div>
        );
    }

    if (!games.length) {
        return (
            <div className="text-center">
                <p className="font-alagard">No games found for this Steam account.</p>
            </div>
        );
    }

    return (
        <div className='flex flex-wrap justify-center'>
            {games.map((game) => (
                <Game
                    key={game.appid}
                    name={game.name}
                    time={game.playtime_forever}
                    icon={game.img_icon_url}
                    appid={game.appid}
                />
            ))}
        </div>
    );
}
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Game({ name, time, icon = null, appid = null }) {
    const [gameIcon, setGameIcon] = useState('/defaultGame.png');
    const [hours, setHours] = useState(null);

    useEffect(() => {
        const constructIcon = async () => {
            if (appid !== null && icon) {
                try {
                    const url = `/api/steam/GetSteamIcons?appid=${appid}&iconhash=${icon}`;

                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const imageBlob = await response.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setGameIcon(imageUrl);
                } catch (err) {
                    console.error("Error fetching steam icon:", err);
                    setGameIcon('/defaultGame.png');
                }
            }
        };

        if (icon) {
            constructIcon();
        }
    }, [appid, icon]);

    useEffect(() => {
        const convertTime = () => {
            const mins = parseFloat(time);
            if (!isNaN(mins) && mins >= 0) {
                setHours((mins / 60).toFixed(0));
            } else if (!isNaN(mins) && mins === 0) {
                setHours(0);
            }
        }

        if (time) {
            convertTime();
        }
    }, [time]);

    return (
        <div className='w-1/2 p-1'>
            <div className="flex items-center p-4 bg-slate-900 rounded-lg shadow-md hover:bg-slate-800 transition-colors duration-300 space-x-4">
                <Image
                    src={gameIcon}
                    width={50}
                    height={50}
                    alt="Icon"
                    className='rounded-md border-2 border-gray-300'
                />
                <div>
                    <h2 className="text-lg font-semibold text-white font-alagard">{name}</h2>
                    <p className="text-sm text-gray-300 font-alagard">
                        {hours > 0 ? `${hours} hours played` : 'No hours played'}
                    </p>
                </div>
            </div>
        </div>
    );
}
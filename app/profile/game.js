"use client";

import { useEffect, useState } from 'react';

export default function Game({name, time, icon=null, platform=null, appid=null}) {
    const [hours, setHours] = useState(null);

    const constructIcon =  async () => {
        if (icon !== null) {

        }
    }

    useEffect(() => {
        const convertTime = () => {
            const mins = parseFloat(time);
            if (!isNaN(mins) && mins >= 0){
                setHours((mins / 60).toFixed(0));
            }
        }
    
        if (time) {
            convertTime();
        }
    }, [time]);

    return(
        <div>
            <h2>{name}</h2>
            <p>{hours}</p>
        </div>
    );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getUserData } from "@/app/_services/user-data-service";


export default function ProfileHead({ uid }) {
  const [userData, setUserData] = useState(null);
  const [steamData, setSteamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {

        const data = await getUserData(uid);

        if (data) {
          setUserData(data);
        } else {
          throw new Error("User does not exist or data unavailable.");
        }

        if (data.steamId !== "") {
          const response = await fetch(`/api/steam/GetPlayerDataSteam?steamId=${data.steamId}`);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch Steam profile');
          }
          const steamData = await response.json();
          setSteamData(steamData);
        } else {
          
        }
      } catch (err) {
        setError(err.message || "Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

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

  if (!userData) {
    return (
      <div className="text-center">
        <p>User data not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 w-1/2 mx-auto p-4 mb-4 mt-10 rounded-xl shadow-2xl border-2 border-slate-600">
      <div className="flex items-center space-x-6">
        <Image
          src={steamData?.players?.[0]?.avatarfull || "/defaultUser.png"}
          width={100}
          height={100}
          alt="Profile Picture"
          className="rounded-full border-4 border-slate-500 hover:scale-105 transition-transform duration-300"
        />
        <div className="flex-grow">
          <h2 className="text-4xl font-bold text-white font-alagard tracking-wider">
            {userData.username}
          </h2>
          <p className="text-sm text-gray-300 font-alagard tracking-wide">
            {userData.email}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {userData.steamId !== "" && steamData?.players?.[0] ? (
            <div className="flex items-center space-x-2 bg-slate-700 px-3 py-2 rounded-lg">
              <Image
                src="/steamLogo.png"
                width={30}
                height={30}
                alt="Steam Logo"
                className="opacity-80"
              />
              <p className="text-white font-alagard text-sm tracking-wide">
                {steamData.players[0].personaname}
              </p>
            </div>
          ) : (
            <div className="bg-slate-700 px-3 py-2 rounded-lg">
              <p className="text-gray-400 font-alagard text-sm">
                No Steam account linked
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

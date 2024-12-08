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

        if (data.steamId !== null) {
          const response = await fetch(`/api/steam/GetPlayerDataSteam?steamId=${data.steamId}`);

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch Steam profile');
          }
          const steamData = await response.json();
          setSteamData(steamData);
        }   
      } catch (err) {
        console.error("Error fetching user data:", err);
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
    <div className="bg-slate-700 w-1/2 mx-auto p-2 mb-4 mt-10 rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <Image
          src={steamData?.players?.[0]?.avatarfull || "/default-profile.png"}
          width={84}
          height={84}
          alt="Profile Picture"
          className="rounded-full border-4 border-black"
        />
        <div>
          <h2 className="text-4xl font-bold text-black font-alagard">{userData.username}</h2>
          {/* You can add more user details here if needed */}
        </div>
      </div>
    </div>
  );
}

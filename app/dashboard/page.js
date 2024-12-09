"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import { getUserData } from "../_services/user-data-service";
import ProfileHead from "../profile/profile-head";
import GameList from "../profile/game-list";

export default function Page() {
  const { user, loading, logout } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else {
      setUid(user.uid);
    }
  }, [user, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(user.uid);
        if (data) {
          console.log(data);
          setUserData(data);
        } else {
          throw new Error("User does not exist or data unavailable.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Error fetching user data.");
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <ProfileHead uid={uid} />
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={() => {
            logout().catch((err) => setError(err.message));
          }}
          className="font-alagard text-xl px-8 py-3 bg-slate-800 text-white rounded-xl 
      hover:bg-emerald-700 transition duration-300 uppercase tracking-wider 
      shadow-md hover:shadow-emerald-600/50 border-2 border-slate-600 
      hover:border-emerald-700 active:scale-95 transform"
        >
          Logout
        </button>
        <button
          onClick={() => {
            router.push("/edit");
          }}
          className="font-alagard text-xl px-8 py-3 bg-slate-800 text-white rounded-xl 
      hover:bg-blue-700 transition duration-300 uppercase tracking-wider 
      shadow-md hover:shadow-blue-600/50 border-2 border-slate-600 
      hover:border-blue-700 active:scale-95 transform"
        >
          Edit Profile
        </button>
      </div>
      {userData?.steamId && (
        <div className="mt-8">
          <GameList steamId={userData.steamId} />
        </div>
      )}
    </div>
  );
}

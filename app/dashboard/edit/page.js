"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import { getUserData, updateUserData } from "../../_services/user-data-service";

export default function EditPage() {
  const router = useRouter();
  const { user } = useUserAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    steamId: null,
    games: [],
  });

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const data = await getUserData(user.uid);

        if (data) {
          setUserData({
            username: data.username,
            email: data.email,
            steamId: data.steamId,
            games: data.games
          });
        } else {
          throw new Error("Could not fetch user data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);

      }
    }

    if (user) {
      fetchUserData();
    }

  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const validateSteamId = (input) => {
      const regex = /^\d{17}$/;
      return regex.test(input);
  };

    try {
      
      if (!userData.username || !userData.email) {
        throw new Error("Username and email are required");
      }

      if (userData.steamId === "") {
        userData.steamId = undefined;
      }

      if (!validateSteamId(userData.steamId) && userData.steamId !== undefined) {
        throw new Error("Invalid Steam ID");
      }

      const updatedUser = await updateUserData(user.uid, userData);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen font-alagard">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-4xl font-alagard text-white text-center mb-6">Edit Profile</h1>
        
        {error && (
          <div className="bg-red-900 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-emerald-900 text-white p-4 rounded-lg mb-4">
            Profile updated successfully!
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white font-alagard mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-white font-alagard mb-2">Steam ID</label>
            <input
              name="steamId"
              value={userData.steamId}
              onChange={handleInputChange}
              className="w-full p-3 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-grow font-alagard text-xl px-8 py-3 bg-slate-800 text-white rounded-xl 
              hover:bg-emerald-700 transition duration-300 uppercase tracking-wider 
              shadow-md hover:shadow-emerald-600/50 border-2 border-slate-600 
              hover:border-emerald-700 active:scale-95 transform
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex-grow font-alagard text-xl px-8 py-3 bg-slate-800 text-white rounded-xl 
              hover:bg-red-700 transition duration-300 uppercase tracking-wider 
              shadow-md hover:shadow-red-600/50 border-2 border-slate-600 
              hover:border-red-700 active:scale-95 transform"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

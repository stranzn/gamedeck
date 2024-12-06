"use client";

import { useState, useEffect } from "react";
import { getUserData } from "@/app/_services/user-data-service";


export default function ProfileHead({ uid }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData(uid);
        if (data) {
          setUserData(data);
        } else {
          throw new Error("User does not exist or data unavailable.");
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
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
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
    <div>
      <div>
        <p>Username: {userData.username}</p>
      </div>
    </div>
  );
}

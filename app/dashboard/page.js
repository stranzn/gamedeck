"use client";
import { useState, useEffect } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import ProfileHead from "../profile/profile-head";

export default function Page() {
  const { user, loading, logout } = useUserAuth();
  const [uid, setUid] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if no user is logged in
    if (!user) {
      router.push("/auth/login");
    } else {
      setUid(user.uid);
    }
  }, [user, router]);

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
      <button onClick={() => {
        logout().catch((err) => setError(err.message));
      }}>
        Logout
      </button>
    </div>
  );
}
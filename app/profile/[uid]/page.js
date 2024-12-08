"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserData } from "@/app/_services/user-data-service";
import ProfileHead from "../profile-head";

export default function PublicProfile() {
    const params = useParams();
    const uid = params?.uid;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUserData(uid);
                if (!data) {
                    setError("User not found.");
                } else {
                    setUserData(data);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Error loading profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [uid]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading profile...</p>
            </div>
        );
    }

    return(
        <div>
            <ProfileHead uid={uid}/>
        </div>
    );
}
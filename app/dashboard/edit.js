"use client";

import { useState, useEffect } from "react";
import { useUserAuth } from "@/app/_utils/auth-context";
import { useRouter } from "next/navigation";
import { getUserData } from "../_services/user-data-service";

export default function EditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    steamId: null,
    games: [],
  });


  return <div></div>;
}

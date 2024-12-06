"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ensure loading starts as `true`

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null); // Explicitly set `null` if no user is logged in
            setLoading(false); // Stop loading once we have the user or null
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            // Firebase automatically updates the user state in `onAuthStateChanged`
            return userCred.user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const register = async (email, password) => {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            // Firebase automatically updates the user state in `onAuthStateChanged`
            return userCred.user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw new Error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {!loading && children} {/* Render children only after loading is false */}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};


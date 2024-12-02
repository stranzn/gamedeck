"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password);
            return userCred.user;
        } catch (error) {
            setLoading(false);
            throw new Error(error.message);
        }
    };

    const register = async (email, password) => {
        setLoading(true);
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password);
            return userCred.user;
        } catch (error) {
            setLoading(false);
            throw new Error(error.message);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setLoading(false); 
            throw new Error(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth = () => {
    return useContext(AuthContext);
};

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createUserDocument } from '@/app/_services/user-data-service';
import { useUserAuth } from '@/app/_utils/auth-context';

export default function RegisterUser() {

    const router = useRouter();
    const { register, loading, user } = useUserAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState(null);

    useEffect(() => {
        // Redirect to dashboard if the user is already logged in
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const user = await register(email, password);
            await createUserDocument(user); // Create user document after successful registration
            routeLog();
        } catch (error) {
            setError(error.message);
        }
    };

    const routeLog = () => {
        router.push("/auth/login"); // Redirect to login page after successful registration
    };

    const formInputStyle = 'p-1 text-black border-2 border-black';

    return (
        <div>
            <div className='flex flex-col justify-center items-center h-screen'>
                <h1 className='my-5 font-mono text-xl'>Register</h1>
                <form onSubmit={handleRegister}
                    className='p-5 flex flex-col justify-center items-center gap-5 border-3 rounded-md border-black bg-slate-500'>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={formInputStyle}
                        required
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={formInputStyle}
                        required
                    />
                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className={formInputStyle}
                        required
                    />
                    <div className='border-black'>
                        <button type="submit" disabled={loading} className='p-3 bg-lime-400 text-black rounded'>
                            {loading ? "Loading..." : "Confirm"}
                        </button>
                    </div>
                    {error && <p className="bg-red-600 p-1 rounded text-black">{error}</p>}
                </form>
                <p>Or</p>
                <button onClick={routeLog} className='p-1 bg-orange-500 text-black'>Login</button>
            </div>
        </div>
    );
}

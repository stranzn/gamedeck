"use client";

import { useState, useEffect } from 'react';
import { useUserAuth } from '@/app/_utils/auth-context';
import { useRouter } from 'next/navigation';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login, loading, user } = useUserAuth(); // Get loading and user from context
    const router = useRouter();

    useEffect(() => {
        // If the user is already logged in, redirect to dashboard
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous error

        try {
            await login(email, password); // Attempt login
            router.push("/dashboard"); // Redirect to dashboard on successful login
        } catch (error) {
            setError("Invalid Email Or Password"); // Display error message
        }
    };

    const routeReg = () => {
        router.push("/auth/register"); // Redirect to registration page
    };

    const formInputStyle = 'p-1 text-black border-2 border-black';

    return (
        <div>
            <div className='flex flex-col justify-center items-center h-screen'>
                <h1 className='my-5 font-mono text-xl'>Login</h1>
                <form onSubmit={handleSignIn} className='p-5 flex flex-col justify-center items-center gap-5 border-3 rounded-md border-black bg-slate-500'>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className={formInputStyle}
                        value={email}
                        required
                    />
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className={formInputStyle}
                        value={password}
                        required
                    />
                    <div className='border-black'>
                        <button type="submit" disabled={loading} className='p-3 bg-lime-400 text-black rounded'>
                            {loading ? "Loading..." : "Confirm"}
                        </button>
                    </div>
                    {error && <p className="bg-red-600 p-1 rounded text-black">{error}</p>}
                </form>
                <p className='m-2'>Or</p>
                <button onClick={routeReg} className='p-1 bg-orange-500 text-black'>
                    Create an account
                </button>
            </div>
        </div>
    );
}

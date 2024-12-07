"use client";
import { useState, useEffect } from 'react';
import { useUserAuth } from '@/app/_utils/auth-context';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login, loading, user } = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (error) {
            setError("Invalid Email Or Password");
        }
    };

    const routeReg = () => {
        router.push("/auth/register");
    };

    return (
        <div className="bg-black min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-900 rounded-xl shadow-2xl border-2 border-neutral-700">
                <div className="p-8">
                    <h1 className='text-3xl font-bold text-center text-white mb-8 font-alagard'>Login</h1>
                    <form onSubmit={handleSignIn} className='space-y-6'>
                        <div>
                            <input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full px-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                                value={email}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                                value={password}
                                required
                            />
                        </div>
                        {error && (
                            <div className="bg-red-900/50 text-red-300 p-3 rounded-lg text-center">
                                {error}
                            </div>
                        )}
                        <div className="flex flex-col space-y-4">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-emerald-700 text-white py-3 rounded-lg hover:bg-emerald-600 transition duration-300 font-alagard uppercase tracking-wider"
                            >
                                {loading ? "Loading..." : "Sign In"}
                            </button>
                            
                            <div className="flex items-center justify-center space-x-4">
                                <div className="h-px w-full bg-neutral-700"></div>
                                <p className="text-neutral-400 font-alagard">Or</p>
                                <div className="h-px w-full bg-neutral-700"></div>
                            </div>
                            
                            <button 
                                type="button"
                                onClick={routeReg}
                                className="w-full bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-700 transition duration-300 font-alagard uppercase tracking-wider"
                            >
                                Create an Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
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
           await createUserDocument(user);
           routeLog();
       } catch (error) {
           setError(error.message);
       }
   };

   const routeLog = () => {
       router.push("/auth/login");
   };

   return (
       <div className="bg-black min-h-screen flex items-center justify-center p-4">
           <div className="w-full max-w-md bg-neutral-900 rounded-xl shadow-2xl border-2 border-neutral-700">
               <div className="p-8">
                   <h1 className='text-3xl font-bold text-center text-white mb-8 font-alagard'>Register</h1>
                   <form onSubmit={handleRegister} className='space-y-6'>
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
                       <div>
                           <input
                               type="password"
                               onChange={(e) => setConfirmPassword(e.target.value)}
                               placeholder="Confirm Password"
                               className="w-full px-4 py-3 bg-neutral-800 text-white border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
                               value={confirmPassword}
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
                               {loading ? "Loading..." : "Create Account"}
                           </button>
                           
                           <div className="flex items-center justify-center space-x-4">
                               <div className="h-px w-full bg-neutral-700"></div>
                               <p className="text-neutral-400 font-alagard">Or</p>
                               <div className="h-px w-full bg-neutral-700"></div>
                           </div>
                           
                           <button 
                               type="button"
                               onClick={routeLog}
                               className="w-full bg-neutral-800 text-white py-3 rounded-lg hover:bg-neutral-700 transition duration-300 font-alagard uppercase tracking-wider"
                           >
                               Login
                           </button>
                       </div>
                   </form>
               </div>
           </div>
       </div>
   );
}

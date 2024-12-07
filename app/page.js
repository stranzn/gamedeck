"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import localFont from 'next/font/local';

const alagard = localFont({
 src: "./fonts/alagard.ttf",
 variable: "--font-alagard",
 weight: "100 900",
});

export default function Home() {
 const [shadowColor, setShadowColor] = useState('');
 const router = useRouter();

 useEffect(() => {
   const colors = [
     'red', 'orange', 'yellow', 'green',
     'blue', 'indigo', 'violet', 'purple'
   ];
   let index = 0;
   const changeColor = () => {
     setShadowColor(colors[index]);
     index = (index + 1) % colors.length;
   };
   const colorInterval = setInterval(changeColor, 2000);
   changeColor();
   return () => clearInterval(colorInterval);
 }, []);

 const routeReg = () => {
   router.push("/auth/register");
 }

 const routeLog = () => {
   router.push("/auth/login");
 }

 return (
   <main className={`${alagard.variable} bg-black min-h-screen`}>
     <div className="flex flex-col justify-center items-center h-screen">
       <h1
         className="text-7xl font-alagard text-white transition-all duration-2000 ease-in-out"
         style={{
           textShadow: `4px 4px 0px ${shadowColor}`,
           transition: 'text-shadow 2s ease-in-out'
         }}
       >
         GameDeck
       </h1>
       <div className="flex justify-center items-center space-x-4 mt-8">
         <button
           onClick={routeReg}
           className="font-alagard text-xl px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-emerald-600 transition duration-300 uppercase tracking-wider"
         >
           Register
         </button>
         <p className='font-alagard text-white text-lg'>Or</p>
         <button
           onClick={routeLog}
           className="font-alagard text-xl px-6 py-2 bg-neutral-800 text-white rounded-lg hover:bg-emerald-600 transition duration-300 uppercase tracking-wider"
         >
           Login
         </button>
       </div>
     </div>
   </main>
 );
}
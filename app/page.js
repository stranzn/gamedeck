"use client";
import { useRouter } from 'next/navigation';
import localFont from 'next/font/local';

const alagard = localFont({
  src: "./fonts/alagard.ttf",
  variable: "--font-alagard",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();
  const routeReg = () => {
    router.push("/auth/register");
  }
  const routeLog = () => {
    router.push("/auth/login");
  }

  return (
    <main className={`${alagard.variable}`}>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl font-alagard">GameDeck</h1>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button 
            onClick={routeReg} 
            className="font-alagard"
          >
            Register
          </button>
          <p>Or</p>
          <button 
            onClick={routeLog}
            className="font-alagard"
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

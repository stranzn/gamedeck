import { AuthContextProvider } from '@/app/_utils/auth-context';

// import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "GameDeck",
  description: "All your games in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}




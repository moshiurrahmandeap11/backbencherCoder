import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/sharedItems/Navbar/Navbar";
import "./globals.css";
import AuthProvider from "./lib/provider/AuthProvider/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Backbencher Coder",
  description: "Backbencher Coder crafts cutting-edge website and app solutions, transforming bold visions into seamless digital realities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider >

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
      </AuthProvider>
    </html>
  );
}

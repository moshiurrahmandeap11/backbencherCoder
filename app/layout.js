import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#051320',
                color: '#D9FDA3',
                border: '1px solid rgba(217, 253, 163, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#D9FDA3',
                  secondary: '#051320',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff4444',
                  secondary: '#051320',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
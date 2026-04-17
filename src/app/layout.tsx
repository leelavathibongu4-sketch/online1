import type { Metadata } from "next";
import { Outfit, Syncopate } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "600", "800"],
});

const syncopate = Syncopate({
  subsets: ["latin"],
  variable: "--font-syncopate",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "EXAMPRO | Premium Online Quiz & Exam Platform",
  description: "A cinematic, real-time online platform for seamless exam management and student assessments with built-in coding environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${outfit.variable} ${syncopate.variable}`}>
       <body className="antialiased overflow-x-hidden selection:bg-accent-blue selection:text-white font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}

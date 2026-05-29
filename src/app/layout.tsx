import type { Metadata } from "next";

import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Medium Clone - Sanity",
  description: "A Medium clone built with Next.js, Sanity & Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

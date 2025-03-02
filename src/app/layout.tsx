import React from 'react';
import type { Metadata } from "next";
import Link from 'next/link';
import Sidebar from './components/Sidebar';

import "./globals.css";
import { Header } from "./components";

export const metadata: Metadata = {
  title: "Next.js on Firebase App Hosting",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark-theme">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <div className="dots" />
            <Header />
            {children}
            <div className="bottom-gradient" />
          </main>
        </div>
      </body>
    </html>
  );
}

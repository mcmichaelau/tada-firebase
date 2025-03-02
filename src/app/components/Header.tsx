"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Arrow } from "./Arrow";
import { Firebase } from "./Firebase";

export function Header() {
  const pathname = usePathname();
  
  // Function to get page title from pathname
  const getPageTitle = (path: string) => {
    if (path === '/') return 'Dashboard';
    
    // Remove leading slash and split by slashes
    const segments = path.substring(1).split('/');
    
    // Capitalize first letter and replace hyphens with spaces
    if (segments[0]) {
      return segments[0].charAt(0).toUpperCase() + 
             segments[0].slice(1).replace(/-/g, ' ');
    }
    
    return 'Dashboard';
  };

  return (
    <>

      <header className="header">
        <h1 className="header-title">{getPageTitle(pathname)}</h1>
        <div className="header-actions">
          {/* You can add action buttons here like notifications, settings, etc. */}
        </div>
      </header>
    </>
  );
}

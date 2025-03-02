"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { auth } from '../../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path ? "nav-item active" : "nav-item";
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>Tada</h2>
      </div>
      <nav className="side-nav">
        <ul>
          <li>
            <Link href="/">
              <div className={isActive('/')}>
                <span className="nav-icon">🏠</span>
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/companies">
              <div className={isActive('/companies')}>
                <span className="nav-icon">🏢</span>
                <span>Companies</span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/alerts">
              <div className={isActive('/alerts')}>
                <span className="nav-icon">🔔</span>
                <span>Alerts</span>
              </div>
            </Link>
          </li>
          <li className="nav-divider"></li>
          
          {user ? (
            // Show these items when user is logged in
            <>
              <li>
                <div className="user-info">
                  <span className="user-email">{user.email}</span>
                </div>
              </li>
              <li>
                <button onClick={handleSignOut} className="nav-item sign-out-btn">
                  <span className="nav-icon">🚪</span>
                  <span>Sign Out</span>
                </button>
              </li>
            </>
          ) : (
            // Show these items when user is not logged in
            <>
              <li>
                <Link href="/login">
                  <div className={isActive('/login')}>
                    <span className="nav-icon">🔑</span>
                    <span>Login</span>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <div className={isActive('/signup')}>
                    <span className="nav-icon">📝</span>
                    <span>Sign Up</span>
                  </div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
} 
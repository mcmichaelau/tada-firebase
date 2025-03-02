"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../firebase"; // Adjust path to your firebase.js
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - var(--header-height))' }}>
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <main className="content">
      <div className="welcome-section">
        <h1 className="heading">
          Welcome{user ? `, ${user.email.split('@')[0]}` : ' to Tada'}
        </h1>
        <p className="welcome-message">
          {user 
            ? "Your dashboard is ready. Start exploring your data and insights."
            : "Please sign in to access all features and manage your account."}
        </p>
      </div>

      <section className="features">
        <article className="card">
          <h2>Companies</h2>
          <p>
            View and manage all your company information in one place.
            Track performance metrics and key data points.
          </p>
          <Link href="/companies" className="card-link">
            Explore Companies →
          </Link>
        </article>
        
        <article className="card">
          <h2>Alerts</h2>
          <p>
            Stay updated with real-time notifications about important changes
            and events related to your business.
          </p>
          <Link href="/alerts" className="card-link">
            View Alerts →
          </Link>
        </article>
        
        {!user && (
          <article className="card">
            <h2>Get Started</h2>
            <p>
              Create an account or sign in to access all features and
              start managing your business data effectively.
            </p>
            <div className="card-actions">
              <Link href="/signup" className="card-button primary">
                Sign Up
              </Link>
              <Link href="/login" className="card-button secondary">
                Login
              </Link>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}

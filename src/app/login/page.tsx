"use client"; // This is needed for client-side functionality in Next.js App Router

import React, { useState } from "react";
import { auth } from "../../../firebase"; // Adjust path to your existing firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import the router

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", userCredential.user);
      
      // Redirect to home page after successful login
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="content">
      <h1 className="heading">Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="signup-link">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </main>
  );
} 
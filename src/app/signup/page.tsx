"use client";

import React, { useState } from "react";
import { auth } from "../../../firebase"; // Adjust path to your existing firebase.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation"; // Import the router

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", userCredential.user);
      
      // Redirect to home page after successful signup
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="content">
      <h1 className="heading">Sign Up</h1>
      <form onSubmit={handleSignup} className="signup-form">
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
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </main>
  );
} 
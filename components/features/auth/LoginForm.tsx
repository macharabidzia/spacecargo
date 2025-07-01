"use client";

import { login } from "@/actions/auth.actions";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user: any = null;
  const handleSubmit = () => {
    login(email, password);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Logged in as: {user.token}</p>
          <button onClick={() => console.log("123")}>Logout</button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>click</button>
        </>
      )}
    </div>
  );
}

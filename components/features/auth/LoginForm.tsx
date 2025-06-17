"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { login, logout } from "@/features/auth/auth.slice";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { user, isLoading, isError, message } = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Logged in as: {user.token}</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
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
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isError && <p className="text-red-500">{message}</p>}
        </>
      )}
    </div>
  );
}

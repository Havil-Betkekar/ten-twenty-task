"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    // validation if empty
    if (!email || !password) {
      setError("Please fill in all the fields");
      setLoading(false);
      return;
    }
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/dashboard");
  }
  return (
    <>
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Welcome back
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 mb-5">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* passowrd field */}
          <div className="flex flex-col gap-1 mb-5">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name=""
              id=""
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* remember me button */}
          <div className="flex items-center gap-2 mb-5">
            <input type="checkbox" name="" id="remember" className="w-4 h-4" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </>
  );
}

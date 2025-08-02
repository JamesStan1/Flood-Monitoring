'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ onSuccess, onCancel }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (onSuccess) {
        onSuccess(data.user); // ✅ Notify Header
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="mb-3">
        <label className="block mb-1 text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded-lg text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border p-2 rounded-lg text-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 text-gray-500 hover:underline text-sm w-full"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

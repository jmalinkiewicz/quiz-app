import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../state/user";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUserState();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
        credentials: "include",
      });

      switch (response.status) {
        case 500:
          setError("An error occurred. Please try again later.");
          break;
        case 201:
          const res = await response.json();
          console.log(res);
          setUser(res.user);
          navigate("/login");
          break;
        default:
          setError("An error occurred. Please try again later.");
          break;
      }
      setLoading(false);
    } catch (e) {
      setError("An error occurred. Please try again later.");
      console.log(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col items-center gap-4 px-4 font-nunito sm:px-8"
    >
      <label className="flex w-full flex-col gap-2">
        <span className="font-semibold">Username</span>
        <input
          className="w-full rounded p-1.5 outline-blue-500 focus:outline-1 sm:w-96"
          type="text"
          name="email"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="flex w-full flex-col gap-2">
        <span className="font-semibold">E-mail Address</span>
        <input
          className="w-full rounded p-1.5 outline-blue-500 focus:outline-1 sm:w-96"
          type="text"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="flex w-full flex-col gap-2">
        <span className="font-semibold">Password</span>
        <input
          className="w-full rounded p-1.5 outline-blue-500 focus:outline-1 sm:w-96"
          type="password"
          name="email"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="flex w-full flex-col gap-2">
        <span className="font-semibold">Confirm Password</span>
        <input
          className="w-full rounded p-1.5 outline-blue-500 focus:outline-1 sm:w-96"
          type="password"
          name="email"
          placeholder="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button
        disabled={loading}
        type="submit"
        className="w-full rounded bg-blue-500 p-1.5 font-semibold text-white hover:bg-blue-600 sm:w-96"
      >
        Sign Up
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

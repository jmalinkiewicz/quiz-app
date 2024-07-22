import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../state/user";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useUserState();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      switch (response.status) {
        case 401:
          setError("Invalid email or password.");
          break;
        case 200:
          const res = await response.json();
          console.log(res);
          setUser(res.user);
          navigate("/");
          break;
        default:
          setError("An error occurred. Please try again later.");
          break;
      }
      setLoading(false);
    } catch (e) {
      setError("An error occurred. Please try again later.");
      console.log("xddddddd");
      console.log(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="font-nunito flex w-full max-w-xl flex-col gap-4 px-4 sm:px-8"
    >
      <label className="flex flex-col gap-2">
        <span className="font-semibold">E-mail Address</span>
        <input
          className="w-full rounded bg-slate-100 p-1.5 outline-blue-500 focus:outline-1"
          type="text"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-semibold">Password</span>
        <input
          className="w-full rounded bg-slate-100 p-1.5 outline-blue-500 focus:outline-1"
          type="password"
          name="email"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button
        disabled={loading}
        type="submit"
        className="w-full rounded bg-blue-500 p-1.5 font-semibold text-white hover:bg-blue-600"
      >
        Sign In
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

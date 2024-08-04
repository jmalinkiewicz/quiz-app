import { useState } from "react";
import { getAvailableInvites } from "../utils";
import { useQuizzesState } from "../state/quizzes";

type Props = {
  variant: "dashboard" | "page";
};

export default function RedeemInvitePanel({ variant }: Props) {
  const [inviteCode, setInviteCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { setAvailableQuizzes } = useQuizzesState();

  async function handleRedeem() {
    const response = await fetch("http://localhost:8000/invite/redeem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ code: inviteCode }),
    });

    if (response.ok) {
      setMessage("Invite code redeemed successfully.");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else if (response.status === 404) {
      setMessage("Invite code not found.");
      return;
    } else if (response.status === 403) {
      setMessage("You have already been invited to this quiz.");
      return;
    } else {
      setMessage("An error occurred. Please try again later.");
      return;
    }

    const newInvites = await getAvailableInvites();

    setAvailableQuizzes(newInvites);
  }

  return (
    <>
      {variant === "dashboard" && (
        <div className="flex h-full w-full flex-col justify-start gap-8 rounded bg-slate-100 px-4 py-2">
          <h3 className="text-lg font-semibold">Redeem Invite Code</h3>
          <div className="flex gap-4">
            <input
              className="w-48 rounded p-1.5 outline-blue-500 focus:outline-1"
              type="text"
              placeholder="Invite Code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              maxLength={6}
            />
            <button
              onClick={handleRedeem}
              className="w-64 rounded bg-blue-500 p-1.5 font-semibold text-white hover:bg-blue-600"
            >
              Redeem
            </button>
          </div>
          {message && <p>{message}</p>}
        </div>
      )}
      {variant === "page" && (
        <div className="w-full rounded bg-slate-100 px-4 py-2">
          <h3 className="text-lg font-semibold">Redeem Invite Code</h3>
          <div className="mt-4 flex items-center justify-start gap-4 rounded bg-slate-200 p-2">
            <input
              className="w-48 rounded p-1.5 outline-blue-500 focus:outline-1"
              type="text"
              placeholder="Invite Code"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              maxLength={6}
            />
            <button
              onClick={handleRedeem}
              className="w-32 rounded bg-blue-500 p-1.5 font-semibold text-white hover:bg-blue-600"
            >
              Redeem
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { useQuizzesState } from "../state/quizzes";

type Props = {
  variant: "dashboard" | "page";
};

export default function InvitePanel({ variant }: Props) {
  const createdQuizzes = useQuizzesState((state) => state.createdQuizzes);
  const [selectedQuiz, setSelectedQuiz] = useState<string>();
  const [inviteType, setInviteType] = useState<"email" | "code">("email");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (createdQuizzes && createdQuizzes.length > 0) {
      setSelectedQuiz(createdQuizzes[0]?.id);
    }
  }, []);

  function handleSelectQuiz(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedQuiz(event.target.value);
  }

  function handleSelectInviteType(target: "email" | "code") {
    setInviteType(target);
  }

  async function handleInvite() {
    if (inviteType === "email" && email === "") {
      setMessage("Please enter an e-mail address");
      return;
    }

    const response = await fetch("http://localhost:8000/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        quizId: selectedQuiz,
        email,
      }),
    });

    if (response.ok) {
      if (inviteType === "email") {
        setMessage(`Invite sent to ${email}`);
        setStep((prev) => prev + 1);
      } else {
        const invite = await response.json();

        setInviteCode(invite.code);
        setMessage("Invite code created");
      }
      setEmail("");
    } else {
      setMessage("Failed to send invite");
    }
  }

  return (
    <>
      {variant === "page" && (
        <div className="w-full rounded bg-slate-100 px-4 py-2">
          <h3 className="text-lg font-semibold">
            Assign an invite to an e-mail address or create an invite code
          </h3>
          <div className="mt-4 flex items-start justify-start gap-8 rounded bg-slate-200 p-2">
            <div className="flex flex-col gap-2">
              <h4 className="text-md font-semibold">Select Quiz:</h4>
              <select
                className="p-1"
                onChange={handleSelectQuiz}
                value={selectedQuiz}
              >
                {createdQuizzes?.map((quiz) => {
                  return <option value={quiz.id}>{quiz.title}</option>;
                })}
              </select>
            </div>
            <div className="flex flex-col items-start justify-start gap-2">
              <h4 className="text-md font-semibold">Invite with:</h4>
              <div className="flex gap-2">
                <button
                  className={`rounded bg-blue-500 px-3 py-1 font-semibold text-white ${inviteType === "email" ? "bg-blue-700 hover:bg-blue-800" : "hover:bg-blue-600"}`}
                  onClick={() => handleSelectInviteType("email")}
                >
                  E-mail
                </button>
                <button
                  className={`rounded bg-blue-500 px-3 py-1 font-semibold text-white ${inviteType === "code" ? "bg-blue-700 hover:bg-blue-800" : "hover:bg-blue-600"}`}
                  onClick={() => handleSelectInviteType("code")}
                >
                  Code
                </button>
              </div>
            </div>
            {inviteType === "email" ? (
              <>
                <div className="flex flex-col gap-2">
                  <h4 className="text-md font-semibold">E-mail Address:</h4>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-1"
                    type="email"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h4 className="text-md font-semibold">Create Invite:</h4>
                  <button
                    onClick={handleInvite}
                    className="rounded bg-green-500 px-3 py-1 font-semibold text-white hover:bg-green-600"
                  >
                    Invite
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <h4 className="text-md font-semibold">Create Invite:</h4>
                  <button
                    onClick={handleInvite}
                    className="rounded bg-green-500 px-3 py-1 font-semibold text-white hover:bg-green-600"
                  >
                    Invite
                  </button>
                </div>
                <div className="flex h-16 flex-col gap-2">
                  <h4 className="text-md font-semibold">Invite Code:</h4>
                  <div className="flex h-full w-full items-center justify-center rounded bg-white font-bold">
                    {inviteCode}
                  </div>
                </div>
              </>
            )}
            {<h3 className="font-bold">{message}</h3>}
          </div>
        </div>
      )}
      {variant === "dashboard" && (
        <div className="flex h-full w-full flex-col justify-between rounded bg-slate-100 px-4 py-2">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Create an invite</h3>
            <h5>
              Step {step}/{inviteType === "email" ? "4" : "3"}
            </h5>
          </div>
          {step === 1 && (
            <>
              <div className="mt-4 flex flex-col gap-2">
                <h4 className="text-md font-semibold">Select Quiz:</h4>
                <select
                  className="p-1"
                  onChange={handleSelectQuiz}
                  value={selectedQuiz}
                >
                  {createdQuizzes?.map((quiz) => {
                    return <option value={quiz.id}>{quiz.title}</option>;
                  })}
                </select>
              </div>
              <button
                onClick={() => setStep((prev) => prev + 1)}
                className="w-full rounded bg-green-500 py-1.5 font-bold text-white hover:bg-green-600"
              >
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="mt-4 flex flex-col gap-2">
                <h4 className="text-md font-semibold">Invite with:</h4>
                <div className="flex gap-2">
                  <button
                    className={`w-full rounded bg-blue-500 px-3 py-1 font-semibold text-white ${inviteType === "email" ? "bg-blue-700 hover:bg-blue-800" : "hover:bg-blue-600"}`}
                    onClick={() => handleSelectInviteType("email")}
                  >
                    E-mail
                  </button>
                  <button
                    className={`w-full rounded bg-blue-500 px-3 py-1 font-semibold text-white ${inviteType === "code" ? "bg-blue-700 hover:bg-blue-800" : "hover:bg-blue-600"}`}
                    onClick={() => handleSelectInviteType("code")}
                  >
                    Code
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStep((prev) => prev - 1)}
                    className="w-full rounded bg-gray-500 py-1.5 font-bold text-white hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (inviteType === "email") {
                        setStep((prev) => prev + 1);
                      } else {
                        handleInvite();
                        setStep((prev) => prev + 1);
                      }
                    }}
                    className="w-full rounded bg-green-500 py-1.5 font-bold text-white hover:bg-green-600"
                  >
                    {inviteType === "email" ? "Next" : "Create"}
                  </button>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              {inviteType === "email" ? (
                <div className="mt-4 flex flex-col gap-2">
                  <h4 className="text-md font-semibold">E-mail Address:</h4>
                  {message && (
                    <h4 className="text-md font-semibold">{message}</h4>
                  )}
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-1"
                    type="email"
                    required
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStep((prev) => prev - 1)}
                      className="w-full rounded bg-gray-500 py-1.5 font-bold text-white hover:bg-gray-600"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleInvite}
                      className="w-full rounded bg-green-500 py-1.5 font-bold text-white hover:bg-green-600"
                    >
                      Create Invite
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-2">
                  <h4 className="text-md font-semibold">Invite Code:</h4>
                  <div className="flex h-16 w-full items-center justify-center rounded bg-white text-xl font-bold">
                    {inviteCode}
                  </div>
                  <button
                    onClick={() => {
                      setStep(1);
                      setInviteCode("");
                      setMessage("");
                    }}
                    className="w-full rounded bg-gray-500 py-1.5 font-bold text-white hover:bg-gray-600"
                  >
                    Create More
                  </button>
                </div>
              )}
            </>
          )}
          {step === 4 && (
            <div className="mt-4 flex h-full flex-col gap-2">
              <div className="flex flex-grow items-center">
                <h4 className="text-lg font-semibold">{message}</h4>
              </div>
              <button
                onClick={() => {
                  setStep(1);
                  setInviteCode("");
                  setMessage("");
                }}
                className="w-full rounded bg-gray-500 py-1.5 font-bold text-white hover:bg-gray-600"
              >
                Create More
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

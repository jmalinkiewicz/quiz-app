import { Link, NavLink, useNavigate } from "react-router-dom";
import ChevronDownIcon from "./icons/ChevronDown";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getUser, LogOut } from "../utils";
import { useQuizzesState } from "../state/quizzes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUser();

  const quizzes = useQuizzesState((state) => state);
  const navigate = useNavigate();

  const createdQuizzesLength = quizzes.createdQuizzes?.length;
  const availableQuizzesLength = quizzes.availableQuizzes?.length;

  function handleLogOut() {
    LogOut(navigate);
  }

  return (
    <>
      <nav className="sticky top-0 flex w-full justify-center border-b-2 border-black/50 bg-white">
        <div className="flex w-full max-w-screen-2xl justify-between">
          <div className="flex">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-500 bg-blue-100 font-bold"
                  : "font-semibold hover:bg-blue-50"
              }
              to="/dashboard"
            >
              <button className="px-4 py-4">Dashboard</button>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-500 bg-blue-100 font-bold"
                  : "font-semibold hover:bg-blue-50"
              }
              to="/quizzes"
            >
              <button className="px-4 py-4">My Quizzes</button>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-500 bg-blue-100 font-bold"
                  : "font-semibold hover:bg-blue-50"
              }
              to="/invites"
            >
              <button className="px-4 py-4">Invites</button>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-blue-500 bg-blue-100 font-bold"
                  : "font-semibold hover:bg-blue-50"
              }
              to="/settings"
            >
              <button className="px-4 py-4">Settings</button>
            </NavLink>
          </div>
          <div className="relative flex items-center justify-start">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex gap-2 font-semibold hover:underline"
            >
              {user?.name}{" "}
              {!isOpen ? (
                <ChevronDownIcon />
              ) : (
                <span className="rotate-180 transform">
                  <ChevronDownIcon />
                </span>
              )}
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{
                    scale: 0,
                  }}
                  animate={{
                    scale: 1,
                  }}
                  exit={{
                    scale: 0,
                  }}
                  className="absolute right-1 top-20 z-50 flex w-36 flex-col items-start gap-1 rounded bg-gray-100 px-4 py-2 text-left font-semibold"
                >
                  <Link to="/quizzes" className="flex gap-2">
                    <span>My Quizzes</span>
                    {createdQuizzesLength && (
                      <span className="rounded bg-slate-300 px-[3px]">
                        {createdQuizzesLength}
                      </span>
                    )}
                  </Link>
                  <Link to="/invites" className="flex gap-2">
                    <span>Invites</span>
                    {availableQuizzesLength && (
                      <span className="rounded bg-slate-300 px-[3px]">
                        {availableQuizzesLength}
                      </span>
                    )}
                  </Link>
                  <Link to="/settings" className="flex gap-2">
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="w-full rounded p-1 text-red-500 hover:bg-red-100"
                  >
                    Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </>
  );
}

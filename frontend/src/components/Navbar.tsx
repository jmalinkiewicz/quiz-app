import { Link, NavLink } from "react-router-dom";
import ChevronDownIcon from "./icons/ChevronDown";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getUser } from "../utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUser();

  return (
    <>
      <nav className="sticky top-0 flex w-full justify-center border-b-2 border-black/50">
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
          <div className="relative flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex gap-2 font-semibold hover:underline"
            >
              {user?.name} <ChevronDownIcon />
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
                  className="absolute right-1 top-20 flex w-32 flex-col items-start gap-1 rounded bg-gray-100 px-4 py-2 text-left font-semibold"
                >
                  <Link to="/quizzes">Quizzes</Link>
                  <Link to="/invites">Invites</Link>
                  <Link to="/settings">Settings</Link>
                  <button className="w-full rounded p-1 text-red-500 hover:bg-red-100">
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

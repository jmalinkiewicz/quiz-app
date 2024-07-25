import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="flex h-full items-center justify-center px-4 font-nunito sm:px-0">
      <main className="flex w-full flex-col items-center justify-center rounded border-2 bg-slate-100 px-8 py-4 sm:w-auto">
        <h1 className="pb-8 text-3xl font-bold">Sign Up</h1>
        <SignupForm />
        <div className="flex w-full max-w-xl items-center gap-4 px-4 pb-4 pt-4 sm:px-8">
          <div className="h-[3px] w-full bg-gray-300"></div>
          <span className="text-lg font-bold text-gray-400">Or</span>
          <div className="h-[3px] w-full bg-gray-300"></div>
        </div>
        <div className="w-full max-w-xl px-4 sm:px-8">
          <Link to="/login">
            <button className="w-full rounded border-2 border-black p-1.5 font-semibold text-black hover:bg-gray-50">
              Sign In
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

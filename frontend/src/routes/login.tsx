import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="flex h-full">
      <div className="h-full w-full xl:w-1/2">
        <main className="px-4 pt-16 sm:px-48">
          <h1 className="font-nunito text-4xl font-bold">Sign In</h1>
          <div className="flex justify-center pt-6">
            <LoginForm />
          </div>
          <div className="flex max-w-xl items-center gap-4 px-8 pb-4 pt-4">
            <div className="h-[3px] w-full bg-gray-300"></div>
            <span className="text-lg font-bold text-gray-400">Or</span>
            <div className="h-[3px] w-full bg-gray-300"></div>
          </div>
          <div className="max-w-xl px-8">
            <Link to="/signup">
              <button className="w-full rounded border-2 border-black p-1.5 font-semibold text-black hover:bg-gray-50">
                Sign Up
              </button>
            </Link>
          </div>
        </main>
      </div>
      <div
        id="login-screen-bg-image"
        className="hidden h-full w-1/2 bg-red-200 xl:block"
      ></div>
    </div>
  );
}

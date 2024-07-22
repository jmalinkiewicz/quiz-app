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
          <p className="pt-4">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="font-semibold text-blue-500 hover:underline">
                Sign Up
              </span>
            </Link>
          </p>
        </main>
      </div>
      <div
        id="login-screen-bg-image"
        className="hidden h-full w-1/2 bg-red-200 xl:block"
      ></div>
    </div>
  );
}

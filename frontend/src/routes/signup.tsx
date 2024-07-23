import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="flex h-full items-center justify-center px-4 font-nunito sm:px-0">
      <main className="flex w-full flex-col items-center justify-center rounded border-2 bg-slate-100 px-8 py-4 sm:w-auto">
        <h1 className="pb-8 text-3xl font-semibold">Sign Up</h1>
        <SignupForm />
      </main>
    </div>
  );
}

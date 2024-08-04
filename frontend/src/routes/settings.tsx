import { useNavigate } from "react-router-dom";
import { LogOut } from "../utils";

export default function Settings() {
  const navigate = useNavigate();

  function handleLogOut() {
    LogOut(navigate);
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="mt-4">
        <button
          className="rounded bg-red-500 px-3 py-1.5 font-semibold text-white hover:bg-red-600"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

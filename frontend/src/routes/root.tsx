import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  });

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

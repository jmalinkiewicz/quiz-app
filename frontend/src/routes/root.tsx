import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useQuizzesState } from "../state/quizzes";
import { getAvailableQuizzes, getCreatedQuizzes } from "../utils";

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  const { setCreatedQuizzes, setAvailableQuizzes } = useQuizzesState();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/dashboard");
    }
  });

  useEffect(() => {
    async function fetchData() {
      const createdQuizzes = await getCreatedQuizzes();
      setCreatedQuizzes(createdQuizzes);

      const availableQuizzes = await getAvailableQuizzes();
      setAvailableQuizzes(availableQuizzes);
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

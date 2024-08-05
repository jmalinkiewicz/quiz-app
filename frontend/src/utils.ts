import { QuizDetails } from "./routes/quiz";
import { useQuizzesState } from "./state/quizzes";
import { useUserState } from "./state/user";
import Cookies from "js-cookie";

export const getUser = () => {
  return useUserState.getState().user;
};

export const getCreatedQuizzes = async () => {
  const response = await fetch("http://localhost:8000/quiz/created", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await response.json();
};

export const getAvailableQuizzes = async () => {
  const response = await fetch("http://localhost:8000/quiz/available", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await response.json();
};

export const getAvailableInvites = async () => {
  const response = await fetch("http://localhost:8000/invite", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return await response.json();
};

export const getQuizDetails = async (quizId: string) => {
  const response = await fetch(`http://localhost:8000/quiz/${quizId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return (await response.json()) as QuizDetails;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await fetch(`http://localhost:8000/quiz/${quizId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
};

export const getQuizStart = async (quizId: string) => {
  const response = await fetch(`http://localhost:8000/quiz/start/${quizId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  return response;
};

export const LogOut = (navigate: (path: string) => void) => {
  useUserState.getState().resetState();
  useQuizzesState.getState().resetState();

  Cookies.remove("token");

  navigate("/login");
};

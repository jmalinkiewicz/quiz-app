import { useUserState } from "./state/user";

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

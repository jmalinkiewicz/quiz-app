import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root.tsx";
import Login from "./routes/login.tsx";
import NotFound from "./routes/notFound.tsx";
import Signup from "./routes/signup.tsx";
import Cookies from "js-cookie";
import Dashboard from "./routes/dashboard.tsx";
import Quizzes from "./routes/quizzes.tsx";
import Invites from "./routes/invites.tsx";
import Settings from "./routes/settings.tsx";
import Quiz from "./routes/quiz.tsx";
import { getQuizDetails, getQuizStart, getSubmission } from "./utils.ts";
import QuizStart from "./routes/quizStart.tsx";
import Submission from "./routes/submission.tsx";
import Create from "./routes/create.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: () => {
      const cookie = Cookies.get("token");

      if (cookie === undefined) {
        throw redirect("/login");
      }

      return 1;
    },
    errorElement: <NotFound />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "quizzes",
        children: [
          {
            path: ":quizId",
            children: [
              {
                path: "start",
                element: <QuizStart />,
                loader: async ({ params }) => {
                  if (params.quizId === undefined) {
                    throw redirect("/quizzes");
                  }

                  return await getQuizStart(params.quizId);
                },
              },
              {
                path: "",
                element: <Quiz />,
                loader: async ({ params }) => {
                  if (params.quizId === undefined) {
                    throw redirect("/quizzes");
                  }

                  return await getQuizDetails(params.quizId);
                },
              },
              {
                path: "submission/:submissionId",
                element: <Submission />,
                loader: async ({ params }) => {
                  if (
                    params.submissionId === undefined ||
                    params.quizId === undefined
                  ) {
                    throw redirect("/quizzes");
                  }
                  const quiz = await getQuizStart(params.quizId, true);
                  let submission = await getSubmission(params.submissionId);

                  if (submission.status === 404) {
                    throw new Response("Not Found", { status: 404 });
                  }

                  if (submission.status === 403) {
                    throw new Response("Forbidden", { status: 403 });
                  }

                  submission = await submission.json();

                  return { quiz, submission };
                },
              },
            ],
          },
          {
            path: "",
            element: <Quizzes />,
          },
        ],
      },
      {
        path: "invites",
        element: <Invites />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const cookie = Cookies.get("token");

      if (cookie) {
        throw redirect("/");
      }

      return 1;
    },
  },
  {
    path: "/signup",
    element: <Signup />,
    loader: () => {
      const cookie = Cookies.get("token");

      if (cookie) {
        throw redirect("/");
      }

      return 1;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

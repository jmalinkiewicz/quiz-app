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
        element: <h1>dash</h1>,
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

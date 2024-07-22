import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root.tsx";
import { getUser } from "./utils.ts";
import Login from "./routes/login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: () => {
      const user = getUser();
      if (user === null) {
        throw redirect("/login");
      }
      return user;
    },
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

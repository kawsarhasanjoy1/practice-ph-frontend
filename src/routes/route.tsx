import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { adminPath } from "./admin.routes";
import routeGenerator from "../utils/routeGenerator";
import Login from "../pages/Login";
import App from "../App";
import PrivateRoute from "../components/layout/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute role="admin">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPath),
  },
  {
    path: "/superAdmin",
    element: (
      <PrivateRoute role="superAdmin">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: (
      <PrivateRoute role="faculty">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPath),
  },
  {
    path: "/student",
    element: (
      <PrivateRoute role="student">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPath),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { adminPath } from "./admin.routes";
import routeGenerator from "../utils/routeGenerator";
import Login from "../pages/Login";
import App from "../App";

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
    element: <App />,
    children: routeGenerator(adminPath),
  },
  {
    path: "/superAdmin",
    element: <App />,
    children: routeGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(adminPath),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(adminPath),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

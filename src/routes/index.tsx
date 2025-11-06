import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/Layout/RootLayout";
import { Blogs } from "../pages";
import { NotFound } from "../pages";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Blogs />,
      },
      {
        path: "/blog",
        element: <Blogs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

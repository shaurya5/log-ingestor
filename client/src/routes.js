import { createBrowserRouter } from "react-router-dom";
import PostQuery from "./pages/PostQuery";
import FilterQuery from "./pages/FilterQuery";
import App from "./App";

const router = createBrowserRouter([
    {
      path: "/",
      element: <PostQuery />
    },
    {
      path: "/filter-queries",
      element: <FilterQuery />
    },
  ]);

export default router;
import {createBrowserRouter} from "react-router"

import NotFound from "./routes/NotFound"
import ListDetailView from "./routes/ListDetailView"
import HomeView from "./routes/HomeView"
import App from "./App"

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: HomeView,
      },
      {
        path: "list/:id",
        Component: ListDetailView,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
])

export default router
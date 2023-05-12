// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFound";
import ListDetailView from "./routes/ListDetailView";
import HomeView from "./routes/HomeView";

export default function Router() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/list/:id" element={<ListDetailView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    // {/* </BrowserRouter> */}
  );
}

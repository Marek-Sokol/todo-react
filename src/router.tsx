// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import NotFound from "./routes/NotFound";
import ToDoList from "./routes/ToDoList";
import Home from "./routes/Home";

export default function Router() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<ToDoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    // {/* </BrowserRouter> */}
  );
}

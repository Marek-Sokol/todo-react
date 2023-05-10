import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mt-16 w-full h-full text-white flex items-center justify-center flex-col gap-2 flex-1">
      <h1 className="text-9xl">404</h1>
      <p>Oh no! The page you're lookking for does not exist</p>
      <NavLink to="/" className="text-mist">Come back home</NavLink>
    </div>
  );
}
import {NavLink} from "react-router-dom"

const NotFound = () => {
  return (
    <div className="mt-16 w-full h-full text-white flex items-center justify-center flex-col gap-2 flex-1">
      <h1 className="text-9xl">404</h1>
      <p>Oh no! Seems we can't find the page you're looking for</p>
      <NavLink to="/" className="button-style mt-4">back home</NavLink>
    </div>
  )
}

export default NotFound
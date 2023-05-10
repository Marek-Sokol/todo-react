import { NavLink } from 'react-router-dom'
import Router from './router'

function App() {

  return (
    <div className="bg-gradient-to-bl from-purpleback via-purpleback-800 to-purpleback p-4 min-h-screen relative">
        <NavLink
          to="/"
          className="uppercase text-4xl text-purplerain-800 flex justify-center pb-4"
        >
          <i className="flex flex-row">note<p className="text-white">ify</p></i>
        </NavLink>
      <Router />
    </div>
  )
}

export default App

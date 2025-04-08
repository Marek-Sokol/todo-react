import {NavLink, Outlet} from 'react-router'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="bg-gradient-to-bl from-purpleback via-purpleback-800 to-purpleback p-4 min-h-screen relative">
      <NavLink
        to="/"
        className="uppercase text-4xl text-purplerain-800 flex justify-center pb-4"
      >
        <i className="flex flex-row">note<p className="text-white">ify</p></i>
      </NavLink>
      <Outlet />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'bg-red-300 text-black font-600',
        }}
      />
    </div>
  )
}

export default App

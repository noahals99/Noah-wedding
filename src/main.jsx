import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from "react-router-dom"
import Root from './routes/Root.jsx'
import ErrorPage from './routes/ErrorPage.jsx'
import Home from './routes/Home.jsx'
import './style/index.css'
import './style/App.css'
import Venue from './routes/Venue.jsx'
import Admin from './routes/Admin.jsx'
import Info from './routes/Info.jsx'
import Lodging from './routes/Lodging.jsx'
import Rsvp from './routes/Rsvp.jsx'
import Registry from './routes/Registry.jsx'
import Bachelor from './routes/Bachelor.jsx'
import Bachelorette from './routes/Bachelorette.jsx'
import Groups from './routes/Groups.jsx'
import AdminRsvp from './routes/AdminRsvp.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/VENUE",
        element: <Venue/>
      },
      {
        path: "/admin-setup",
        element: <Admin/>
      },
      {
        path: "/information",
        element: <Info/>
      },
      {
        path: "/lodging",
        element: <Lodging/>
      },
      {
        path: "/rsvp",
        element: <Rsvp/>
      },
      {
        path: "/registry",
        element: <Registry/>
      },
      {
        path: "/bachelor",
        element: <Bachelor/>
      },
      {
        path: "/bachelorette",
        element: <Bachelorette/>
      },
      {
        path: "/admin-setup/groups",
        element: <Groups/>
      },
      {
        path: "/admin-setup/rsvp",
        element: <AdminRsvp/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

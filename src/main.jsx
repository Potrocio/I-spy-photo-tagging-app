import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Homepage from './components/pages/Homepage'
import Gameboard from './components/pages/Gameboard'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />
  },
  {
    path: "gameboard",
    element: <Gameboard />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

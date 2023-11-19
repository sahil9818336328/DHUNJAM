import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login, Dashboard, Error } from './pages'

// // ACTION'S WERE INTRODUCED IN RECENT VERSION OF REACT ROUTER, WHICH BASICALLY HELPS WITH FORM SUBMISSION
import { action as loginAction } from './pages/Login'

// LATEST VERSION OF REACT ROUTER
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    action: loginAction,
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    errorElement: <Error />,
  },
])

// ENTRY POINT
const App = () => {
  return <RouterProvider router={router} />
}
export default App

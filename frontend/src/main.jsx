import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/Login.jsx';
import SignUpPage from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SendPage from './pages/SendPage.jsx';
import ReceivePage from './pages/ReceivePage.jsx';
import SwapPage from './pages/SwapPage.jsx';
import StakePage from './pages/StakePage.jsx';
import LendingPage from './pages/LendingPage.jsx';
import Settings from './pages/Settings.jsx';
import Request from './pages/Request.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {path: '/', element: <LandingPage/>},
      {path: '/login', element: <LoginPage/>},
      {path: '/signup', element: <SignUpPage/>},
      {path: '/dashboard', element: <Dashboard/>},
      {path: '/send', element: <SendPage/>},
      {path: '/receive', element: <ReceivePage/>},
      {path: '/swap', element: <SwapPage/>},
      {path: '/stake', element: <StakePage/>},
      {path: '/lend', element: <LendingPage/>},
      {path: '/settings', element: <Settings/>},
      {path: '/test', element: <Request/>},
    ]
  }
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

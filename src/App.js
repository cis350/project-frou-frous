import './Login.css';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import UserPageView from './Views/UserPageView';
import SkipHistoryView from './Views/SkipHistoryView';
import ScheduleView from './Views/ScheduleView';
import ReportView from './Views/ReportView';
import LeaderboardView from './Views/LeaderboardView';
import { ChatView, SingleChatView } from './Views/ChatView';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/user/:userId',
      element: <UserPageView />,
    },
    {
      path: '/history/:userId',
      element: <SkipHistoryView />,
    },
    {
      path: '/schedule/:userId',
      element: <ScheduleView />,
    },
    {
      path: '/report',
      element: <ReportView />,
    },
    {
      path: '/leaderboard',
      element: <LeaderboardView />,
    },
    {
      path: '/chat',
      element: <ChatView />,
    },
    {
      path: '/chat/user/:user',
      element: <SingleChatView />,
    },

  ]);

  return (
    <div className="App">
      <ToastContainer />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;

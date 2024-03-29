import './Login.css';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import React, { useEffect } from 'react';
import UserPageView from './Views/UserPageView';
import SkipHistoryView from './Views/SkipHistoryView';
import ScheduleView from './Views/ScheduleView';
import ReportView from './Views/ReportView';
import PostView from './Views/PostView';
import LeaderboardView from './Views/LeaderboardView';
import { ChatView, SingleChatView } from './Views/ChatView';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  useEffect(() => {

    console.log(window.location.pathname);
    if (window.location.pathname !== '/' && window.location.pathname !== '/app/register') {
      const curUser = sessionStorage.getItem('username');
      if (!curUser) {
        window.location.pathname = '/';
      }
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: 'app/register',
      element: <Register />,
    },
    {
      path: 'app/user/:userId',
      element: <UserPageView />,
    },
    {
      path: 'app/history/:userId',
      element: <SkipHistoryView />,
    },
    {
      path: 'app/schedule/:userId',
      element: <ScheduleView />,
    },
    {
      path: 'app/report',
      element: <ReportView />,
    },
    {
      path: 'app/report/:reportId',
      element: <PostView />,
    },
    {
      path: 'app/leaderboard',
      element: <LeaderboardView />,
    },
    {
      path: 'app/chat',
      element: <ChatView />,
    },
    {
      path: 'app/chat/user/:user',
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

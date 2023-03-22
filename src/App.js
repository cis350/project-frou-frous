import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import SignupView from './Views/SignupView';
import PostView from './Views/PostView';
import UserPageView from './Views/UserPageView';
import SkipHistoryView from './Views/SkipHistoryView';
import ScheduleView from './Views/ScheduleView';
import ReportView from './Views/ReportView';
import LeaderboardView from './Views/LeaderboardView';
import ChatView from './Views/ChatView';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignupView />,
    },
    {
      path: '/post/:postId',
      element: <PostView />,
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
  ]);
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;

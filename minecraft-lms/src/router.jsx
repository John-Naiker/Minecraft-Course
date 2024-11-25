import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Intro from './pages/Intro';
import Setup from './pages/Setup';
import Instructions from './pages/Instructions';
import CodeSnippets from './pages/CodeSnippets';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/intro',
        element: <Intro />,
      },
      {
        path: '/setup',
        element: <Setup />,
      },
      {
        path: '/instructions',
        element: <Instructions />,
      },
      {
        path: '/code-snippets',
        element: <CodeSnippets />,
      },
    ],
  },
]);

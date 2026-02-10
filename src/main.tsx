import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Tasks from './pages/Tasks.tsx';
import Layout from './components/Layout.tsx';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import * as Sentry from "@sentry/react";

library.add(fas, far, fab)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Tasks />
      },
    ]
  },
])
if (import.meta.env.PROD) {
  Sentry.init({
    dsn: `${import.meta.env.VITE_SENTRY_DSN}`,

    integrations: [
      Sentry.browserTracingIntegration(),

      Sentry.replayIntegration()
    ],

    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1, 
    replaysOnErrorSampleRate: 1.0, 
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

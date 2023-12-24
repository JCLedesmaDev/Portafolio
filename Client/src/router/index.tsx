import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { NotFound } from "@/pages/notFound";
import { Auth } from "@/pages/auth";
import { LoggerDB } from "@/pages/loggerDb";
import { Home } from '@/pages/home';
import { Portfolio } from '@/pages/portfolio';
import { Skills } from '@/pages/skills';
import { Projects } from '@/pages/projects';
import { Description } from '@/pages/description';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Portfolio />,
    errorElement: <NotFound />,
  },
  {
    path: '/admin',
    element: (<MainLayout />),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'myDescription',
        element: <Description />
      },
      {
        path: 'myProjects',
        element: <Projects />
      },
      {
        path: 'mySkills',
        element: <Skills />
      },
      {
        path: 'loggerDb',
        element: <LoggerDB />
      },
    ]
  },
  {
    path: '/auth',
    element: <Auth />
  }
])

export default router
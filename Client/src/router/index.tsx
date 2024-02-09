import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { NotFound } from "@/pages/notFound";
import { Auth } from "@/pages/auth";
import { LoggerDB } from "@/pages/loggerDb";
import { Home } from '@/pages/home';
import { Portfolio } from '@/pages/portfolio';
import { MySkills } from '@/pages/skills';
import { MyProjects } from '@/pages/projects';
import { MyProfile } from '@/pages/profile';
import { RoutePrivate } from '@/components/index.components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Portfolio />,
    errorElement: <NotFound />,
  },
  {
    path: '/admin',
    element: (<RoutePrivate redirectTo='/auth'>
      <MainLayout />
    </RoutePrivate>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'myProfile',
        element: <MyProfile />
      },
      {
        path: 'myProjects',
        element: <MyProjects />
      },
      {
        path: 'mySkills',
        element: <MySkills />
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
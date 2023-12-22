import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { NotFound } from "@/pages/notFound";
import { Auth } from "@/pages/auth";
import { LoggerDB } from "@/pages/loggerDb";
import { HomeAdmin } from '@/pages/homeAdmin';

const router = createBrowserRouter([
  {
    path: '/',
    element: (<p>PRINCIPAL PORTAFOLIO</p>),
    errorElement: <NotFound />,
  },
  {
    path: '/admin',
    element: (<MainLayout />),
    children: [
      {
        index: true,
        //path: 'project',
        element: <HomeAdmin />
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
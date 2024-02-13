import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "@/pages/notFound";

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { Portfolio } = await import('@/pages/portfolio')
      return { Component: Portfolio }
    },
    errorElement: <NotFound />,
  },
  {
    path: '/admin',
    lazy: async () => {
      const { MainLayout } = await import('@/layouts/MainLayout')
      const { RoutePrivate } = await import('@/components/index.components')
      return {
        element: <RoutePrivate redirectTo='/auth'>
          <MainLayout />
        </RoutePrivate>
      }
    },
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import('@/pages/home/index')
          return { Component: Home }
        },
      },
      {
        path: 'myProfile',
        lazy: async () => {
          const { MyProfile } = await import('@/pages/profile/index')
          return { Component: MyProfile }
        }
      },
      {
        path: 'myProjects',
        lazy: async () => {
          const { MyProjects } = await import('@/pages/projects/index')
          return { Component: MyProjects }
        }
      },
      {
        path: 'mySkills',
        lazy: async () => {
          const { MySkills } = await import('@/pages/skills/index')
          return { Component: MySkills }
        }
      },
      {
        path: 'loggerDb',
        lazy: async () => {
          const { LoggerDB } = await import('@/pages/loggerDb/index')
          return { Component: LoggerDB }
        }
      },
    ]
  },
  {
    path: '/auth',
    lazy: async () => {
      const { Auth } = await import('@/pages/auth')
      return { Component: Auth }
    },
  }
])

export default router
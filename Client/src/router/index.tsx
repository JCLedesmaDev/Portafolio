import { createBrowserRouter } from "react-router-dom";
import { RoutePrivate } from '@/components/index.components';
import { MainLayout } from "@/layouts/MainLayout";
import { NotFound } from "@/pages/notFound";
import { Auth } from "@/pages/auth";

const router = createBrowserRouter([
  {
    path: '/',
    element: (<MainLayout />),
    errorElement: <NotFound />,
    children: [
      {
        index: true, // Definimos que dentro de los componentes hijos, este es el principal     
        element: (
          <p>PRINCIPAL</p>
        ),
      },
      {
        path: 'administration',
        element: (
          <RoutePrivate redirectTo="/">
            <p>adminsitracion</p>
          </RoutePrivate>
        )
      },
      // {
      //   path: 'figurites',
      //   element: (<Figurites />),
      // },
      // {
      //   path: 'purchasedAlbumes',
      //   element: (<PurchasedAlbumes />),
      // }
    ]
  },
  {
    path: '/auth',
    element: <Auth />
  },
])

export default router
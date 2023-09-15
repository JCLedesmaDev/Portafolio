import { createBrowserRouter } from "react-router-dom";
import { RoutePrivate } from '@/components/RoutePrivate';
import { MainLayout } from "@/layouts/MainLayout";
// import { Auth } from "@/pages/auth";
import { NotFound } from "@/pages/notFound";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RoutePrivate>
        <MainLayout />
      </RoutePrivate >
    ),
    errorElement: <NotFound />,
    children: [
      // {
      //   path: 'administration',
      //   element: (<Administration />),
      // },
      {
        index: true, // Definimos que dentro de los componentes hijos, este es el principal
        // element: (<NotFound />),
        element: (
          <p> ASD</p>
        ),
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
  // {
  //   path: '/auth',
  //   element: <Auth />
  // },
])

export default router
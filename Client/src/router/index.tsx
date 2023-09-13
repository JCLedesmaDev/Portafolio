import { createBrowserRouter } from "react-router-dom";
import { RoutePrivate } from 'src/components/RoutePrivate';
import { MainLayout } from "src/layouts/MainLayout";
import { Auth } from "src/pages/auth";
import { NotFound } from "src/pages/notFound";

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
        // {
        //   index: true, // Definimos que dentro de los componentes hijos, este es el principal
        //   element: (<Albumes />),
        // },
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
    }
  ])
  
  export default router
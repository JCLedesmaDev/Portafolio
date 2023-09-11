import { createBrowserRouter } from "react-router-dom";
import { RoutePrivate } from '../components/RoutePrivate';
import { MainLayout } from "../layouts/MainLayout";

const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <RoutePrivate>
          <MainLayout />
        </RoutePrivate >
      ),
      // errorElement: <NotFound />,
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
      path: '/authUser',
      element: <AuthUser />
    }
  ])
  
  export default router
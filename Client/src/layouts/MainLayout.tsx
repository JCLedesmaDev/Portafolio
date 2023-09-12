import { useEffect } from "react"
import { Outlet, useNavigate, useNavigation, useParams } from "react-router-dom"
import { Navigate } from "../components/Navigate"
import { SpinnerModal } from "../components/SpinnerModal"
import appStore from "../pages/appStore"


export const MainLayout: React.FC = () => {

    const navigation = useNavigation()
    const navigate = useNavigate()
    /* Devuelve el estado de la navegacion actual
        - idle, submitting, loading
    */
    // useParams()

    return (
        <>
            <Navigate />

            <main>
                {navigation.state === 'loading' && (
                    <h1>Cargando pagina... Espere</h1>
                )}
                {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
                <Outlet />
            </main>
            <SpinnerModal />
            {/* <footer>Foooter</footer> */}
        </>
    )
}
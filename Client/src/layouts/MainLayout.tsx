import { showNotify } from '@/libraries/fwk-react-ui'
import { Outlet, useNavigation } from "react-router-dom"


export const MainLayout: React.FC = () => {

    const navigation = useNavigation()

    const asd = () => {
        showNotify()
    }
    return (
        <main>
            AAA
            <button onClick={asd}>AAAA</button>

            {navigation.state === 'loading' && (
                <h1>Cargando pagina... Espere</h1>
            )}
            {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
            <Outlet />
        </main>
    )
}
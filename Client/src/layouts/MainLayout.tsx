import { Outlet, useNavigation } from "react-router-dom"

export const MainLayout: React.FC = () => {

    const navigation = useNavigation()

    return (
        <main>
            {navigation.state === 'loading' && (
                <h1>Cargando pagina... Espere</h1>
            )}
            {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
            <Outlet />
        </main>
    )
}
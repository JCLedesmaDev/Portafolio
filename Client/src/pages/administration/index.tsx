import { ui } from '@/libraries/index.libraries'
import { useEffect } from 'react'


export const Administration: React.FC = () => {
    const storeUi = ui.useStoreUi()

    useEffect(() => {
        //ui.actions.setTitleView('AdministracioEAn')
        storeUi.actions.setTitleView('Administración')
    }, [])

    return (
        <main >

            Administration

        </main>
    )
}
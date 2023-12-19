import { ui } from '@/libraries/index.libraries'
import { useEffect } from 'react'


export const Administration: React.FC = () => {
    const storeUi = ui.useStoreUi()

    useEffect(() => {
        //ui.actions.setTitleView('AdministracioEAn')
        storeUi.actions.setTitleView('AdministracioEAn')
    }, [])

    return (
        <main >

            Administration

        </main>
    )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import css from './index.module.css'
import { ui } from '@/libraries/index.libraries'
import { useEffect, useState } from 'react'
import { Tabs } from '@/libraries/fwk-react-tabs'
import { Description } from './components/description'
import { Technologies } from './components/technologies'

export const MySkills: React.FC = () => {

    /// HOOKS    
    const storeUi = ui.useStore()
    const [tabs, setTabs] = useState<any[]>([])

    /// METODOS
    useEffect(() => {
        storeUi.actions.setTitleView('Mis habilidades:')

        setTabs([
            { title: 'Descripcion', content: Description },
            { title: 'Tecnologias', content: Technologies },
        ])
    }, [])

    return (
        <main className={css.main}>

            <h3 className={css.title}>Sobre mi: </h3>

            <div className={css.container}>
                <Tabs tabsArray={tabs} />
            </div>

        </main>
    )
}
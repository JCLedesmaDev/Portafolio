import css from './index.module.css'
import { ui } from '@/libraries/index.libraries'
import { useEffect } from 'react'
import { Tabs } from '@/libraries/fwk-react-tabs'
import { Description } from './components/description'
import { Technologies } from './components/technologies'

export const MySkills: React.FC = () => {

    /// HOOKS    
    const storeUi = ui.useStore()

    /// VARIABLES
    const tabs = [
        { title: 'Descripcion', content: () => <Description /> },
        { title: 'Tecnologias', content: () => <Technologies /> },
    ]

    /// METODOS
    useEffect(() => {
        storeUi.actions.setTitleView('Mis habilidades:')
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
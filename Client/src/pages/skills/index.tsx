/* eslint-disable @typescript-eslint/no-explicit-any */
import css from './index.module.css'
import { ui } from '@/libraries/index.libraries'
import { useEffect, useState } from 'react'
import { Tabs } from '@/libraries/fwk-react-tabs'
import { SoftSkills } from './components/softSkills'
import { LearnedTechnologies } from './components/learnedTechnologies'

export const MySkills: React.FC = () => {

    /// HOOKS    
    const storeUi = ui.useStore()
    const [tabs, setTabs] = useState<any[]>([])

    /// METODOS
    useEffect(() => {
        storeUi.actions.setTitleView('Mis habilidades:')

        setTabs([
            { title: 'Habilidades blandas', content: SoftSkills },
            { title: 'Tecnologias aprendidas', content: LearnedTechnologies },
        ])
    }, [])

    return (
        <main className={css.main}>

            <h3 className={css.title}>Sobre mi: </h3>

            <Tabs tabsArray={tabs} />

        </main>
    )
}
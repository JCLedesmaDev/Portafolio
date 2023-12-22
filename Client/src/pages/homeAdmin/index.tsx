import { ui } from '@/libraries/index.libraries'
import { useEffect } from 'react'
import css from './index.module.css'
import { NavLink } from 'react-router-dom'

import Project from '@/assets/project.png'
import Skills from '@/assets/skills.jpg'
import AboutMe from '@/assets/AboutMe.png'
import Report from '@/assets/Report.png';

export const HomeAdmin: React.FC = () => {
    const storeUi = ui.useStoreUi()

    useEffect(() => {
        //ui.actions.setTitleView('AdministracioEAn')
        storeUi.actions.setTitleView('Administración')
    }, [])

    return (
        <main className={css.main}>

            <h2>Acceso Rapido</h2>
            <div>
                <NavLink to="#" className={css.box}>
                    <img src={AboutMe} />
                    Mi descripcion
                </NavLink>

                <NavLink to="/mySkills" className={css.box}>
                    <img src={Skills} />
                    Mis habilidades
                </NavLink>

                <NavLink to="/project" className={css.box}>
                    <img src={Project} />
                    Mis proyectos
                </NavLink>

                <NavLink to="/loggerDb" className={css.box} >
                    <img src={Report} />
                    Reportes LoggerDB
                </NavLink>


            </div>

        </main>
    )
}
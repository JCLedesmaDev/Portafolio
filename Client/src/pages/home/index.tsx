import { ui } from '@/libraries/index.libraries'
import { useEffect } from 'react'
import css from './index.module.css'
import { NavLink } from 'react-router-dom'

import Project from '@/assets/project.png'
import Skills from '@/assets/skills.png'
import AboutMe from '@/assets/AboutMe.png'
import Report from '@/assets/Report.png';

export const Home: React.FC = () => {
    const storeUi = ui.useStoreUi()

    useEffect(() => {
        //ui.actions.setTitleView('AdministracioEAn')
        storeUi.actions.setTitleView('Administración')
    }, [])

    return (
        <main className={css.main}>

            <h3 className='sub-section-title'>Acceso Rapido</h3>

            <div className={css.containerBoxs}>
                <NavLink to="/admin/myDescription" className={css.box}>
                    <img src={AboutMe} />
                    <h4>Mi descripcion</h4>
                </NavLink>

                <NavLink to="/admin/mySkills" className={css.box}>
                    <img src={Skills} />
                    <h4>Mis habilidades</h4>
                </NavLink>

                <NavLink to="/admin/myProjects" className={css.box}>
                    <img src={Project} />
                    <h4>Mis proyectos</h4>
                </NavLink>

                <NavLink to="/admin/loggerDb" className={css.box} >
                    <img src={Report} />
                    <h4>Reportes LoggerDB</h4>
                </NavLink>
            </div>

        </main>
    )
}
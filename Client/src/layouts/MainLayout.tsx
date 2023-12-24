import { Outlet, useNavigate } from "react-router-dom"
import css from './MainLayout.module.css'
import { NavLink } from 'react-router-dom'
import { ui } from '@/libraries/index.libraries';

import { useState } from 'react';
import { MenuSVG } from '@/assets/MenuSVG';
import { useAppStore } from '@/appStore';

import image from '@/assets/rocket-page-logo.png'
import Project from '@/assets/project.png'
import Skills from '@/assets/skills.png'
import AboutMe from '@/assets/AboutMe.png'
import Report from '@/assets/Report.png';
import Portafolio from '@/assets/Portafolio.png'

export const MainLayout: React.FC = () => {

    const appStore = useAppStore()
    const storeUi = ui.useStoreUi()
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false)

    const logOut = async () => {
        const data = await appStore.actions.logOut()
        if (data) navigate('/auth')
    }

    return (
        <main className={`${css.mainContainer} ${toggle ? css.mainContainerSidebarNone : ''}`}>

            <div className={css.headerGridContainer}>
                <div className={css.headerContainer__title}>
                    <button onClick={() => setToggle((preVal) => !preVal)}>
                        <MenuSVG />
                    </button>
                    <h3> {storeUi.state.titleView}</h3>
                </div>

                <button className={css.btnLogOut} onClick={logOut}>
                    Cerrar Sesion
                </button>
            </div>

            <div className={`${css.sidebarGridContainer} ${toggle ? css.sidebarGridContainerNone : ''}`}>
                <div className={css.sidebarContainer__header}>
                    <NavLink to="/admin"><img src={image} /></NavLink>
                </div>

                <div className={`${css.sidebarContainer__content}`}>
                    <NavLink to="/admin/myDescription" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={AboutMe} />
                        <h5>Mi descripcion</h5>
                    </NavLink>

                    <NavLink to="/admin/mySkills" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={Skills} />
                        <h5>Mis habilidades</h5>
                    </NavLink>

                    <NavLink to="/admin/myProjects" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={Project} />
                        <h5>Mis proyectos</h5>
                    </NavLink>

                    <NavLink to="/" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={Portafolio} />
                        <h5>Ver portafolio</h5>
                    </NavLink>

                    <NavLink to="/admin/loggerDb" className={({ isActive }) => isActive ? css.isActive : undefined}>
                        <img src={Report} />
                        <h5>Reportes LoggerDB</h5>
                    </NavLink>
                </div>
            </div>

            {/* Gracais al Outlet aqui se plasmaran todos los childrens de router/index.tsx */}
            <div className={css.contentGridContainer}>
                <Outlet />
            </div>
        </main >
    )
}


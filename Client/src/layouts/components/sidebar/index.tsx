import React from 'react';
import { NavLink } from 'react-router-dom'
import css from './index.module.css'
import image from '@/assets/rocket-page-logo.png'
import Project from '@/assets/project.png'
import Skills from '@/assets/skills.jpg'
import AboutMe from '@/assets/AboutMe.png'
//import { ReportSVG } from '@/assets/ReportSVG';
import Report from '@/assets/Report.png';


export const Sidebar: React.FC = () => {
    //https://codepen.io/today54/pen/eYYyJoL
    /// CAMBIAR LOS <A> por los NavLink
    return (
        <nav className={css.navContainer}>
            <div className={css.navContainer__header}>
                <NavLink to="/">
                    <img src={image} />
                </NavLink>
            </div>

            <div className={`${css.navContainer__content}`}>
                <NavLink to="#" className={({ isActive }) => isActive ? css.isActive : undefined}>
                    <img src={AboutMe} />
                    Mi descripcion
                </NavLink>

                <NavLink to="/mySkills" className={({ isActive }) => isActive ? css.isActive : undefined}>
                    <img src={Skills} />
                    Mis habilidades
                </NavLink>

                <NavLink to="/project" className={({ isActive }) => isActive ? css.isActive : undefined}>
                    <img src={Project} />
                    Mis proyectos
                </NavLink>

                <NavLink to="/loggerDb" className={({ isActive }) => isActive ? css.isActive : undefined}>
                    <img src={Report} />
                    Reportes LoggerDB
                </NavLink>
            </div>

        </nav>
    )
}
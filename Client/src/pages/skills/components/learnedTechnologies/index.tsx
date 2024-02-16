import { useState } from 'react';
import css from './index.module.css'
import { EditSVG } from '@/assets/EditSVG';
import { AddSVG } from '@/assets/AddSVG';

import cssIcon from "@/assets/skills/front/css.svg";
import html from "@/assets/skills/front/html.svg";
import ionic from "@/assets/skills/front/ionic.svg";
import js from "@/assets/skills/front/js.svg";
import react from "@/assets/skills/front/react.svg";
import zustand from "@/assets/skills/front/zustand.png";
import angular from "@/assets/skills/front/angular.svg";
import blazor from "@/assets/skills/front/blazor.svg";
import vue from "@/assets/skills/front/vue.svg";
import quasar from "@/assets/skills/front/quasar.png";
import jquery from "@/assets/skills/front/jquery.svg";
import { ImageTechnology } from './technology';


export const LearnedTechnologies: React.FC = () => {

    const [tabActiva, setTabActiva] = useState(0);
    const arrCategories = [
        { title: 'Front-End', },
        { title: 'Back-End' },
        //{ title: 'Back-End' },
        //{ title: 'Back-End' },
        //{ title: 'Back-End' },
        //{ title: 'Otros' },
        //{ title: 'Otros' },
        { title: 'Otros' },
        { title: 'Proximamente' }
    ]

    const arrTecnologias = [
        {
            category: 'Front-End',
            technologysList: [
                {
                    name: 'Ionic 5',
                    image: ionic
                },
                {
                    name: 'CSS3',
                    image: cssIcon
                },
                {
                    name: 'HTML5',
                    image: html
                },
                {
                    name: 'JavaScript',
                    image: js
                },
                {
                    name: 'ReactJS',
                    image: react
                },
                {
                    name: 'Zustand',
                    image: zustand
                },
                {
                    name: '"Angular 12',
                    image: angular
                },
                {
                    name: 'Blazor',
                    image: blazor
                },
                {
                    name: '"Vue 3',
                    image: vue
                },
                {
                    name: '"Quasar V2',
                    image: quasar
                },
                {
                    name: 'jQuery',
                    image: jquery
                },
            ]
        }
    ]


    return (
        <div className={css.containerTechnologies} >

            <div>
                <div className={css.navCategories__title}>
                    <h3>Categorias:</h3>
                    <AddSVG onClick={() => alert('Para crear una categoria')} />
                </div>

                <div className={css.navCategories__items}>
                    {arrCategories.map((tab, index) => (
                        <li key={index}
                            className={index === tabActiva ? css.active : ''}
                            onClick={() => setTabActiva(index)}
                        >
                            {tab.title}
                            <EditSVG onClick={() => alert('Para editar categoria ' + index)} />
                        </li>
                    ))}
                </div>
            </div>

            <div className={css.BBB}>
                <h3>Tecnologias conocidas:</h3>

                <div>
                    {arrTecnologias[0].technologysList.map(x => (
                        <ImageTechnology technology={x} />
                    ))}
                </div>
            </div>

        </div>
    )
}
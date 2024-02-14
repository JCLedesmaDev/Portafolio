import { useState } from 'react';
import css from './index.module.css'
import { EditSVG } from '@/assets/EditSVG';
import { AddSVG } from '@/assets/AddSVG';

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
            </div>

        </div>
    )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import css from './index.module.css'
import { ui } from '@/libraries/index.libraries'

export const Profile: React.FC = () => {
    const storeUi = ui.useStoreUi()

    const [description, setDescription] = useState(
        `Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, tengo 22 años y soy una persona que se caracteriza por saber escuchar y entender rápidamente las necesidades de los clientes. Me apasiona el diseño web y me esfuerzo por crear sitios web que combinen una estética y un arte equilibrado que se adapte perfectamente a las necesidades de cada cliente.
        <br> <br>
        Mi formación en el diseño de planos arquitectónicos me enseñó la importancia de tener una buena arquitectura y diseño en cualquier proyecto. Por eso, me mantengo en constante formación en el Desarrollo <i> <b>Back-End</b> </i> para lograr un código robusto, elegante y flexible. Me emociona aprender cosas nuevas y siempre estoy en busca de nuevas oportunidades para seguir creciendo en mi carrera.
        <br> <br>
        Actualmente estoy cursando la <b>Tecnicatura Superior en Desarrollo de Software</b> en el Instituto Técnico Superior Córdoba (I.T.S. Córdoba) para profundizar mis conocimientos en el mundo del <b>Software</b>. Si bien me defino como Desarrollador <i> <b>Front-End</b> </i>, también tengo algunos conocimientos en el entorno de <b>NodeJS</b>. Actualmente, me estoy enfocando en comprender cabalmente estos lenguajes para definirme como <b>Full-Stack</b>.`)


    useEffect(() => {
        storeUi.actions.setTitleView('Mi Perfil')
    }, [])

    return (
        <main className={css.main}>

            <h3 className={css.title}>Mi persona: </h3>

            <div className={css.description}>
                <div>
                    <label htmlFor="">Nombre Completo</label>
                    <br />
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="">Rol ocupando:</label>
                    <br />
                    <input type="text" />
                </div>

                <div>
                    <label>Sobre mi:</label>
                    <br />
                    <textarea name="" id="" cols={50} rows={25} value={description} onChange={(e: any) => setDescription(e.target.value)} />


                    <div>
                        Vista previa
                        <p dangerouslySetInnerHTML={{ __html: description }}></p>
                    </div>

                </div>
            </div>

            <div className={css.loadFiles}>
                PARA CARGAR LA IMAGEN DE PERFIL

                <br />

                PARA CARGAR CV
            </div>

        </main>
    )
}
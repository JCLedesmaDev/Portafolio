/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import css from './index.module.css'
import { Input, InputObs, ui } from '@/libraries/index.libraries'
import { useFormCustom } from '@/hooks/index.hooks'
import { IFormData, IFormProps } from './interface/IForm'

export const Profile: React.FC = () => {
    const storeUi = ui.useStoreUi()

    const description = `Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, tengo 22 años y soy una persona que se caracteriza por saber escuchar y entender rápidamente las necesidades de los clientes. Me apasiona el diseño web y me esfuerzo por crear sitios web que combinen una estética y un arte equilibrado que se adapte perfectamente a las necesidades de cada cliente.
    <br> <br>
    Mi formación en el diseño de planos arquitectónicos me enseñó la importancia de tener una buena arquitectura y diseño en cualquier proyecto. Por eso, me mantengo en constante formación en el Desarrollo <i> <b>Back-End</b> </i> para lograr un código robusto, elegante y flexible. Me emociona aprender cosas nuevas y siempre estoy en busca de nuevas oportunidades para seguir creciendo en mi carrera.
    <br> <br>
    Actualmente estoy cursando la <b>Tecnicatura Superior en Desarrollo de Software</b> en el Instituto Técnico Superior Córdoba (I.T.S. Córdoba) para profundizar mis conocimientos en el mundo del <b>Software</b>. Si bien me defino como Desarrollador <i> <b>Front-End</b> </i>, también tengo algunos conocimientos en el entorno de <b>NodeJS</b>. Actualmente, me estoy enfocando en comprender cabalmente estos lenguajes para definirme como <b>Full-Stack</b>.Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, tengo 22 años y soy una persona que se caracteriza por saber escuchar y entender rápidamente las necesidades de los clientes. Me apasiona el diseño web y me esfuerzo por crear sitios web que combinen una estética y un arte equilibrado que se adapte perfectamente a las necesidades de cada cliente.
    <br> <br>
    Mi formación en el diseño de planos arquitectónicos me enseñó la importancia de tener una buena arquitectura y diseño en cualquier proyecto. Por eso, me mantengo en constante formación en el Desarrollo <i> <b>Back-End</b> </i> para lograr un código robusto, elegante y flexible. Me emociona aprender cosas nuevas y siempre estoy en busca de nuevas oportunidades para seguir creciendo en mi carrera.
    <br> <br>
    Actualmente estoy cursando la <b>Tecnicatura Superior en Desarrollo de Software</b> en el Instituto Técnico Superior Córdoba (I.T.S. Córdoba) para profundizar mis conocimientos en el mundo del <b>Software</b>. Si bien me defino como Desarrollador <i> <b>Front-End</b> </i>, también tengo algunos conocimientos en el entorno de <b>NodeJS</b>. Actualmente, me estoy enfocando en comprender cabalmente estos lenguajes para definirme como <b>Full-Stack</b>.`

    /// METODOS
    const { form, handleChange } = useFormCustom<IFormData>({
        nameComplete: { value: '', dirty: false, error: false },
        rol: { value: '', dirty: false, error: false },
        aboutMe: { value: description, dirty: false, error: false },
    })

    const formProps: IFormProps = {
        nameComplete: {
            data: { value: form['nameComplete'].value },
            placeholder: 'Ejem.: Juan Cruz Ledesma',
            type: 'text',
            name: 'nameComplete',
            required: true,
            autoComplete: 'off',
            handleChange: handleChange
        },
        rol: {
            data: { value: form['rol'].value },
            placeholder: 'Ejem.: Desarrollador Full-Stack',
            name: 'rol',
            required: true,
            autoComplete: 'off',
            handleChange: handleChange
        },
        aboutMe: {
            data: { value: form['aboutMe'].value },
            placeholder: 'Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, ',
            name: 'aboutMe',
            required: true,
            autoComplete: 'off',
            handleChange: handleChange
        },
    }


    useEffect(() => {
        storeUi.actions.setTitleView('Mi Perfil')
    }, [])

    return (
        <main className={css.main}>

            <h3 className={css.title}>Mi persona: </h3>

            <div className={css.profile}>

                <div className={css.profile__field}>
                    <h4>Ingrese nombre completo</h4>
                    <Input props={formProps.nameComplete} />
                </div>

                <div className={css.profile__field}>
                    <h4>Ingrese el rol que ocupa actualmente</h4>
                    <Input props={formProps.rol} />
                </div>

                <div className={css.profile__field}>
                    <h4>Sobre mi:</h4>
                    <InputObs props={formProps.aboutMe} />
                </div>


                <div className={css.profile__field}>
                    <h4>Vista previa</h4>
                    <div dangerouslySetInnerHTML={{ __html: form['aboutMe'].value }} />
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
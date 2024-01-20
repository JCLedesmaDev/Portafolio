/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'
import css from './index.module.css'
import { Input, InputObs, ui } from '@/libraries/index.libraries'
import { useFormCustom } from '@/hooks/index.hooks'
import { IFormData, IFormProps } from './interface/IForm'

import image from '@/assets/rocket-page-logo.png'

export const Profile: React.FC = () => {

    /// HOOKS
    const storeUi = ui.useStoreUi()
    const refImageProfile = useRef<HTMLInputElement>(null)
    const refCvProfile = useRef<HTMLInputElement>(null)
    const { form, handleChange } = useFormCustom<IFormData>({
        nameComplete: { value: '', dirty: false, error: false },
        rol: { value: '', dirty: false, error: false },
        aboutMe: { value: '', dirty: false, error: false },
        imageProfile: { value: '', dirty: false, error: false },
        cvProfile: { value: '', dirty: false, error: false }
    })

    const [imageSelect, setImageSelect] = useState(image);
    const [cvSelect, setCvSelect] = useState('');

    /// VARIABES
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

    /// METODOS
    const openInputFile = (name = 'imageProfile' || 'cvProfile') => {
        if (name === 'imageProfile') {
            if (refImageProfile.current) refImageProfile.current.click()
        } else {
            if (refCvProfile.current) refCvProfile.current.click()
        }
    }

    const updateImageProfile = (e: any, name = 'imageProfile' || 'cvProfile') => {

        const file = e.target.files[0]
        if (!file) return

        const urlFile = URL.createObjectURL(file)

        if (name === 'imageProfile') {
            setImageSelect(urlFile)
            handleChange('imageProfile', { value: e.target.files[0] })
        } else {
            setCvSelect(urlFile)
            handleChange('cvProfile', { value: e.target.files[0] })
        }
    }
    //const formData = new FormData();
    //// Agrega el archivo al FormData
    //formData.append('archivo', archivo);

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
                    <InputObs props={formProps.aboutMe} rows={13} />
                </div>


                <div className={`${css.profile__field} ${css.previewVist}`}>
                    <h4>Vista previa</h4>
                    <div dangerouslySetInnerHTML={{ __html: form['aboutMe'].value }} />
                </div>

            </div>

            <div className={css.loadFiles}>

                <div className={css.loadFiles__profile}>
                    <h4>Imagen de Perfil</h4>
                    <img src={imageSelect} alt="Image profile"
                        onClick={() => openInputFile('imageProfile')}
                        style={{ cursor: 'pointer' }}
                    />

                    <input type="file" ref={refImageProfile} style={{ display: 'none' }}
                        onChange={(e: any) => updateImageProfile(e, 'imageProfile')} />
                </div>

                <div className={css.loadFiles__cv}>
                    <h4>Curriculum Vitae</h4>
                    <button onClick={() => openInputFile('cvProfile')}>
                        Cargar Curriculum
                    </button>

                    <input type="file" ref={refCvProfile} style={{ display: 'none' }}
                        onChange={(e: any) => updateImageProfile(e, 'cvProfile')} />

                    {cvSelect && (<a href={cvSelect} target='_blank'>Abrir Curriculum</a>)}
                </div>

            </div>

        </main>
    )
}
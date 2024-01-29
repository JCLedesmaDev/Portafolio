/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import css from './index.module.css'
import { InputText, InputObs, ui } from '@/libraries/index.libraries'
import { useFormCustom } from '@/hooks/index.hooks'
import { IFormData, IFormProps } from './interface/IForm'

import imageDefault from '@/assets/imageDefault.png'
import useStore from './store'
import { LoadFile } from '@/components/LoadImage'

export const Profile: React.FC = () => {

    /// HOOKS
    const storeUi = ui.useStore()
    const store = useStore()

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)
    const { form, handleChange } = useFormCustom<IFormData>({
        fullName: { value: '', dirty: false, error: false },
        rol: { value: '', dirty: false, error: false },
        aboutMe: { value: '', dirty: false, error: false },
        imageProfile: { value: '', dirty: false, error: false },
        curriculumVitae: { value: '', dirty: false, error: false }
    })


    /// VARIABES
    const formProps: IFormProps = {
        fullName: {
            data: { value: form['fullName'].value },
            placeholder: 'Ejem.: Juan Cruz Ledesma',
            type: 'text',
            name: 'fullName',
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
        imageProfile: {
            data: { value: form['imageProfile'].value },
            type: 'image',
            name: 'imageProfile',
            required: false,
            handleChange: handleChange,
            imageDefault: imageDefault,
            rules: [
                {
                    fnCondition: (typeFile) => !(typeFile === 'png' || typeFile === 'jpeg' || typeFile === 'jpg'),
                    messageError: 'Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'
                }
            ]
        },
        curriculumVitae: {
            data: { value: form['curriculumVitae'].value },
            type: 'file',
            name: 'curriculumVitae',
            required: false,
            rules: [
                {
                    fnCondition: (typeFile) => typeFile !== 'pdf',
                    messageError: 'Debe enviar UN archivo de formato .pdf para el CV.'
                }
            ],
            handleChange: handleChange
        },
    }

    /// METODOS
    const updateUser = () => {
        const formData = new FormData();
        for (const property in form) {
            const formProperty = form[property as keyof IFormData]
            if (formProperty.value !== '') {
                formData.append(property, formProperty.value);
            }
        }
        store.actions.updateUser(formData)
    }

    useEffect(() => {
        storeUi.actions.setTitleView('Mi Perfil')
    }, [])

    useEffect(() => {
        const flag = (form.fullName.error || form.rol.error || form.aboutMe.error || form.imageProfile.error || form.curriculumVitae.error) as boolean
        setDisabledBtn(flag)
    }, [form.fullName.error, form.rol.error, form.aboutMe.error, form.imageProfile.error, form.curriculumVitae.error])

    return (
        <main className={css.main}>

            <h3 className={css.title}>Mi persona: </h3>

            <div className={css.profile}>

                <div className={css.profile__field}>
                    <h4>Ingrese nombre completo</h4>
                    <InputText props={formProps.fullName} />
                </div>

                <div className={css.profile__field}>
                    <h4>Ingrese el rol que ocupa actualmente</h4>
                    <InputText props={formProps.rol} />
                </div>

                <div className={css.profile__field}>
                    <h4>Sobre mi:</h4>
                    <InputObs props={formProps.aboutMe} rows={11} />
                </div>


                <div className={`${css.profile__field} ${css.previewVist}`}>
                    <h4>Vista previa</h4>
                    <div dangerouslySetInnerHTML={{ __html: form['aboutMe'].value }} />
                </div>

            </div>

            <div className={css.loadFiles}>

                <div className={css.loadFiles__profile}>
                    <h4>Imagen de Perfil</h4>
                    <LoadFile props={formProps.imageProfile} />
                </div>

                <div className={css.loadFiles__cv}>
                    <h4>Curriculum Vitae</h4>
                    <LoadFile props={formProps.curriculumVitae} />
                </div>

            </div>

            <div className={css.btnContainer}>
                <button className={css.btn}>Cancelar</button>
                <button className={css.btn} onClick={updateUser} disabled={disabledBtn}>Guardar</button>
            </div>

        </main>
    )
}
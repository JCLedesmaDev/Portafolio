/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import css from './index.module.css'
import { InputText, InputObs, ui, IExposeInput, IExposeFile } from '@/libraries/index.libraries'
import { IFormProps } from './interface/IForm'

import useStore from './store'
import useAppStore from '@/appStore'
import imageDefault from '@/assets/imageDefault.png'
import { LoadFile } from '@/libraries/index.libraries'
import { initBindingForm } from '@/utils/index.utils'

export const MyProfile: React.FC = () => {

    /// HOOKS    
    const storeUi = ui.useStore()
    const store = useStore()
    const appStore = useAppStore()

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)

    /// VARIABES
    const refs = {
        fullName: useRef<IExposeInput>(null),
        rol: useRef<IExposeInput>(null),
        aboutMe: useRef<IExposeInput>(null),
        imageProfile: useRef<IExposeFile>(null),
        curriculumVitae: useRef<IExposeFile>(null),
    }
    const formProps: IFormProps = {
        fullName: {
            data: { value: appStore.state.user.fullName || '' },
            placeholder: 'Ejem.: Juan Cruz Ledesma',
            type: 'text',
            name: 'fullName',
            required: true,
            autoComplete: 'off',
            refresh: appStore.actions.forzedRender,
            rules: []
        },
        rol: {
            data: { value: appStore.state.user.rol || '' },
            placeholder: 'Ejem.: Desarrollador Full-Stack',
            name: 'rol',
            required: true,
            autoComplete: 'off',
            refresh: appStore.actions.forzedRender,
            rules: []

        },
        aboutMe: {
            data: { value: appStore.state.user.aboutMe || '' },
            placeholder: 'Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, ',
            name: 'aboutMe',
            required: true,
            autoComplete: 'off',
            refresh: appStore.actions.forzedRender,
            rules: []
        },
        imageProfile: {
            data: { value: appStore.state.user.imageProfile || '' },
            type: 'image',
            name: 'imageProfile',
            required: true,
            imageDefault: imageDefault,
            rules: [
                {
                    fnCondition: (typeFile) => !(typeFile === 'png' || typeFile === 'jpeg' || typeFile === 'jpg'),
                    messageError: 'Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'
                }
            ],
            refresh: appStore.actions.forzedRender
        },
        curriculumVitae: {
            data: { value: appStore.state.user.curriculumVitae || '' },
            type: 'file',
            name: 'curriculumVitae',
            required: false,
            rules: [
                {
                    fnCondition: (typeFile) => typeFile !== 'pdf',
                    messageError: 'Debe enviar UN archivo de formato .pdf para el CV.'
                }
            ],
            refresh: appStore.actions.forzedRender
        },
    }

    /// METODOS
    const updateUser = async () => {
        const formData = new FormData();
        for (const fields in formProps) {
            const formProperty = refs[fields as keyof typeof refs]

            if (formProperty.current?.props.data.value !== '') {
                formData.append(
                    fields,
                    formProperty.current?.props.data.value
                );
            }
        }
        const res = await store.actions.updateUser(formData)
        if (res) {
            refs.fullName.current?.reset()
            refs.aboutMe.current?.reset()
            refs.rol.current?.reset()
            refs.curriculumVitae.current?.reset()
            refs.imageProfile.current?.reset()
        }
    }

    useEffect(() => {
        storeUi.actions.setTitleView('Mi Perfil')

        initBindingForm(refs, formProps)
    }, [])

    useEffect(() => {
        const flag = (
            refs.fullName.current?.props.data.error || refs.rol.current?.props.data.error || refs.aboutMe.current?.props.data.error || refs.imageProfile.current?.props.data.error || refs.curriculumVitae.current?.props.data.error
        ) as boolean

        setDisabledBtn(!!flag)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refs.fullName.current?.props, refs.rol.current?.props,
    refs.aboutMe.current?.props, refs.imageProfile.current?.props,
    refs.curriculumVitae.current?.props]);

    return (
        < main className={css.main} >

            <h3 className={css.title}>Mi persona: </h3>

            <div className={css.profile}>

                <div className={css.profile__field}>
                    <h4>Ingrese nombre completo</h4>
                    <InputText ref={refs.fullName} />
                </div>

                <div className={css.profile__field}>
                    <h4>Ingrese el rol que ocupa actualmente</h4>
                    <InputText ref={refs.rol} />
                </div>

                <div className={css.profile__field}>
                    <h4>Sobre mi:</h4>
                    <InputObs ref={refs.aboutMe} rows={11} />
                </div>

                <div className={`${css.profile__field} ${css.previewVist}`}>
                    <h4>Vista previa</h4>
                    <div dangerouslySetInnerHTML={{ __html: refs.aboutMe.current?.props.data.value }} />
                </div>

            </div>

            <div className={css.loadFiles}>

                <div className={css.loadFiles__profile}>
                    <h4>Imagen de Perfil</h4>
                    <LoadFile ref={refs.imageProfile} />
                </div>

                <div className={css.loadFiles__cv}>
                    <h4>Curriculum Vitae</h4>
                    <LoadFile ref={refs.curriculumVitae} />
                </div>

            </div>

            <div className={css.btnContainer}>
                <button className={css.btn}>Cancelar</button>
                <button className={css.btn} onClick={updateUser} disabled={disabledBtn}>Guardar</button>
            </div>

        </main >
    )
}
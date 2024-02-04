/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import css from './index.module.css'
import { InputText, InputObs, ui, IExposeInput, IExposeFile } from '@/libraries/index.libraries'
import { useForzedRefesh } from '@/hooks/index.hooks'
import { IFormProps } from './interface/IForm'

import useStore from './store'
import useAppStore from '@/appStore'
import imageDefault from '@/assets/imageDefault.png'
import { LoadFile } from '@/libraries/index.libraries'

export const Profile: React.FC = () => {

    /// HOOKS    
    const storeUi = ui.useStore()
    const store = useStore()
    const appStore = useAppStore()

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)

    /// VARIABES
    const formProps: IFormProps = {
        fullName: {
            data: { value: appStore.state.user.fullName || '' },
            placeholder: 'Ejem.: Juan Cruz Ledesma',
            type: 'text',
            name: 'fullName',
            required: true,
            autoComplete: 'off',
            refresh: useForzedRefesh()
        },
        rol: {
            data: { value: appStore.state.user.rol || '' },
            placeholder: 'Ejem.: Desarrollador Full-Stack',
            name: 'rol',
            required: true,
            autoComplete: 'off',
            refresh: useForzedRefesh()
        },
        aboutMe: {
            data: { value: appStore.state.user.aboutMe || '' },
            placeholder: 'Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, ',
            name: 'aboutMe',
            required: true,
            autoComplete: 'off',
            refresh: useForzedRefesh()
        },
        imageProfile: {
            data: { value: appStore.state.user.imageProfile || '' },
            type: 'image',
            name: 'imageProfile',
            required: false,
            imageDefault: imageDefault,
            rules: [
                {
                    fnCondition: (typeFile) => !(typeFile === 'png' || typeFile === 'jpeg' || typeFile === 'jpg'),
                    messageError: 'Debe enviar UNA imagen de formato .png o .jpeg para el perfil.'
                }
            ],
            refresh: useForzedRefesh(),
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
            refresh: useForzedRefesh()
        },
    }
    const refs = {
        fullName: useRef<IExposeInput>(null),
        rol: useRef<IExposeInput>(null),
        aboutMe: useRef<IExposeInput>(null),
        imageProfile: useRef<IExposeFile>(null),
        curriculumVitae: useRef<IExposeFile>(null),
    }

    /// METODOS
    const updateUser = () => {
        //const formData = new FormData();
        //for (const property in form) {
        //    const formProperty = form[property as keyof IFormData]
        //    if (formProperty.value !== '') {
        //        formData.append(property, formProperty.value);
        //    }
        //}
        //store.actions.updateUser(formData)

        console.log('AAAAAAA', refs.fullName.current)
    }

    useEffect(() => {
        storeUi.actions.setTitleView('Mi Perfil')

        refs.fullName.current?.set(
            formProps.fullName
        )
        refs.fullName.current?.setData(
            formProps.fullName.data, '*'
        )
        refs.rol.current?.set(
            formProps.rol
        )
        refs.rol.current?.setData(
            formProps.rol.data, '*'
        )
        refs.aboutMe.current?.set(
            formProps.aboutMe
        )
        refs.aboutMe.current?.setData(
            formProps.aboutMe.data, '*'
        )

        refs.imageProfile.current?.set(
            formProps.imageProfile
        )
        refs.imageProfile.current?.setData(
            formProps.imageProfile.data, '*'
        )
        refs.curriculumVitae.current?.set(
            formProps.curriculumVitae
        )
        refs.curriculumVitae.current?.setData(
            formProps.curriculumVitae.data, '*'
        )
    }, [])

    useEffect(() => {
        const flag = (refs.fullName.current?.props.data.error || refs.rol.current?.props.data.error ||
            refs.aboutMe.current?.props.data.error || refs.imageProfile.current?.props.data.error ||
            refs.curriculumVitae.current?.props.data.error
        ) as boolean
        setDisabledBtn(flag)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refs.fullName.current?.props,
    refs.rol.current?.props,
    refs.aboutMe.current?.props,
    refs.imageProfile.current?.props,
    refs.curriculumVitae.current?.props
    ]);

    /* PROBANDO */

    return (
        <main className={css.main}>

            <h3 className={css.title}>Mi persona: </h3>

            <div className={css.profile}>

                <div className={css.profile__field}>
                    <h4>Ingrese nombre completo</h4>
                    <InputText ref={refs.fullName}
                        required={refs.fullName.current?.props.required as boolean}
                    />
                </div>

                <div className={css.profile__field}>
                    <h4>Ingrese el rol que ocupa actualmente</h4>
                    <InputText ref={refs.rol}
                        required={refs.rol.current?.props.required as boolean} />
                </div>

                <div className={css.profile__field}>
                    <h4>Sobre mi:</h4>
                    <InputObs ref={refs.aboutMe}
                        required={refs.aboutMe.current?.props.required as boolean} rows={11} />
                </div>


                <div className={`${css.profile__field} ${css.previewVist}`}>
                    <h4>Vista previa</h4>
                    <div dangerouslySetInnerHTML={{ __html: refs.aboutMe.current?.props.data.value }} />
                </div>

            </div>

            <div className={css.loadFiles}>

                <div className={css.loadFiles__profile}>
                    <h4>Imagen de Perfil</h4>
                    <LoadFile ref={refs.imageProfile}
                        required={refs.imageProfile.current?.props.required as boolean} />
                </div>

                <div className={css.loadFiles__cv}>
                    <h4>Curriculum Vitae</h4>
                    <LoadFile ref={refs.curriculumVitae}
                        required={refs.curriculumVitae.current?.props.required as boolean} />
                </div>

            </div>

            <div className={css.btnContainer}>
                <button className={css.btn}>Cancelar</button>
                <button className={css.btn} onClick={updateUser} disabled={disabledBtn}>Guardar</button>
            </div>

        </main>
    )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import css from '../index.module.css'
import { IExposeInput, InputObs } from '@/libraries/index.libraries';
import useAppStore from '@/appStore'
import { initBindingForm } from '@/utils/index.utils';

export const Description: React.FC = () => {

    /// HOOKS
    const appStore = useAppStore()
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)


    /// VARIABES
    const refs = { mySoftSkills: useRef<IExposeInput>(null) }

    const formProps = {
        mySoftSkills: {
            data: { value: appStore.state.user.mySoftSkills || '' },
            placeholder: 'Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, ',
            name: 'mySoftSkills',
            required: true,
            autoComplete: 'off',
            refresh: appStore.actions.forzedRender,
            rules: []
        },
        fullName: { data: { value: appStore.state.user.fullName } },
        rol: { data: { value: appStore.state.user.rol } },
        aboutMe: { data: { value: appStore.state.user.aboutMe } },
    }

    /// METODOS
    const updateSkills = async () => {
        const formData = new FormData();
        for (const fields in formProps) {
            const formProperty = refs[fields as keyof typeof refs]

            if (formProperty?.current && formProperty?.current?.props.data.value !== '') {
                formData.append(
                    fields,
                    formProperty.current?.props.data.value
                );
            } else {
                formData.append(
                    fields,
                    formProps[fields as keyof typeof refs].data.value
                );
            }
        }

        const res = await appStore.actions.updateUser(formData)
        if (res) {
            refs.mySoftSkills.current?.reset()
        }
    }

    useEffect(() => { initBindingForm(refs, formProps) }, [])

    useEffect(() => {
        const flag = refs.mySoftSkills.current?.props.data.error as boolean
        setDisabledBtn(flag)
    }, [refs.mySoftSkills.current?.props])


    return (
        <div className={css.containerDescription}>

            < div className={css.containerDescription__fields}>
                <div className={css.containerDescription__field}>
                    <h4>Mis habilidades blandas:</h4>
                    <InputObs ref={refs.mySoftSkills} rows={11} />
                </div>

                <div className={`${css.containerDescription__field} ${css.previewVist}`}>
                    <h4>Vista previa</h4>
                    <div dangerouslySetInnerHTML={{ __html: refs.mySoftSkills.current?.props.data.value }} />
                </div>
            </div >

            <div className={css.btnContainer}>
                <button className={css.btn}>Cancelar</button>
                <button className={css.btn} onClick={updateSkills} disabled={disabledBtn}>
                    Guardar
                </button>
            </div>

        </div>
    )
}
//import useStore from './store'
import css from './index.module.css'
import useAppStore from '@/appStore'
import { IExposeInput, InputObs, ui } from '@/libraries/index.libraries'
import { useEffect, useRef, useState } from 'react'
import { IFormProps } from './interface/IForm'
import { initBindingForm } from '@/utils/index.utils'

export const MySkills: React.FC = () => {

    /// HOOKS    
    const storeUi = ui.useStore()
    //const store = useStore()
    const appStore = useAppStore()

    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)

    /// VARIABES
    const refs = {
        aboutMe: useRef<IExposeInput>(null),
    }
    const formProps: IFormProps = {
        aboutMe: {
            data: { value: appStore.state.user.aboutMe || '' },
            placeholder: 'Hola, soy Juan Cruz, me gusta que me llamen Juan, Juanchi o Juancho, ',
            name: 'aboutMe',
            required: true,
            autoComplete: 'off',
            refresh: appStore.actions.forzedRender,
            rules: []
        }
    }

    /// METODOS
    const updateSkills = async () => {
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
        //const res = await store.actions.updateUser(formData)
        //if (res) {
        //    refs.aboutMe.current?.reset()
        //}
    }

    useEffect(() => {
        storeUi.actions.setTitleView('Mis habilidades')

        initBindingForm(refs, formProps)
    }, [])

    useEffect(() => {
        const flag = (
            refs.aboutMe.current?.props.data.error
        ) as boolean

        setDisabledBtn(!!flag)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refs.aboutMe.current?.props]);


    return (
        <main className={css.main}>

            <h3 className={css.title}>Mis habiliades: </h3>

            <div className={css.skills}>

                <div className={css.skills__field}>
                    <h4>Sobre mi:</h4>
                    <InputObs ref={refs.aboutMe} rows={11} />
                </div>

                <div className={`${css.skills__field} ${css.previewVist}`}>
                    <h4>Vista previa</h4>
                    <div dangerouslySetInnerHTML={{ __html: refs.aboutMe.current?.props.data.value }} />
                </div>

            </div>

            <div className={css.loadFiles}>
                zarasa
            </div>


            <div className={css.btnContainer}>
                <button className={css.btn}>Cancelar</button>
                <button className={css.btn} onClick={updateSkills} disabled={disabledBtn}>Guardar</button>
            </div>

        </main>
    )
}
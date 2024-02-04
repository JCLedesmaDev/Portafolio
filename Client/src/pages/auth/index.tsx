/* eslint-disable react-hooks/exhaustive-deps */
import css from "./index.module.css"
import useAuthStore from "./store";
import useAppStore from '@/appStore'
import { useEffect, useRef, useState } from "react"
import { UserSVG } from "@/assets/UserSVG"
import { useNavigate } from 'react-router-dom'
import { InputText, InputPassword, IExposeInput } from "@/libraries/index.libraries"
import { IFormProps } from "./interface/IForm"
import { useForzedRefesh } from "@/hooks/index.hooks"
import { PasswordSVG } from "@/assets/PasswordSVG"
import imageLogin from '@/assets/rocket-page-logo.png'
import { validator_Email, validator_Passowrd } from './validators'
import { initBindingForm } from '@/utils/index.utils';


export const Auth: React.FC = () => {

    const appStore = useAppStore()
    const store = useAuthStore()


    const navigate = useNavigate()
    const [disabledBtn, setDisabledBtn] = useState<boolean>(true)

    /// METODOS
    const refs = {
        email: useRef<IExposeInput>(null),
        password: useRef<IExposeInput>(null),
    }
    const formProps: IFormProps = {
        email: {
            data: { value: '' },
            placeholder: 'Ingrese usuario',
            type: 'email',
            name: 'email',
            required: true,
            autoComplete: 'off',
            //icon: <UserSVG className={css.container__Form_fieldIcon} />,
            rules: [{
                fnCondition: (val) => !validator_Email.test(val),
                messageError: 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
            }],
            refresh: appStore.actions.forzedRender
        },
        password: {
            data: { value: '' },
            placeholder: 'Contraseña',
            name: 'password',
            required: true,
            autoComplete: 'off',
            //icon: < PasswordSVG className={css.container__Form_fieldIcon} />,
            rules: [{
                fnCondition: (val) => !validator_Passowrd.test(val),
                messageError: 'La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.'
            }],
            refresh: appStore.actions.forzedRender
        }
    }

    const login = async () => {
        const res = await store.actions.login({
            email: refs.email.current?.props.data.value,
            password: refs.password.current?.props.data.value
        })

        if (res) navigate("/admin")
    }

    useEffect(() => {
        initBindingForm(refs, formProps)
    }, [])


    useEffect(() => {
        const flag = (refs.email.current?.props.data.error || refs.password.current?.props.data.error) as boolean
        console.log("🚀 ~ ABB:")
        setDisabledBtn(flag ?? true)
    }, [refs.email.current?.props, refs.password.current?.props])

    return (
        <main className={css.main}>

            <div className={css.container}>

                <img src={imageLogin} />

                <h1>Juan Cruz Ledesma</h1>

                <div className={css.container__Form}>

                    <InputText ref={refs.email}
                        required={formProps.email.required} />

                    <InputPassword ref={refs.password}
                        required={formProps.email.required} />

                    <button onClick={login} className={css.container__Form_btn} disabled={disabledBtn}>
                        Iniciar sesion
                    </button>

                </div>

            </div>

        </main>
    )
}
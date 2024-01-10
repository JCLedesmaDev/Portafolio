import css from "./index.module.css"
import useAuthStore from "./store";
import { useEffect, useState } from "react"
import { UserSVG } from "@/assets/UserSVG"
import { useNavigate } from 'react-router-dom'
import { Input, InputPassword } from "@/libraries/index.libraries"
import { IFormProps, IFormData } from "./interface/IForm"
import { useFormCustom } from "@/hooks/index.hooks"
import { PasswordSVG } from "@/assets/PasswordSVG"
import imageLogin from '@/assets/rocket-page-logo.png'
import { validator_Email, validator_Passowrd } from './validators'


export const Auth: React.FC = () => {

    const [disabledBtn, setDisabledBtn] = useState<boolean>(true)
    const store = useAuthStore()
    const navigate = useNavigate()

    /// METODOS
    const { form, handleChange } = useFormCustom<IFormData>({
        email: { value: undefined, dirty: false, error: false },
        password: { value: undefined, dirty: false, error: false }
    })

    const formsProps: IFormProps = {
        email: {
            data: { value: form['email'].value },
            placeholder: 'Ingrese usuario',
            type: 'email',
            name: 'email',
            required: true,
            autoComplete: 'off',
            icon: <UserSVG className={css.container__Form_fieldIcon} />,
            rules: [{
                fnCondition: (val) => !validator_Email.test(val),
                messageError: 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
            }],
            handleChange: handleChange
        },
        password: {
            data: { value: form['password'].value },
            placeholder: 'Contraseña',
            name: 'password',
            required: true,
            autoComplete: 'off',
            icon: < PasswordSVG className={css.container__Form_fieldIcon} />,
            rules: [{
                fnCondition: (val) => !validator_Passowrd.test(val),
                messageError: 'La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.'
            }],
            handleChange: handleChange
        }
    }

    const login = async () => {
        const res = await store.actions.login({
            email: form.email.value,
            password: form.password.value
        })

        if (res) navigate("/admin")
    }

    useEffect(() => {
        const flag = (form.email.error || form.password.error) as boolean
        setDisabledBtn(flag)
    }, [form.email.error, form.password.error])

    return (
        <main className={css.main}>

            <div className={css.container}>

                <img src={imageLogin} />

                <h1>Juan Cruz Ledesma</h1>

                <div className={css.container__Form}>

                    <Input props={formsProps.email} />

                    <InputPassword props={formsProps.password} />

                    <button onClick={login} className={css.container__Form_btn} disabled={disabledBtn}>
                        Iniciar sesion
                    </button>

                </div>

            </div>

        </main>
    )
}
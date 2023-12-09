import { useFormCustom } from "@/hooks/index.hooks"
import css from "./index.module.css"
import { IFormData } from "./interface/IFormData"
import { IFormProps } from "./interface/IFormProps"
import { Input } from "@/components/fwk-react-inputs//index"
import { UserSVG } from "@/assets/UserSVG"
import { PasswordSVG } from "@/assets/PasswordSVG"
import { useEffect, useState } from "react"
import imageLogin from '@/assets/rocket-page-logo.png'
import useAuthUserStore from "./store";
import { validator_Email, validator_Passowrd } from './validators'

export const Auth: React.FC = () => {

    const [disabledBtn, setDisabledBtn] = useState<boolean>(true)
    const store = useAuthUserStore()

    // const data = useSubscribeEvent({ subscribeEventName: 'updateInput' })

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
                fnCondition: (val) => validator_Email.exec(val) === null,
                messageError: 'El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.'
            }],
            handleChange: handleChange
        },
        password: {
            data: { value: form['password'].value },
            placeholder: 'Contraseña',
            type: 'password',
            name: 'password',
            required: true,
            autoComplete: 'off',
            icon: < PasswordSVG className={css.container__Form_fieldIcon} />,
            rules: [{
                fnCondition: (val) => validator_Passowrd.exec(val) === null,
                messageError: 'La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.'
            }],
            handleChange: handleChange
        }
    }

    const login = () => {

    }

    useEffect(() => {
        //store.actions.login({
        //    email: 'juanledesma6040@gmail.com',
        //    password: 'holahola123'
        //}).then(() => {
        //    store.actions.getUser().then(res => console.log(res))
        //})
    }, [])

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

                    <Input props={formsProps.password} />

                    <button onClick={login} className={css.container__Form_btn} disabled={disabledBtn}>Iniciar sesion</button>

                </div>

            </div>

        </main>
    )
}
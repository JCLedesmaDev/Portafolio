import { useFormCustom } from "@/hooks/index.hooks"
import css from "./index.module.css"
import { IFormData } from "./interface/IFormData"
import { IFormProps } from "./interface/IFormProps"
import { Input } from "@/components/fwk-react-inputs//index"
import { UserSVG } from "@/components/fwk-react-inputs//svg/UserSVG"
import { PasswordSVG } from "@/components/fwk-react-inputs//svg/PasswordSVG"
import { useEffect } from "react"

import useAuthUserStore from "./store";
import { validator, validator_Email, validator_Passowrd } from './validators'

export const Auth: React.FC = () => {

    const store = useAuthUserStore()
    // const data = useSubscribeEvent({ subscribeEventName: 'updateInput' })

    /// METODOS
    const { form, handleChange } = useFormCustom<IFormData>({
        email: { value: '', dirty: false, error: false },
        password: { value: '', dirty: false, error: false }
    })
    console.log("🚀 ~ file: index.tsx:47 ~ form:", form)


    const formsProps: IFormProps = {
        email: {
            data: { value: form['email'].value },
            placeholder: 'Ingrese usuario',
            type: 'email',
            name: 'email',
            required: true,
            autoComplete: 'off',
            rules: [
                (val: string) => validator(val, validator_Email, "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.")
            ],
            handleChange: handleChange
        },
        password: {
            data: { value: form['password'].value },
            placeholder: 'Contraseña',
            type: 'password',
            name: 'password',
            required: true,
            autoComplete: 'off',
            rules: [
                (val: string) => validator(val, validator_Passowrd, "La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.")
            ],
            handleChange: handleChange
        }
    }

    useEffect(() => {
        store.actions.login({
            email: 'juanledesma6040@gmail.com',
            password: 'holahola123'
        }).then(() => {
            store.actions.getUser().then(res => console.log(res))
        })
    }, [])

    return (
        <main className={css.main}>

            {/*<Input props={formsProps.email} />
            <Input props={formsProps.password} />*/}

            <div className={css.container}>

                <img className="logo" src="http://www.cfdesigner.com/codepen/rocket-page-logo.png" />

                <h1>Juan Cruz Ledesma</h1>

                <div className={css.container__Form}>

                    <div className={css.container__Form_field}>
                        <label>
                            <UserSVG className={css.container__Form_fieldIcon} />
                        </label>
                        {/*<input type="text" name="username" placeholder="Username" />*/}
                        <Input props={formsProps.email} />
                    </div>

                    <div className={css.container__Form_field}>
                        <label>
                            <PasswordSVG className={css.container__Form_fieldIcon} />
                        </label>
                        {/*<input type="password" name="password" placeholder="Password" />*/}
                        <Input props={formsProps.password} />
                    </div>

                    {/* TODO: QUITAR DISABLED AL COMPLETAR FORM */}
                    <input type="submit" value="Iniciar sesion" />

                </div>

            </div>

            <svg xmlns="http://www.w3.org/2000/svg" className="icons hidden">
                <symbol id="user" viewBox="0 0 32 32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.25%">
                    <path d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z" />
                </symbol>
                <symbol id="lock" viewBox="0 0 32 32" fill="none" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6.25%">
                    <path d="M5 15 L5 30 27 30 27 15 Z M9 15 C9 9 9 5 16 5 23 5 23 9 23 15 M16 20 L16 23" />
                    <circle cx="16" cy="24" r="1" />
                </symbol>
            </svg>

        </main>
    )
}
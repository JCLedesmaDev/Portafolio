import { Input } from "./components/Input"
import { useUpdateInput } from "./components/Input/hooks/useUpdateInput"
import { IInputProps } from "./components/Input/interface/Input.interface"
import "./index.css"
// import { evtEmitter } from "@/utils/index.utils"

// import useAuthUserStore from "./store";

export const Auth: React.FC = () => {

    // const store = useAuthUserStore()
    const data = useUpdateInput('updateInput')
    /// METODOS

    console.log("🚀 ~ file: index.tsx:18 ~ data:", data)

    const forms: IInputProps[] = [
        {
            attrInput: {
                name: 'email',
                placeholder: 'Ingrese usuario',
                required: true,
                type: 'email',
                autoComplete: 'false'
            },
            expReg: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
            errorMessage: "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.",
            data: {
                value: undefined,
            }
        },
        {
            attrInput: {
                required: true,
                placeholder: "Contraseña: ",
                type: "password",
                name: "password",
                autoComplete: 'false'
            },
            expReg: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
            errorMessage: "La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.",
            data: {
                value: undefined,
            }
        }
    ]


    return (
        <div className="container">

            <Input props={forms[0]} />

            <Input props={forms[1]} />

            <div id="containerForm">
                <img className="logo" src="http://www.cfdesigner.com/codepen/rocket-page-logo.png" />
                <h1>Juan Cruz Ledesma</h1>

                <form id="login" method="#">
                    <section>
                        <div className="field">
                            <label htmlFor="username">
                                <svg className="icon">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#user"></use>
                                </svg>
                            </label>
                            <input type="text" name="username" placeholder="Username" />
                        </div>
                        <div className="field">
                            <label htmlFor="password">
                                <svg className="icon">
                                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#lock"></use>
                                </svg>
                            </label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                    </section>
                    <ul className="buttons">
                        {/* TODO: QUITAR DISABLED AL COMPLETAR FORM */}
                        <input type="submit" value="Log In" className="primary" />
                        {/* <input type="submit" value="Log In" className="primary disabled" /> */}
                    </ul>
                </form>
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

        </div>
    )
}
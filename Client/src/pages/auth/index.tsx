import { useEffect } from "react";
import { SpinnerPopup } from "../../components/SpinnerPopup";
import { FormLogin } from "./components/formLogin";
import { FormRegister } from "./components/formRegister";
import { MessageLogin } from "./components/messageLogin";
import { MessageRegister } from "./components/messageRegister";
import { FormsProvider } from "./context/formsProvider";
import styleModule from "./index.module.css"

import { useAuthUserStore } from "./store";

export const Auth: React.FC = () => {

    const store = useAuthUserStore()

    /// METODOS
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        store.actions.changeStyleForm();
    }, [store.state.loginFormActive, store.state.registerFormActive])

    return (
        <FormsProvider>
            <main className={styleModule.mainAuthentication}>
                <div className={styleModule.containerPage}>
                    <section className={styleModule.containerPage__Background}>
                        <MessageLogin />

                        <MessageRegister />
                    </section>

                    <section className={`${styleModule.containerPage__Auth}
                      ${styleModule[store.state.styleForm]}
                    `}>
                        <FormLogin />

                        <FormRegister />
                    </section>
                </div>
            </main>

            <SpinnerPopup />
        </FormsProvider>
    )
}
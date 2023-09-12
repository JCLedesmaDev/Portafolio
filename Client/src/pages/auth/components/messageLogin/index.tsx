import React from "react";
import { useFormsContext } from "../../context/useFormsContext";
import { useAuthUserStore } from "../../store";
import styleModule from "./index.module.css";



export const MessageLogin: React.FC = () => {

  /// HOOKS
  const store = useAuthUserStore()
  const useForms = useFormsContext()
  const { resetForm } = useForms.formRegister

  /// METOODS
  const goToLogin = (): void => {

    store.actions.setLoginFormActive(true)
    store.actions.setRegisterFormActive(false)

    resetForm()
  }

  return (

    <article className={`
          ${styleModule.containerBackgroundLogin} 
          ${store.state.loginFormActive ? styleModule.noneElement : ""}
        `}
      style={store.state.registerFormActive ? { "opacity": 1 } : { "opacity": 0 }}
    >

      <h3> ¿Ya tienes una cuenta?</h3>
      <p> Inicia sesion para entrar a la pagina</p>

      <button onClick={goToLogin}> Iniciar sesion </button>

    </article>
  );
};

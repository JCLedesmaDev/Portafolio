
import styleModule from "./index.module.css";
import { useAuthUserStore } from "../../store";
import { useFormsContext } from "../../context/useFormsContext";



export const MessageRegister: React.FC = () => {

  /// HOOKS
  const store = useAuthUserStore()
  const useForms = useFormsContext()
  const { resetForm } = useForms.formLogin


  const goToRegister = (): void => {
    store.actions.setLoginFormActive(false)
    store.actions.setRegisterFormActive(true)

    resetForm()
  }

  return (
    <article className={`
        ${styleModule.containerBackgroundRegister} 
        ${store.state.registerFormActive ? styleModule.noneElement : ""}
      `}
      style={store.state.loginFormActive ? { "opacity": 1 } : { "opacity": 0 }}
    >
      <h3>¿Aun no tienes una cuenta?</h3>
      <p>Registrate para que puedas iniciar sesion</p>

      <button onClick={goToRegister}> Registrarse </button>
    </article>
  );
};

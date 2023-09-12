import { Input } from "../../../../components/Input";
import styleModule from "./index.module.css";
import { InputsMockRegister } from "../../mocks/inputsRegister";
import { IInputs } from "../../../../components/Input/IInputs";
import { useAuthUserStore } from "../../store";
import { useFormsContext } from "../../context/useFormsContext";
import { IRegisterDto } from "../../interface/frontToBack/IRegister.dto";


export const FormRegister: React.FC = () => {

  /// HOOKS
  const store = useAuthUserStore()
  const useForms = useFormsContext()
  const { form, handleChange, resetForm } = useForms.formRegister

  const register = async (event: any) => {
    event.preventDefault();

    const payload: IRegisterDto = {
      email: form.emailRegister,
      fullName: form.fullName,
      password: form.passwordRegister,
      confirmPassword: form.confirmPassword,
    } 

    const isRegister = await store.actions.register(payload)

    if (!isRegister) return


    store.actions.setLoginFormActive(true)
    store.actions.setRegisterFormActive(false)

    resetForm()
  }

  return (
    <div className={`
      ${store.state.registerFormActive
        ? styleModule["containerFormRegister--show"]
        : styleModule["containerFormRegister--hide"]}
    `}>

      <h2>Registrarse</h2>

      <form onSubmit={register}>
        {InputsMockRegister.map((inputProps: IInputs, index: number) => (<Input
          key={index}
          inputProps={inputProps}
          value={form[inputProps.name]}
          handleChange={handleChange}
          errorMessage={inputProps.errorMessage}
          pattern={inputProps.expReg}
        />)
        )}

        < button type="submit">Registrarse</button>
      </form>

    </div >
  );
};

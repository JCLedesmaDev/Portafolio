import React from "react";
import { useNavigate } from "react-router-dom"
import { Input } from "../../../../components/Input";
import styleModule from "./index.module.css"

import { InputsMockLogin } from "../../mocks/inputsLogin";
import { IInputs } from "../../../../components/Input/IInputs";
import { useAuthUserStore } from "../../store";
import { useFormsContext } from "../../context/useFormsContext";
import { ILoginDto } from "../../interface/frontToBack/ILogin.dto";


export const FormLogin: React.FC = () => {

  /// HOOKS
  const navigate = useNavigate();
  const store = useAuthUserStore()


  const useForms = useFormsContext()
  const { form, handleChange, resetForm } = useForms.formLogin


  const login = async (event: any) => {
    event.preventDefault();

    const payload: ILoginDto = {
      email: form.email,
      password: form.password
    }

    const isLogin = await store.actions.login(payload)

    if (isLogin) navigate("/");
    resetForm()
  }


  return (

    <div className={`
      ${store.state.loginFormActive
        ? styleModule["containerFormLogin--show"]
        : styleModule["containerFormLogin--hide"]}
    `}>

      <h2>Iniciar Sesion</h2>

      <form onSubmit={login} >
        {InputsMockLogin.map((inputProps: IInputs, index: number) => (
          <Input
            key={index}
            inputProps={inputProps}
            value={form[inputProps.name]}
            handleChange={handleChange}
            errorMessage={inputProps.errorMessage}
            pattern={inputProps.expReg}
          />
        ))}

        <button type="submit">Entrar</button>
      </form>

    </div>

  );
};

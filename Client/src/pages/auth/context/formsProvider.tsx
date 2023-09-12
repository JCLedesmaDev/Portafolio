import { createContext } from "react";
import { useFormCustom } from "../../../hooks/useFormCustom";
import { ILoginDto } from "../interface/frontToBack/ILogin.dto";
import { IFormRegister } from "../interface/frontToBack/IRegister.dto";


/* Interface de las propiedades / metodos que podremos utilziar en los Componentes */
interface IFormsContext {
  formLogin: any;
  formRegister: any;
}
/* Este Context tendra alojada toda la informacion que compartiremos con nuestros componentes */
export const FormsContext = createContext<IFormsContext>({} as IFormsContext);


interface Props {
  children: JSX.Element | JSX.Element[];
}

export const FormsProvider: React.FC<Props> = (props) => {

  /// HOOKS
  const formLogin = useFormCustom<ILoginDto>({ email: '', password: '' });
  const formRegister = useFormCustom<IFormRegister>({
    emailRegister: '', passwordRegister: '', confirmPassword: '', fullName: ''
  })

  return (
    <FormsContext.Provider value={{ formLogin, formRegister }}>
      {props.children}
    </FormsContext.Provider>
  );
};
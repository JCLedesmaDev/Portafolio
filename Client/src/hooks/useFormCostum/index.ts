/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";

type TypeTarget = ChangeEvent<HTMLInputElement | HTMLSelectElement> | any;

export interface IResponseUseForm<TypeData> {
  form: TypeData;
  handleChange: ({ target }: TypeTarget) => void;
  resetForm: () => void;
  setForm: (value: React.SetStateAction<TypeData>) => void;
}


//Custom Hook Generico Tipado
// eslint-disable-next-line @typescript-eslint/ban-types
export const useFormCustom = <TypeFormData extends Object>(
  initialState: TypeFormData
): IResponseUseForm<TypeFormData> => {

  /* *Agregar en el ts.config lo sig: "noImplicitAny": false,  */
  const [form, setForm] = useState<TypeFormData>(initialState);

  const handleChange = ({ target }: TypeTarget) => {
    const { name, value, files } = target;

    // En caso de cargar imagenes tb
    const imageInput = files != null && files[0];

    setForm({ ...form, [name]: imageInput ?? value });
  };

  const resetForm = () => setForm(initialState);

  return {
    ...form,
    form,
    handleChange,
    resetForm,
    setForm
  };
};

/* Puntos necesarios para poder utilizar este custom hooks 

1) Crear una interface que contenta todos los campos que tendra el formulario.
  Por ejem.:

  export interface IFormLogin {
    emailLogin: string;
    passwordLogin: string;
  }

2) Cuando ejecutamos nuestro custom hooks, le deberemos pasar, la interface definida
  en el paso anterior y un objeto con los valores iniciales de los campos de nuestro 
  formulario.

  Por ejem.: 
    const formularioLogin = useFormCustom<IFormLogin>({
      emailLogin: "",
      passwordLogin: "",
    });
    const { formulario, handleChange, resetForm } = formularioLogin;

  Este CustomHook nos devolvera
  - Objeto con todos los campos del formulario y sus valores.
  - Metodo HandleChange, para rellenar los valores del formulario.
  - Metodo resetForm, para resetear los valores del formulario.
  - Cada uno de los campos del formulario.
*/

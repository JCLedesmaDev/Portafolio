/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export interface IResponseUseForm<TypeData> {
  form: TypeData;
  handleChange: (nameField: string, data: any) => void;
  resetForm: () => void;
}

/**
 * Hook personalizado que manipula los datos de un formulario
 * @param initialState  - Recibira el objeto inicial de todos los campos que contendra el formulario
 * @example { 
      email: { value: '', dirty: false, error: false },
      password: { value: '', dirty: false, error: false }
    }
 * ~~~
 * @returns Los siguientes datos:
 * @object form - Todos los datos de los campos del formulario utilizando "handleChange"
 * @function handleChange - (nameField:string, data:any) - Metodo para actualizar los valores de tu form
 * @function resetForm - Metodo para resetar los campos de tu formulario al "initialState"
 */
export const useFormCustom = <TypeFormData>(initialState: TypeFormData) => {

  /* *Agregar en el ts.config lo sig: "noImplicitAny": false,  */
  const [form, setForm] = useState<TypeFormData>(initialState);

  const handleChange = (nameField: string, data: any) => {
    setForm((prevForm) => ({
      ...prevForm, [nameField]: data
    }))
  }

  const resetForm = () => setForm(initialState);

  const data: IResponseUseForm<TypeFormData> = {
    ...form,
    form,
    handleChange,
    resetForm,
  };

  return data
};

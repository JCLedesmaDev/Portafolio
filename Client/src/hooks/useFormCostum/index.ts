/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";


export interface IResponseUseForm<TypeData> {
  form: TypeData;
  handleChange: (nameField: string, data: any) => void;
  resetForm: () => void;
}
 

// eslint-disable-next-line @typescript-eslint/ban-types
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

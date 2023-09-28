/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";

type TypeTarget = ChangeEvent<HTMLInputElement | HTMLSelectElement> | any;

export interface IResponseUseForm<TypeData> {
  form: TypeData;
  handleChange: ({ target }: TypeTarget) => void;
  resetForm: () => void;
  setForm: (value: React.SetStateAction<TypeData>) => void;
}


// eslint-disable-next-line @typescript-eslint/ban-types
export const useFormCustom = <TypeFormData>(initialState: TypeFormData) => {

  /* *Agregar en el ts.config lo sig: "noImplicitAny": false,  */
  const [form, setForm] = useState<TypeFormData>(initialState);

  const handleChange = ({ target }: TypeTarget) => {
    const { name, value, files } = target;

    // En caso de cargar imagenes tb
    const imageInput = files != null && files[0];

    setForm((prevForm) => ({
      ...prevForm, [name]: imageInput ? imageInput : value
    }))
  }

  const resetForm = () => setForm(initialState);

  const data: IResponseUseForm<TypeFormData> = {
    ...form,
    form,
    handleChange,
    resetForm,
    setForm
  };

  return data
};

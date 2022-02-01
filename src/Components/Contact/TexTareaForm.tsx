import React from "react";
import { IFormRegister } from "../../Interface/IFormRegister";
import { expRegForm, validateInput } from "../../Utils/expRegForm";
import FormCSS from "./Form.module.css";



export const TexTarea: React.FC<IFormRegister> = (props) => {
  const { form, register } = props;
  const IconFormClass = `${FormCSS.contact__form__iconValidate} fas fa-times-circle`;

  return (
    <div className={FormCSS.contact__form__textarea}>
      <textarea
        {...form}
        {...register(form.name, expRegForm[form.name])}
        onKeyUp={({ target }) => {
          validateInput(target, form.name, FormCSS);
        }}
      />
      <i className={IconFormClass} />
    </div>
  );
};

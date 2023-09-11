import React from "react";
import { IFormRegister } from "../../../../Interface/IFormRegister";
import { expRegForm, validateInput } from "../../../../Utils/expRegForm";
import FormFieldCSS from "./FormField.module.css";

export const InputForm: React.FC<IFormRegister> = (props) => {
  const { form, register } = props;
  const IconFormClass = `${FormFieldCSS.iconValidate} fas fa-times-circle`;

  return (
    <div className={FormFieldCSS.InputContainer}>
      <input
        {...form}
        {...register(form.name, expRegForm[form.name])}
        onKeyUp={({ target }) => {
          validateInput(target, form.name, FormFieldCSS);
        }}
      />
      <i className={IconFormClass} />
    </div>
  );
};

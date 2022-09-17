import React from "react";
import { IFormRegister } from "../../../Interface/IFormRegister";
import { expRegForm, validateInput } from "../../../Utils/expRegForm";
import ContactCSS from "../Contact.module.css";

export const InputForm: React.FC<IFormRegister> = (props) => {
  const { form, register } = props;
  const IconFormClass = `${ContactCSS.contact__form__iconValidate} fas fa-times-circle`;

  return (
    <div className={ContactCSS.contact__form__inputs}>
      <input
        {...form}
        {...register(form.name, expRegForm[form.name])}
        onKeyUp={({ target }) => {
          validateInput(target, form.name, ContactCSS);
        }}
      />
      <i className={IconFormClass} />
    </div>
  );
};

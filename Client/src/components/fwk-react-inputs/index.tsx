/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { IInputProps } from "./interface/input.interface";
import styleCSS from "./index.module.css";

interface Props {
  props: IInputProps
}

export const Input: React.FC<Props> = ({ props }) => {

  const { attrInput, data, errorMessage, expReg, handleChange } = props;


  /* Para utilizar este componente, hace falta utilizar Font Awesome,
      <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
      integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
      crossorigin="anonymous"
    />*/

  /// METODOS
  const update = (evt: any) => {
    const { name, value, files } = evt.target;

    // // En caso de cargar imagenes tb
    const imageInput = files != null && files[0];

    const updateLocal = {
      value: imageInput ? imageInput : value,
      dirty: value !== data.value,
      error: expReg.exec(value) === null
    }

    handleChange(name, updateLocal)
  }

  const defineCSSIcon = () => {
    let style = styleCSS.contact__form__iconValidate;

    if (data.value === '') return style;

    if (expReg.exec(data.value)) {
      style += ` ${styleCSS.iconValidate_correct} fas fa-check-circle`
    } else {
      style += ` ${styleCSS.iconValidate_incorrect} fas fa-times-circle`
    }
    return style
  }

  const defineCSSMessage = () => {
    let style = styleCSS.contact_messageError;

    if (data.value === '') return style;

    if (expReg.exec(data.value) === null) {
      style += ` ${styleCSS.contact_messageErrorActive}`
    }

    return style
  }

  return (
    <div id={`form__${attrInput["name"]}`}>
      <div className={styleCSS.contact__form__inputs}>
        <input defaultValue={data.value} onKeyUp={update} {...attrInput} />
        <i className={defineCSSIcon()} />
      </div>
      <p className={defineCSSMessage()}>{errorMessage}</p>
    </div>
  );
};

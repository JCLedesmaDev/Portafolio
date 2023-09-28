/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import styleCSS from "./index.module.css";
import { evtEmitter } from "@/utils/index.utils"
import { IInputProps, IData } from "./interface/Input.interface";


interface Props {
  props: IInputProps;
  subscribedEventName: string;
}

export const Input: React.FC<Props> = ({ props, subscribedEventName }) => {

  const { attrInput, errorMessage, expReg, data } = props;
  const local: IData = JSON.parse(JSON.stringify(data))

  /* Para utilizar este componente, hace falta utilizar Font Awesome,
      <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
      integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
      crossorigin="anonymous"
    />*/
  const iconFormClass = `
    ${!local.dirty ? styleCSS.iconValidate_incorrect : styleCSS.iconValidate_correct}
    ${!local.dirty ? 'fas fa-times-circle' : 'fas fa-check-circle'}    
  `; // ver de invertir con la validacion

  const messageErrorClass = `
    ${styleCSS.contact_messageError} 
    ${!local.dirty ? styleCSS.contact_messageErrorActive : ''}
  `

  /// METODOS

  const update = (evt: any) => {
    local.value = evt.target.value || undefined
    local.dirty = local.value !== data.value
    local.error = expReg.exec(local.value) === null

    if (local.value == "") verifyisValueBlank()

    // A todos los oyentes de 'updateInput', van a recibir este arguemtno
    evtEmitter.emitToSubscribers({
      subscribedEventName: subscribedEventName, 
      args: { [attrInput.name]: local }
    })
  };


  const verifyisValueBlank = () => {
    const $iconInput = document.querySelector(`#form__${attrInput["name"]} i`) as HTMLElement;
    const $formError = document.querySelector(`#form__${attrInput["name"]} p`) as HTMLElement;
    //Quitamos el icono en cuestion
    $iconInput.classList.remove("fa-check-circle");
    $iconInput.classList.remove("fa-times-circle");

    //Quitamos la clase para que no aparezca el mensaje de error
    $formError.classList.remove(`${styleCSS.contact_messageErrorActive}`);
  }

  useEffect(() => verifyisValueBlank, [])

  return (
    <div id={`form__${attrInput["name"]}`}>
      <div className={styleCSS.contact__form__inputs}>
        <input onKeyUp={update} {...attrInput} defaultValue={local.value} />
      </div>

      <i className={iconFormClass} />
      <p className={messageErrorClass}>{errorMessage}</p>
    </div>
  );
};

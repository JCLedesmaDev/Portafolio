/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styleCSS from "./index.module.css";
import { evtEmitter } from "@/utils/index.utils"
import { IInputProps, IData } from "./interface/Input.interface";


interface Props {
  props: IInputProps;
  subscribedEventName: string;
}

export const Input: React.FC<Props> = ({ props, subscribedEventName }) => {

  const { attrInput, errorMessage, expReg, data } = props;
  const [local, setLocal] = useState<IData>(JSON.parse(JSON.stringify(data)))

  /* Para utilizar este componente, hace falta utilizar Font Awesome,
      <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
      integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
      crossorigin="anonymous"
    />*/

  const iconFormClass = `
    ${styleCSS.contact__form__iconValidate}
    ${local.error ? styleCSS.iconValidate_incorrect : styleCSS.iconValidate_correct}
    ${local.error ? 'fas fa-times-circle' : 'fas fa-check-circle'}    
  `;

  const messageErrorClass = `
    ${styleCSS.contact_messageError} 
    ${local.error ? styleCSS.contact_messageErrorActive : ''}
  `

  /// METODOS
  const update = (evt: any) => {

    const updateLocal = {
      value: evt.target.value,
      dirty: local.value !== data.value,
      error: expReg.exec(evt.target.value) === null
    }

    if (updateLocal.value === '') verifyisValueBlank()

    // A todos los oyentes de 'updateInput', van a recibir este arguemtno
    evtEmitter.emitToSubscribers({
      subscribedEventName: subscribedEventName,
      args: { [attrInput.name]: updateLocal }
    })

    setLocal(updateLocal)
  };


  const verifyisValueBlank = () => {

    const $iconInput = document.querySelector(`#form__${attrInput["name"]} i`) as HTMLElement;
    //Quitamos el icono en cuestion
    $iconInput.classList.remove("fa-check-circle");
    $iconInput.classList.remove("fa-times-circle");

    //Quitamos la clase para que no aparezca el mensaje de error
    local.error = false
  }

  return (
    <div id={`form__${attrInput["name"]}`}>
      <div className={styleCSS.contact__form__inputs}>
        <input onKeyUp={update} {...attrInput} defaultValue={local.value} />
        <i className={iconFormClass} />
      </div>

      <p className={messageErrorClass}>{errorMessage}</p>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { IInputData, IInputProps } from "./interface/input.interface";
import styleCSS from "./index.module.css";

interface Props {
  props: IInputProps
}

export const Input: React.FC<Props> = ({ props }) => {

  const { attrInput, data, errorMessage, expReg, handleChange } = props;
  const [local, setLocal] = useState<IInputData>(JSON.parse(JSON.stringify(data)))
  // Capaz que haya que eliminar este local

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
    const { name, value, files } = evt.target;

    // // En caso de cargar imagenes tb
    const imageInput = files != null && files[0];

    const updateLocal = {
      value: imageInput ? imageInput : value,
      dirty: value !== local.value,
      error: expReg.exec(value) === null
    }

    if (updateLocal.value === '') verifyisValueBlank()
    
    setLocal(updateLocal)
    handleChange(name, updateLocal)
  }


  const verifyisValueBlank = () => {
    if (local.value !== "") return // Quizas tenga que ir el target

    const $iconInput = document.querySelector(`#form__${attrInput["name"]} i`) as HTMLElement;

    //Quitamos el icono en cuestion
    $iconInput.classList.remove("fa-check-circle");
    $iconInput.classList.remove("fa-times-circle");

    //Quitamos la clase para que no aparezca el mensaje de error
    local.error = false
  };

  return (
    <div id={`form__${attrInput["name"]}`}>
      {
        <div className={styleCSS.contact__form__inputs}>
          <input value={local.value} onChange={update}
            onKeyUp={verifyisValueBlank} {...attrInput}
          />
          <i className={iconFormClass} />
        </div>
      }
      <p className={messageErrorClass}>{errorMessage}</p>
    </div>
  );
};

/* Puntos necesarios para poder utilizar este Componente 

  Necesitaremos pasarle
  - Value: Un state para poder obtener el valor del input 
  - handleChange: el setState del useState();
  - expReg: Una expresion regular para que pueda validar 
    lo que se escribe.
  - errorMessage: Un mensaje de error para cuando estemos escribiendo
    algo que no debamos.
  - inputProps: Un objeto que contenga
      * type=""
      * placeholder=""
      * name=""
    Con sus respectivos valores dependiendo del Input.

  La interface de esto seria:
  export interface IFormInputs {
    placeholder: string;
    type: any;
    name: string;
    expReg: RegExp;
    errorMessage: string;
  }
  
  Por ejem.:

  const [inputText, setInputText] = useState("")
  const propsInput = {
    placeholder: "Correo electronico: ",
    type: "email",
    name: "emailLogin",
    expReg: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
    errorMessage:
      "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.",
  },

  <Input
    inputProps={propsInput}
    value={inputText}
    handleChange={setInputText}
    errorMessage={propsInput.errorMessage}
    expReg={propsInput.expReg}
  />
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import styleCSS from "./index.module.css";
import { evtEmitter } from "@/utils/index.utils"
import { IInputProps, IData } from "./interface/Input.interface";


interface Props {
  props: IInputProps
}

export const Input: React.FC<Props> = ({ props }) => {

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
    evtEmitter.emit('updateInput', { [attrInput.name]: local })
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { IInputProps, IInputData } from "./interface/input.interface";
import styleCSS from "./index.module.css";
import { CheckCircleSVG } from "@/components/fwk-react-inputs/svg/CheckCircleSVG";

interface Props { props: IInputProps }

export const Input: React.FC<Props> = ({ props }) => {

  const { data, handleChange } = props;


  /* Para utilizar este componente, hace falta utilizar Font Awesome,
      <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
      integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
      crossorigin="anonymous"
    />*/

  /// METODOS


  const defineCSSIcon = () => {
    //let style = styleCSS.contact__form__iconValidate;

    //if (data.value === '') return style;

    //if (expReg.exec(data.value)) {
    //  style += ` ${styleCSS.iconValidate_correct}`
    //} else {
    //  style += ` ${styleCSS.iconValidate_incorrect}`
    //}
    //return style
    return ''
  }
  // https://fonts.google.com/icons?selected=Material+Symbols+Outlined:block:FILL@0;wght@400;GRAD@0;opsz@24&icon.platform=web&icon.query=close
  const defineCSSMessage = () => {
    //let style = styleCSS.contact_messageError;

    //if (data.value === '') return style;

    //if (expReg.exec(data.value) === null) {
    //  style += ` ${styleCSS.contact_messageErrorActive}`
    //}

    //return style
    return ''
  }

  /// REFACTOR
  const [local, setLocal] = useState<IInputData>({
    value: undefined,
    dirty: false,
    error: false,
    messageError: ''
  })

  const update = (evt: any) => {
    const { value, files } = evt.target;

    // // En caso de cargar imagenes tb
    const imageInput = files != null && files[0];

    setLocal((prevData) => ({
      ...prevData,
      value: imageInput ? imageInput : value,
      dirty: value !== data.value
    }))
  }

  useEffect(() => {
    for (const validate of props.rules) {
      const resultValidate = validate(local.value)

      if (typeof resultValidate === 'string') {
        setLocal((prevData) => ({ ...prevData, error: true, messageError: resultValidate }))
        handleChange(props.name, { value: local.value, dirty: local.dirty, error: true })
        break;
      }

      setLocal((prevData) => ({ ...prevData, error: false, messageError: '' }))
      handleChange(props.name, { value: local.value, dirty: local.dirty, error: false })
    }
  }, [local.value])

  return (

    <div id={`form__${props.name}`}>

      <div className={styleCSS.contact__form__inputs}>

        <input defaultValue={data.value} onKeyUp={update} placeholder={props.placeholder} type={props.type} name={props.name} required={props.required} autoComplete={props.autoComplete} />
        {/* <i className={defineCSSIcon()}>adsad</i> */}

        <CheckCircleSVG className={defineCSSIcon()} />
        {/* <img className={defineCSSIcon()} src={iconCheckCicle}/> */}

      </div>

      <p className={defineCSSMessage()}>{local.messageError}</p>

    </div>
  );
};

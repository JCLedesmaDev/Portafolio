/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { IInputProps, IInputData, IInputRules } from "./interface/input.interface";
import css from "./index.module.css";
import { CheckDoneSVG } from "@/components/fwk-react-inputs/svg/CheckDoneSVG";
import { CheckCloseSVG } from './svg/CheckCloseSVG';

interface Props { props: IInputProps }

export const Input: React.FC<Props> = ({ props }) => {

  /// VARIABLES
  const { data, handleChange } = props;

  const refInput = useRef<any>()
  const [origVal, setOrigVal] = useState()
  const [local, setLocal] = useState<IInputData>({
    value: '',
    dirty: false,
    error: false,
    messageError: ''
  })

  const [cmpRules, setCmpRules] = useState<IInputRules[]>([{
    fnCondition: (val) => !(props.required && !!val),
    messageError: 'Este campo es requerido.'
  }])

  /// METODOS

  const initInput = () => {
    //console.log(`CONSTRUCTOR INPUT ${props.name}`)
    props.rules.forEach(rule => {
      setCmpRules((prevVal) => ([...prevVal, rule]))
    })
    setOrigVal(data.value)
    setLocal({
      value: data.value,
      dirty: data.dirty,
      error: data.error
    })
  }

  const validateRules = () => {
    //console.log(`Rules INPUT ${props.name}`)
    for (const rule of cmpRules) {

      if (rule.fnCondition(local.value)) {
        setLocal((prevData) => ({
          ...prevData, error: true, messageError: rule.messageError
        }))
        handleChange(props.name, {
          value: local.value, dirty: local.dirty, error: true
        })
        break;
      }

      setLocal((prevData) => ({
        ...prevData, error: false, messageError: ''
      }))
      handleChange(props.name, {
        value: local.value, dirty: local.dirty, error: false
      })
    }
  }

  const update = (evt: any) => {
    const { value, files } = evt.target;
    // En caso de cargar imagenes tb
    const imageInput = files != null && files[0];
    setLocal((prevData) => ({
      ...prevData,
      value: imageInput ? imageInput : value,
      dirty: value !== origVal
    }))
  }

  const rollback = () => {
    setLocal(() => ({
      error: false,
      value: origVal,
      dirty: false
    }))
    handleChange(props.name, {
      value: origVal, dirty: false, error: false
    })
    if (refInput.current) refInput.current.value = '' as any
  }

  const defineCSSIcon = () => {
    let style = css.contact__form__iconValidate;

    if (local.value === undefined) return style;
    if (local.error) {
      style += ` ${css.iconValidate_incorrect}`
    } else {
      style += ` ${css.iconValidate_correct}`
    }
    return style
  }

  const defineCSSMessage = () => {
    let style = css.contact_messageError;

    if (local.value === undefined) return style;
    if (local.error) {
      style += ` ${css.contact_messageErrorActive}`
    }

    return style
  }


  useEffect(() => { initInput() }, [])

  useEffect(() => { validateRules() }, [local.value])

  return (

    <div id={`form__${props.name}`}>

      <div className={css.contact__form__inputs}>

        <input ref={refInput} defaultValue={local.value} onKeyUp={update} placeholder={props.placeholder} type={props.type} name={props.name} required={props.required} autoComplete={props.autoComplete} />

        {
          local.error
            ? (<CheckCloseSVG className={defineCSSIcon()} rollback={rollback} />)
            : (<CheckDoneSVG className={defineCSSIcon()} />)
        }
      </div>

      <p className={defineCSSMessage()}>{local.messageError}</p>

    </div>
  );
};

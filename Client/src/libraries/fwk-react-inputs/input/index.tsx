/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import css from "./index.module.css";
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { IRules } from '../interface/IRules';
import { IInputProps } from '../interface/IInput';

interface Props {
  props: IInputProps;
  className?: any;
  style?: object
}

export const Input: React.FC<Props> = ({ props, className, style }) => {

  /// VARIABLES
  const { data, handleChange } = props;

  const refInput = useRef<any>()
  const [origVal, setOrigVal] = useState()
  const [local, setLocal] = useState<IInputProps>({
    data: { value: '' },
    autoComplete: 'false',
    name: '',
    type: 'text',
    placeholder: '',
    required: false,
    icon: undefined,
    handleChange: () => { }
  })

  const [cmpRules, setCmpRules] = useState<IRules[]>([{
    fnCondition: (val) => props.required && !val,
    messageError: 'Este campo es requerido.'
  }])

  /// METODOS

  const initInput = () => {
    console.log(`CONSTRUCTOR INPUT ${props.name}`)
    props.rules?.forEach(rule => {
      setCmpRules((prevVal) => ([...prevVal, rule]))
    })
    setOrigVal(data.value)
    setLocal(props)
  }

  const validateRules = () => {
    //console.log(`Rules INPUT ${props.name}`)
    for (const rule of cmpRules) {

      if (rule.fnCondition(local.data.value)) {
        setLocal((prevVal) => ({
          ...prevVal, data: {
            ...prevVal.data, error: true, messageError: rule.messageError
          }
        }))
        handleChange(props.name, {
          value: local.data.value, dirty: local.data.dirty, error: true
        })
        break;
      }

      setLocal((prevVal) => ({
        ...prevVal, data: {
          ...prevVal.data, error: false, messageError: ''
        }
      }))
      handleChange(props.name, {
        value: local.data.value, dirty: local.data.dirty, error: false
      })
    }
  }

  const update = (evt: any) => {
    const { value } = evt.target;

    // En caso de cargar imagenes tb
    setLocal((prevVal) => ({
      ...prevVal,
      data: {
        ...prevVal.data,
        value: value,
        dirty: value !== origVal
      }
    }))
  }

  const rollback = () => {
    const dirtyFlag = origVal ? undefined : false
    setLocal((prevVal) => ({
      ...prevVal,
      data: { error: false, value: origVal, dirty: dirtyFlag }
    }))
    handleChange(props.name, {
      error: false, value: origVal, dirty: dirtyFlag
    })
    if (refInput.current) refInput.current.value = origVal
  }

  const defineCSSInput = () => {
    let style = '';

    if (local.data.value === undefined || local.data.dirty === undefined) return style;

    if (local.data.error) {
      style = css['container__Item--incorrect']
    } else {
      style = css['container__Item--correct']
    }
    return style
  }

  const defineCSSMessage = () => {
    let style = css.container__messageError;

    if (local.data.value === undefined || local.data.dirty === undefined) return style;
    if (local.data.error) {
      style += ` ${css['container__messageError--active']}`
    }

    return style
  }


  useEffect(() => { initInput() }, [])

  useEffect(() => { validateRules() }, [local.data.value])

  return (

    <div className={`${css.container} ${className}`} style={style}>

      <div className={css.container__Item}>

        {props.icon && (<label className={css.containerItem__iconPrepend}>  {props.icon} </label>)}

        <input ref={refInput} defaultValue={local.data.value} onKeyUp={update} placeholder={props.placeholder} type={props.type} name={props.name} required={props.required} autoComplete={props.autoComplete} className={defineCSSInput()} id={`input__${props.name}`} />

        {local.data.dirty && (
          <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
        )}

      </div>

      <p className={defineCSSMessage()}>{local.data.messageError}</p>

    </div>
  );
};

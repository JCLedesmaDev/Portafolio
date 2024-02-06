/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import css from "./index.module.css";
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import TextareaAutosize from 'react-textarea-autosize';
import { useMerge } from '@/hooks/index.hooks';
import { IRules } from '../interface/IRules';
import { IExposeInput } from '../interface/IExposeInput';
import { IInputData, IInputProps } from '../interface/IInput';

interface Props {
  className?: any;
  style?: object;
  required: boolean;
  rows?: number
}

export const InputObs = forwardRef<IExposeInput, Props>((
  { className, style, required, rows = 2 }, ref
) => {

  /// HOOKS
  const { merge } = useMerge()
  const refTextarea = useRef<any>()
  const [origVal, setOrigVal] = useState()
  const [local, setLocal] = useState<IInputProps>({
    data: { value: '' },
    autoComplete: 'false',
    name: '',
    placeholder: '',
    required: false,
    icon: undefined,
    refresh: () => { },
  })

  const [cmpRules, setCmpRules] = useState<IRules[]>([{
    fnCondition: (val) => required && !val,
    messageError: 'Este campo es requerido.'
  }])

  /// METODOS
  const validateRules = () => {
    //console.log(`Rules INPUT ${props.name}`)
    for (const rule of cmpRules) {

      if (rule.fnCondition(local.data.value)) {
        setLocal((prevVal) => ({
          ...prevVal, data: {
            ...prevVal.data, error: true, messageError: rule.messageError
          }
        }))
        break;
      } else {
        setLocal((prevVal) => ({
          ...prevVal, data: {
            ...prevVal.data, error: false, messageError: ''
          }
        }))
      }
    }
  }

  const update = (evt: any) => {
    const { value } = evt.target;
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
    if (refTextarea.current) refTextarea.current.value = origVal
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

  const set = (val: IInputProps, prop?: string) => {
    console.log(`CONSTRUCTOR INPUT ${val.name}`)

    const data = JSON.parse(JSON.stringify(local))
    if (val.icon) { // Se hace porque no se puede stringlificar un componente
      data.icon = val.icon
      delete val.icon
    }

    const mergeData: IInputProps = Object.assign(
      data, merge(data, val, prop)
    );
    mergeData.refresh = val.refresh
    setLocal(mergeData)

    val.rules?.forEach(rule => {
      setCmpRules((prevVal) => ([...prevVal, rule]))
    })
  }

  const setData = (val: IInputData, prop: string) => {
    const dataMerge: IInputData = merge(local.data, val, prop)
    // eslint-disable-next-line no-prototype-builtins
    if (prop === 'value' || val?.hasOwnProperty('value')) {
      setOrigVal(dataMerge.value)
    }
    setLocal((prevVal) => ({ ...prevVal, data: dataMerge }))
    validateRules()
  }

  const reset = () => {
    setOrigVal(local.data.value)
    setLocal((prevVal) => ({
      ...prevVal,
      data: { ...prevVal.data, dirty: undefined }
    }))
  }

  useImperativeHandle(ref, () => {
    const expose = {
      reset, set, setData, props: local
    }
    setTimeout(() => { local.refresh() }, 10);
    return expose
  }, [local])

  useEffect(() => { validateRules() }, [local.data.value])

  return (

    <div className={`${css.container} ${className}`} style={style} >

      <div className={css.container__Item}>

        {local.icon && (<label className={css.containerItem__iconPrepend}>  {local.icon} </label>)}

        <TextareaAutosize
          ref={refTextarea} defaultValue={local.data.value} onKeyUp={update} placeholder={local.placeholder} name={local.name} required={local.required} autoComplete={local.autoComplete} className={defineCSSInput()} id={`textarea__${local.name}`} maxRows={rows}

        />

        {local.data.dirty && (
          <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
        )}

      </div>

      <p className={defineCSSMessage()}>{local.data.messageError}</p>

    </div>
  );
});

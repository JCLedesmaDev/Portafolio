/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import css from "./index.module.css";
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { IInputData, IInputProps } from '../interface/IInput';
import { useMerge } from '@/hooks/useMerge';
import { IExposeInput } from '../interface/IExposeInput';

interface Props {
  className?: any;
  style?: object;
  required: boolean;
}

export const InputText = forwardRef<IExposeInput, Props>((
  { className, style, required }, ref
) => {

  /// HOOKS
  const { merge } = useMerge()
  const refInput = useRef<any>()
  const origVal = useRef<any>()
  const [local, setLocal] = useState<IInputProps>({
    data: { value: '' },
    autoComplete: 'false',
    name: '',
    type: 'text',
    placeholder: '',
    required: false,
    icon: undefined,
    refresh: () => { },
    rules: [{
      fnCondition: (val) => required && !val,
      messageError: 'Este campo es requerido.'
    }]
  })

  /// METODOS
  const defineCSSInput = () => {
    let style = '';

    if (local.data.value === undefined ||
      local.data.dirty === undefined
    ) return style;

    if (local.data.error) {
      style = css['container__Item--incorrect']
    } else {
      style = css['container__Item--correct']
    }
    return style
  }

  const defineCSSMessage = () => {
    let style = css.container__messageError;

    if (local.data.value === undefined ||
      local.data.dirty === undefined
    ) return style;

    if (local.data.error) {
      style += ` ${css['container__messageError--active']}`
    }

    return style
  }

  const validateRules = () => {
    for (const rule of local.rules) {
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
        dirty: value !== origVal.current
      }
    }))
  }

  const rollback = () => {
    const dirtyFlag = origVal.current ? undefined : false
    setLocal((prevVal) => ({
      ...prevVal,
      data: {
        ...prevVal.data,
        value: origVal.current, dirty: dirtyFlag
      }
    }))
    if (refInput.current) refInput.current.value = origVal.current
  }

  const set = (val: IInputProps, prop?: string) => {
    console.log(`CONSTRUCTOR INPUT ${val.name}`)

    const copyLocal: IInputProps = JSON.parse(JSON.stringify(local))
    const rules = local.rules.concat(val.rules)

    // Se hace porque no se puede stringlificar un componente
    if (val.icon) {
      copyLocal.icon = val.icon
      delete val.icon
    }

    Object.assign(copyLocal, merge(copyLocal, val, prop));
    copyLocal.refresh = val.refresh
    copyLocal.rules = rules

    setLocal(copyLocal)
  }

  const setData = (val: IInputData, prop: string) => {
    const dataMerge = merge(local.data, val, prop)

    // eslint-disable-next-line no-prototype-builtins
    if (prop === 'value' || val?.hasOwnProperty('value')) {
      origVal.current = dataMerge.value
    }

    setLocal((prevVal) => ({ ...prevVal, data: dataMerge }))
    validateRules()
  }

  const reset = () => {
    origVal.current = local.data.value
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
  }, [local.data])

  useEffect(() => { validateRules() }, [local.data.value])

  return (
    <div className={`${css.container} ${className}`} style={style}>

      <div className={css.container__Item}>

        {local.icon && (<label className={css.containerItem__iconPrepend}>  {local.icon} </label>)}

        <input ref={refInput} defaultValue={local.data.value} onKeyUp={update} placeholder={local.placeholder} type={local.type} name={local.name} required={local.required} autoComplete={local.autoComplete} className={defineCSSInput()} id={`input__${local.name}`} />

        {local.data.dirty && (
          <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
        )}

      </div>

      <p className={defineCSSMessage()}>{local.data.messageError}</p>

    </div>
  );
});

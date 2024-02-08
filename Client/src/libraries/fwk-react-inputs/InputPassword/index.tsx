/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import css from "./index.module.css";
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { VisibilitySVG } from './svg/VisibilitySVG';
import { InvisibilitySVG } from './svg/InvisibilitySVG';
import { IInputData, IInputProps } from '../interface/IInput';
import { IExposeInput } from '../interface/IExposeInput';
import { useMerge } from '@/hooks/index.hooks';

interface Props {
  className?: any;
  style?: object;
}

export const InputPassword = forwardRef<IExposeInput, Props>((
  { className, style }, ref
) => {

  /// HOOKS
  const { merge } = useMerge()
  const refInput = useRef<any>()
  const origVal = useRef<any>()
  const required = useRef(false)
  const [visiblePassword, setVisiblePassowrd] = useState(false)
  const [local, setLocal] = useState<IInputProps>({
    data: { value: '' },
    autoComplete: 'false',
    name: '',
    placeholder: '',
    required: false,
    icon: undefined,
    refresh: () => { },
    rules: [{
      fnCondition: (val) => required.current && !val,
      messageError: 'Este campo es requerido.'
    }]
  })

  /// METODOS
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
        value,
        dirty: value !== origVal.current
      }
    }))
  }

  const rollback = () => {
    const dirtyFlag = origVal.current ? undefined : false
    setLocal((prevVal) => ({
      ...prevVal,
      data: { error: false, value: origVal.current, dirty: dirtyFlag }
    }))
    if (refInput.current) refInput.current.value = origVal.current
  }

  const showPassword = () => {
    setVisiblePassowrd((prevVal) => !prevVal)
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
    required.current = val.required

    Object.assign(copyLocal, merge(copyLocal, val, prop));
    copyLocal.refresh = val.refresh
    copyLocal.rules = rules

    setLocal(copyLocal)
  }

  const setData = (val: IInputData, prop: string) => {
    const dataMerge = merge(local.data, val, prop)

    // eslint-disable-next-line no-prototype-builtins
    if (prop === 'value' || val.hasOwnProperty('value')) {
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

        <input ref={refInput} defaultValue={local.data.value} onKeyUp={update} placeholder={local.placeholder} type={visiblePassword ? 'text' : 'password'} name={local.name} required={local.required} autoComplete={local.autoComplete} className={defineCSSInput()} id={`input__${local.name}`} />


        {local.data.dirty && (
          <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
        )}

        {
          visiblePassword
            ? <InvisibilitySVG onClick={showPassword} className={css.container__Item__iconVisibilidad} />
            : <VisibilitySVG onClick={showPassword} className={css.container__Item__iconVisibilidad} />
        }

      </div>

      <p className={defineCSSMessage()}>{local.data.messageError}</p>

    </div>
  );
});

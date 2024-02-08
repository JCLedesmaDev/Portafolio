/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import css from './index.module.css'
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { IInputListData, IInputListProps } from '../interface/IInputList';
import { IExposeInputList } from '../interface/IExposeInput';
import { useMerge } from '@/hooks/useMerge';

interface Props {
    className?: any;
    style?: object;
    required: boolean;
}

export const InputList = forwardRef<IExposeInputList, Props>((
    { className, style, required }, ref
) => {

    /// HOOKS
    const { merge } = useMerge()
    const refSelect = useRef<any>()
    const origVal = useRef<any>()
    const [local, setLocal] = useState<IInputListProps>({
        data: { value: '', options: [] },
        autoComplete: 'false',
        name: '',
        optId: 'id',
        optLbl: 'name',
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
    const defineCSSSelect = () => {
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
                    ...prevVal,
                    data: {
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
        const dirtyFlag = origVal.current ? false : undefined
        setLocal((prevVal) => ({
            ...prevVal,
            data: {
                options: prevVal.data.options, error: false, value: origVal.current, dirty: dirtyFlag
            }
        }))
        if (refSelect.current) refSelect.current.value = origVal.current
    }


    const set = (val: IInputListProps, prop?: string) => {
        console.log(`CONSTRUCTOR INPUT LIST ${val.name}`)

        const copyLocal: IInputListProps = JSON.parse(JSON.stringify(local))

        let rules = local.rules
        if (val.rules) rules = local.rules.concat(val.rules)

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

    const setData = (val: IInputListData, prop: string) => {
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

    //useEffect(() => {
    //    setLocal((prevVal) => ({
    //        ...prevVal,
    //        data: { ...prevVal.data, options: local.data.options }
    //    }))
    //}, [local.data.options])

    return (
        <div className={`${css.container} ${className}`} style={style}>
            <div className={css.container__Item}>

                {local.icon && (<label className={css.containerItem__iconPrepend}>  {local.icon} </label>)}

                <select id={`select__${local.name}`} ref={refSelect} name={local.name} required={local.required} autoComplete={local.autoComplete} className={defineCSSSelect()} onChange={update} value={local.data.value}>

                    <option value={''} disabled hidden>
                        {local.placeholder}
                    </option>

                    {local.data.options?.map((opt: any, index: number) => (
                        <option key={index} value={opt[local.optId as any]}>
                            {opt[local.optLbl as any]}
                        </option>
                    ))}

                </select>

                {local.data.dirty && (
                    <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
                )}
            </div>

            <p className={defineCSSMessage()}>{local.data.messageError}</p>

        </div>
    )
})
/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import css from './index.module.css'
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { IInputCalendarData, IInputCalendarProps } from '../interface/IInputCalendar';
import { IExposeInputCalendar } from '../interface/IExposeInput';
import { useMerge } from '@/hooks/useMerge';

interface Props {
    className?: any;
    style?: object;
    required: boolean;
}

export const InputCalendar = forwardRef<IExposeInputCalendar, Props>((
    { className, style, required }, ref
) => {

    /// VARIABLES
    const { merge } = useMerge()
    const refCalendar = useRef<any>()
    const origVal = useRef<any>()
    const [local, setLocal] = useState<IInputCalendarProps>({
        data: { value: '', },
        autoComplete: 'false',
        name: '',
        required: false,
        refresh: () => { },
        rules: [{
            //fnCondition: (val) => !(props.required && !!val),
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
        const dirtyFlag = origVal.current ? undefined : false
        setLocal((prevVal) => ({
            ...prevVal,
            data: { error: false, value: origVal.current, dirty: dirtyFlag }
        }))
        if (refCalendar.current) refCalendar.current.value = origVal.current
    }

    const set = (val: IInputCalendarProps, prop?: string) => {
        console.log(`CONSTRUCTOR INPUT ${val.name}`)

        const copyLocal: IInputCalendarProps = JSON.parse(JSON.stringify(local))

        let rules = local.rules
        if (val.rules) rules = local.rules.concat(val.rules)

        Object.assign(copyLocal, merge(copyLocal, val, prop));
        copyLocal.refresh = val.refresh
        copyLocal.rules = rules

        setLocal(copyLocal)
    }

    const setData = (val: IInputCalendarData, prop: string) => {
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

                <input type="datetime-local" ref={refCalendar} name={local.name} required={local.required} autoComplete={local.autoComplete} className={defineCSSSelect()} onChange={update} defaultValue={local.data.value} />


                {local.data.dirty && (
                    <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
                )}
            </div>

            <p className={defineCSSMessage()}>{local.data.messageError}</p>

        </div>
    )
})
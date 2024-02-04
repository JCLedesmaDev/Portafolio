/* eslint-disable @typescript-eslint/no-explicit-any */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import css from './index.module.css'
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { IRules } from '../interface/IRules';
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
    const [origVal, setOrigVal] = useState()
    const [local, setLocal] = useState<IInputCalendarProps>({
        data: { value: '', },
        autoComplete: 'false',
        name: '',
        required: false,
        refresh: () => { },
    })

    const [cmpRules, setCmpRules] = useState<IRules[]>([{
        //fnCondition: (val) => !(props.required && !!val),
        fnCondition: (val) => required && !val,
        messageError: 'Este campo es requerido.'
    }])

    /// METODOS

    const validateRules = () => {
        //console.log(`Rules INPUT ${props.name}`)
        for (const rule of cmpRules) {
            if (rule.fnCondition(local.data.value)) {
                setLocal((prevVal) => ({
                    ...prevVal,
                    data: {
                        ...prevVal.data, error: true, messageError: rule.messageError
                    }
                }))
                local.refresh()
                break;
            } else {
                setLocal((prevVal) => ({
                    ...prevVal, data: {
                        ...prevVal.data, error: false, messageError: ''
                    }
                }))
                local.refresh()
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
        if (refCalendar.current) refCalendar.current.value = origVal
    }

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

    const set = (val: IInputCalendarProps, prop?: string) => {
        console.log(`CONSTRUCTOR INPUT ${val.name}`)

        const data = JSON.parse(JSON.stringify(local))
        const mergeData: IInputCalendarProps = Object.assign(
            data, merge(data, val, prop)
        );
        mergeData.refresh = val.refresh
        setLocal(mergeData)

        val.rules?.forEach(rule => {
            setCmpRules((prevVal) => ([...prevVal, rule]))
        })
    }

    const setData = (val: IInputCalendarData, prop: string) => {
        const dataMerge: IInputCalendarData = merge(local.data, val, prop)
        // eslint-disable-next-line no-prototype-builtins
        if (prop === 'value' || val?.hasOwnProperty('value')) {
            setOrigVal(dataMerge.value)
        }
        setLocal((prevVal) => ({ ...prevVal, data: dataMerge }))
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
        local.refresh()
        return expose
    }, [local])

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
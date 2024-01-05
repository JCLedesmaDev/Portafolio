/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import { IInputCalendarProps } from '../interface/index.interface';
import css from './index.module.css'
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { IRules } from '../interface/IRules';

interface IProps {
    props: IInputCalendarProps;
    className?: any;
}

export const InputCalendar: React.FC<IProps> = ({ props, className }) => {

    /// VARIABLES
    const { data, handleChange } = props;

    const refCalendar = useRef<any>()
    const [origVal, setOrigVal] = useState()
    const [local, setLocal] = useState<IInputCalendarProps>({
        data: { value: '', },
        autoComplete: 'false',
        name: '',
        required: false,
        handleChange: () => { }
    })

    const [cmpRules, setCmpRules] = useState<IRules[]>([{
        //fnCondition: (val) => !(props.required && !!val),
        fnCondition: (val) => props.required && !val,
        messageError: 'Este campo es requerido.'
    }])

    /// METODOS

    const initInput = () => {
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
                    ...prevVal,
                    data: {
                        ...prevVal.data, error: true, messageError: rule.messageError
                    }
                }))

                handleChange(props.name, {
                    value: local.data.value,
                    dirty: local.data.dirty,
                    error: true
                })
                break;
            }
            setLocal((prevVal) => ({
                ...prevVal, data: {
                    ...prevVal.data, error: false, messageError: ''
                }
            }))
            handleChange(props.name, {
                value: local.data.value,
                dirty: local.data.dirty,
                error: false
            })
        }
    }

    const update = (evt: any) => {
        const { value } = evt.target;
        setLocal((prevVal) => ({
            ...prevVal,
            data: { ...prevVal.data, value: value, dirty: value !== origVal }
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
        if (refCalendar.current) refCalendar.current.value = ''
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


    useEffect(() => { initInput() }, [])

    useEffect(() => { validateRules() }, [local.data.value])


    return (
        <div className={`${css.container} ${className}`}>
            <div className={css.container__Item}>

                <input type="datetime-local" ref={refCalendar} name={props.name} required={props.required} autoComplete={props.autoComplete} className={defineCSSSelect()} onChange={update} defaultValue={local.data.value} />


                {local.data.dirty && (
                    <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
                )}
            </div>

            <p className={defineCSSMessage()}>{local.data.messageError}</p>

        </div>
    )
}
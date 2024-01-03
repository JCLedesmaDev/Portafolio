/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef, useState } from 'react';
import { ISelectProps, ISelectOptions } from '../interface/index.interface';
import css from './index.module.css'
import { CheckCloseSVG } from '../svg/CheckCloseSVG';
import { IRules } from '../interface/IRules';

interface IProps {
    props: ISelectProps;
    className?: any;
}

export const InputList: React.FC<IProps> = ({ props, className }) => {

    /// VARIABLES
    const { data, handleChange } = props;

    const refSelect = useRef<any>()
    const [origVal, setOrigVal] = useState()
    const [local, setLocal] = useState<ISelectProps>({
        data: {
            value: '',
            dirty: false,
            error: false,
            options: [],
            messageError: '',
        },
        autoComplete: 'false',
        name: '',
        optId: 'id',
        optLbl: 'name',
        placeholder: '',
        required: false,
        icon: undefined,
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
        setLocal((prevVal) => ({
            ...prevVal,
            data: {
                options: prevVal.data.options,
                error: false, value: origVal, dirty: false
            }
        }))
        handleChange(props.name, {
            value: origVal, dirty: false, error: false
        })
        if (refSelect.current) refSelect.current.value = ''
    }

    const defineCSSSelect = () => {
        let style = '';

        if (local.data.value === undefined) return style;
        if (local.data.error) {
            style = css['container__Item--incorrect']
        } else {
            style = css['container__Item--correct']
        }
        return style
    }

    const defineCSSMessage = () => {
        let style = css.container__messageError;

        if (local.data.value === undefined) return style;
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

                {props.icon && (<label className={css.containerItem__iconPrepend}>  {props.icon} </label>)}

                <select id={`select__${props.name}`} ref={refSelect} name={props.name} required={props.required} autoComplete={props.autoComplete} className={defineCSSSelect()} onChange={update} defaultValue={local.data.value}>

                    <option value={''} disabled hidden>
                        {props.placeholder}
                    </option>

                    {local.data.options?.map((opt: ISelectOptions, index: number) => (
                        <option key={index} value={opt[local.optId]}>
                            {opt[local.optLbl]}
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
}
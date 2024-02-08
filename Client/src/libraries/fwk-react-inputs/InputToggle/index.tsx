/* eslint-disable @typescript-eslint/no-explicit-any */
import { IExposeInputToggle, ui } from '@/libraries/index.libraries';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import css from './index.module.css'
import { useMerge } from '@/hooks/useMerge';
import Switch from "react-switch";
import { IInputToggleData, IInputToggleProps } from '../interface/IInputToggle';

interface Props {
    className?: any;
    style?: object;
}

export const InputToggle = forwardRef<IExposeInputToggle, Props>((
    { className, style }, ref
) => {

    /// HOOKS
    const { merge } = useMerge()
    const origVal = useRef<any>()
    const storeUi = ui.useStore()

    const [local, setLocal] = useState<IInputToggleProps>({
        data: { value: false },
        name: '',
        refresh: () => { },
        rules: []
    })

    /// METODOS
    const validateRules = () => {
        for (const rule of local.rules) {
            if (rule.fnCondition(local.data.value)) {
                setLocal((prevVal) => ({
                    ...prevVal, data: {
                        ...prevVal.data, error: true, messageError: rule.messageError
                    }
                }))
                storeUi.actions.showNotify(rule.messageError, 'error')
                break
            } else {
                setLocal((prevVal) => ({
                    ...prevVal, data: {
                        ...prevVal.data, error: false, messageError: ''
                    }
                }))
            }
        }
    }

    const update = (value: any) => {

        setLocal((prevVal) => ({
            ...prevVal,
            data: {
                ...prevVal.data,
                value: value,
                dirty: value !== origVal.current
            }
        }))
    }


    const set = (val: IInputToggleProps, prop?: string) => {
        console.log(`CONSTRUCTOR INPUT TOGGLE ${val.name}`)

        const copyLocal: IInputToggleProps = JSON.parse(JSON.stringify(local))
        const rules = local.rules.concat(val.rules)

        Object.assign(copyLocal, merge(copyLocal, val, prop));
        copyLocal.refresh = val.refresh
        copyLocal.rules = rules

        setLocal(copyLocal)
    }

    const setData = (val: IInputToggleData, prop: string) => {
        const dataMerge: IInputToggleData = merge(local.data, val, prop)

        // eslint-disable-next-line no-prototype-builtins
        if (prop === 'value' || val.hasOwnProperty('value')) {
            origVal.current = dataMerge.value
        }

        setLocal((prevVal) => ({ ...prevVal, data: dataMerge }))
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
        <div className={`${css.container} ${className}`
        } style={style} >
            <Switch
                checked={local.data.value}
                onChange={update}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={25}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={15}
                width={48}
                className="react-switch"
                id="material-switch"
            />
        </div>
    )
})
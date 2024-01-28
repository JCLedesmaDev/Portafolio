/* eslint-disable @typescript-eslint/no-explicit-any */

import { ui } from '@/libraries/index.libraries';
import { useEffect, useRef, useState } from 'react';

interface Props {
    props: ILoadFileProps;
    className?: any;
    style?: object
}

interface ILoadFileProps {
    name: string;
    required: boolean;
    data: ILoadFileData
    rules?: IRules[]
    imageDefault: any
    handleChange: (nameField: string, data: any) => void,
}

interface ILoadFileData {
    value: any;
    dirty?: boolean
    error?: boolean,
}
interface IRules {
    fnCondition: (val: any) => any;
    messageError: string
}



export const LoadFile: React.FC<Props> = ({ props, className, style }) => {
    const { data, handleChange } = props;

    /// HOOKS
    const refFile = useRef<HTMLInputElement>(null)
    const [origVal, setOrigVal] = useState()
    const [fileSelect, setFileSelect] = useState(props.imageDefault);
    const storeUi = ui.useStore()

    const [local, setLocal] = useState<ILoadFileProps>({
        data: { value: '' },
        name: '',
        required: false,
        handleChange: () => { },
        imageDefault: ''
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

        const typeFile = local.data.value.type.split("/").pop()

        for (const rule of cmpRules) {
            if (rule.fnCondition(typeFile)) {
                setLocal((prevVal) => ({
                    ...prevVal, data: { ...prevVal.data, error: true }
                }))
                handleChange(props.name, {
                    value: local.data.value, dirty: local.data.dirty, error: true
                })
                storeUi.actions.showNotify(rule.messageError, 'error')
                break;
            } else {
                setLocal((prevVal) => ({
                    ...prevVal, data: { ...prevVal.data, error: false }
                }))
                handleChange(props.name, {
                    value: local.data.value, dirty: local.data.dirty, error: false
                })
            }
        }
    }

    const update = (evt: any) => {
        const file = evt.target.files[0]
        if (!file) return
        const urlFile = URL.createObjectURL(file)

        setFileSelect(urlFile)
        setLocal((prevVal) => ({
            ...prevVal,
            data: {
                ...prevVal.data,
                value: file,
                dirty: file !== origVal
            }
        }))
    }

    const openInputFile = () => {
        if (refFile.current) refFile.current.click()
    }

    useEffect(() => { initInput() }, [])

    useEffect(() => { validateRules() }, [local.data.value])

    console.log("🚀 ~ props:", props)

    return (<>
        <img src={fileSelect} alt={props.name}
            onClick={openInputFile} style={{ cursor: 'pointer' }}
        />

        <input type="file" ref={refFile} style={{ display: 'none' }} onChange={update} />
    </>)
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ui } from '@/libraries/index.libraries';
import { useEffect, useRef, useState } from 'react';
import { IRules } from './interface/IRules';
import { ILoadFileProps } from './interface/ILoadFile';
import imageDefault from './imageDefault.png'
interface Props {
    props: ILoadFileProps;
    className?: any;
    style?: object
}

export const LoadFile: React.FC<Props> = ({ props, className, style }) => {
    const { data, handleChange } = props;

    /// HOOKS
    const refFile = useRef<HTMLInputElement>(null)
    const [origVal, setOrigVal] = useState()
    const [fileSelect, setFileSelect] = useState(props.imageDefault || imageDefault);
    const storeUi = ui.useStore()

    const [local, setLocal] = useState<ILoadFileProps>({
        data: { value: '' },
        name: '',
        type: 'image',
        required: false,
        handleChange: () => { },
        imageDefault: ''
    })
    const [cmpRules, setCmpRules] = useState<IRules[]>([{
        fnCondition: (val) => props.required && !val,
        messageError: `Este campo ${props.name} es requerido.`
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

    return (
        <div className={className} style={style}>
            <img src={fileSelect} alt={props.name}
                onClick={openInputFile} style={{ cursor: 'pointer' }}
            />

            <input type="file" ref={refFile} style={{ display: 'none' }} onChange={update} />
        </div>
    )
}
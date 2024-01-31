/* eslint-disable @typescript-eslint/no-explicit-any */
import { ui } from '@/libraries/index.libraries';
import { useEffect, useRef, useState } from 'react';
import { IRules } from './interface/IRules';
import { ILoadFileProps } from './interface/ILoadFile';
import { CheckCloseSVG } from './svg/CheckCloseSVG';
import css from './index.module.css'
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
    const storeUi = ui.useStore()

    const [local, setLocal] = useState<ILoadFileProps>({
        data: { value: '' },
        name: '',
        type: 'image',
        required: false,
        handleChange: () => { },
        imageDefault: ''
    })
    const [fileSelect, setFileSelect] = useState(props.data.value || props.imageDefault);
    const [cmpRules, setCmpRules] = useState<IRules[]>([{
        fnCondition: (val) => local.required && !val,
        messageError: `Este campo ${local.name} es requerido.`
    }])

    /// METODOS
    const initInput = () => {
        console.log(`CONSTRUCTOR INPUT ${local.name}`)
        props.rules?.forEach(rule => {
            setCmpRules((prevVal) => ([...prevVal, rule]))
        })
        setOrigVal(data.value)
        setLocal(props)
    }

    const openInputFile = () => {
        if (refFile.current) refFile.current.click()
    }

    const update = (evt: any) => {
        const file = evt.target.files[0]
        if (!file) return

        const isError = validateRules(file)
        if (isError) return

        const urlFile = URL.createObjectURL(file)
        setFileSelect(urlFile)
    }

    const validateRules = (file: any) => {
        const typeFile = file.type?.split("/").pop()

        for (const rule of cmpRules) {
            if (rule.fnCondition(typeFile)) {
                setLocal((prevVal) => ({
                    ...prevVal, data: {
                        ...prevVal.data,
                        error: true
                    }
                }))
                handleChange(local.name, { error: true })
                storeUi.actions.showNotify(rule.messageError, 'error')
                return true
            } else {
                const data = { value: file, dirty: file !== origVal, error: false }
                setLocal((prevVal) => ({ ...prevVal, data }))
                handleChange(local.name, data)
            }
        }
        return false
    }


    const rollback = () => {
        const dirtyFlag = origVal ? undefined : false
        setLocal((prevVal) => ({
            ...prevVal,
            data: { error: false, value: origVal, dirty: dirtyFlag }
        }))
        setFileSelect(origVal)
        handleChange(props.name, {
            error: false, value: origVal, dirty: dirtyFlag
        })
    }

    useEffect(() => { initInput() }, [])

    return (
        <div className={`${css.container} ${className}`} style={style}>

            {local.data.dirty && (
                <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
            )}

            {local.type === 'image' && (
                <img src={fileSelect} alt={local.name}
                    onClick={openInputFile} style={{ cursor: 'pointer' }}
                />
            )}

            {local.type === 'file' && (<>
                <button onClick={openInputFile}>Cargar archivo </button>
                {fileSelect && (
                    <a href={fileSelect} target='_blank'>Abrir archivo </a>
                )}
            </>)}

            <input type="file" ref={refFile} style={{ display: 'none' }} onChange={update} />
        </div>
    )
}
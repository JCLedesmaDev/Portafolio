/* eslint-disable @typescript-eslint/no-explicit-any */
import { ui } from '@/libraries/index.libraries';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { IRules } from './interface/IRules';
import { ILoadFileData, ILoadFileProps } from './interface/ILoadFile';
import { CheckCloseSVG } from './svg/CheckCloseSVG';
import css from './index.module.css'
import { IExposeFile } from './interface/IExposeFile';
import { useMerge } from '@/hooks/useMerge';

interface Props {
    className?: any;
    style?: object;
    required: boolean;
}


export const LoadFile = forwardRef<IExposeFile, Props>((
    { className, style, required }, ref
) => {

    /// HOOKS
    const { merge } = useMerge()
    const refFile = useRef<HTMLInputElement>(null)
    const [origVal, setOrigVal] = useState()
    const storeUi = ui.useStore()

    const [local, setLocal] = useState<ILoadFileProps>({
        data: { value: '' },
        name: '',
        type: 'image',
        required: false,
        imageDefault: '',
        refresh: () => { }
    })
    const [fileSelect, setFileSelect] = useState(local.data.value || local.imageDefault);
    const [cmpRules, setCmpRules] = useState<IRules[]>([{
        fnCondition: (val) => required && !val,
        messageError: `Este campo ${local.name} es requerido.`
    }])

    /// METODOS
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
                local.refresh()
                storeUi.actions.showNotify(rule.messageError, 'error')
                return true
            } else {
                const data = { value: file, dirty: file !== origVal, error: false }
                setLocal((prevVal) => ({ ...prevVal, data }))
                local.refresh()
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
        local.refresh()
    }

    useImperativeHandle(ref, () => ({
        set, setData, props: local
    }), [local])

    const set = (val: ILoadFileProps, prop?: string) => {
        console.log(`CONSTRUCTOR INPUT ${val.name}`)

        const data = JSON.parse(JSON.stringify(local))
        const mergeData: ILoadFileProps = Object.assign(
            data, merge(data, val, prop)
        );
        mergeData.refresh = val.refresh
        setLocal(mergeData)

        val.rules?.forEach(rule => {
            setCmpRules((prevVal) => ([...prevVal, rule]))
        })
    }

    const setData = (val: ILoadFileData, prop: string) => {
        const dataMerge: ILoadFileData = merge(local.data, val, prop)
        // eslint-disable-next-line no-prototype-builtins
        if (prop === 'value' || val?.hasOwnProperty('value')) {
            setOrigVal(dataMerge.value)
        }
        setLocal((prevVal) => ({ ...prevVal, data: dataMerge }))
    }

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
})
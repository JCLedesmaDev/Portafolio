/* eslint-disable @typescript-eslint/no-explicit-any */
import { ui } from '@/libraries/index.libraries';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { ILoadFileData, ILoadFileProps } from './interface/ILoadFile';
import { CheckCloseSVG } from './svg/CheckCloseSVG';
import css from './index.module.css'
import { IExposeFile } from './interface/IExposeFile';
import { useMerge } from '@/hooks/useMerge';

interface Props {
    className?: any;
    style?: object;
}

export const LoadFile = forwardRef<IExposeFile, Props>((
    { className, style }, ref
) => {

    /// HOOKS
    const { merge } = useMerge()
    const refFile = useRef<HTMLInputElement>(null)
    const origVal = useRef<any>()
    const required = useRef(false)
    const imageDefaultView = useRef<any>()
    const storeUi = ui.useStore()

    const [local, setLocal] = useState<ILoadFileProps>({
        data: { value: '' },
        name: '',
        type: 'image',
        required: false,
        imageDefault: '',
        refresh: () => { },
        rules: [{
            fnCondition: (val) => required.current && !val,
            messageError: `Este campo es requerido.`
        }]
    })

    /// METODOS
    const validateRules = (file: any) => {
        const typeFile = file.type?.split("/").pop()

        for (const rule of local.rules) {
            if (rule.fnCondition(typeFile)) {
                setLocal((prevVal) => ({
                    ...prevVal, data: {
                        dirty: false,
                        value: imageDefaultView.current,
                        error: true
                    }
                }))
                storeUi.actions.showNotify(rule.messageError, 'error')
                break
            } else {
                const data = { value: file, dirty: file !== origVal.current, error: false }
                setLocal((prevVal) => ({ ...prevVal, data }))
            }
        }
    }

    const openInputFile = () => {
        if (refFile.current) refFile.current.click()
    }

    const formatFile = (): string => {
        if (typeof local.data.value === 'object') {
            return URL.createObjectURL(local.data.value)
        }
        return local.data.value
    }

    const update = (evt: any) => {
        const file = evt.target.files[0]
        if (!file) return
        validateRules(file)
    }

    const rollback = () => {
        const dirtyFlag = origVal.current ? undefined : false
        setLocal((prevVal) => ({
            ...prevVal,
            data: { error: false, value: origVal.current, dirty: dirtyFlag }
        }))
    }

    const set = (val: ILoadFileProps, prop?: string) => {
        console.log(`CONSTRUCTOR INPUT ${val.name}`)

        const copyLocal: ILoadFileProps = JSON.parse(JSON.stringify(local))
        const rules = local.rules.concat(val.rules)

        if (val.imageDefault) imageDefaultView.current = val.imageDefault
        required.current = val.required

        Object.assign(copyLocal, merge(copyLocal, val, prop));
        copyLocal.refresh = val.refresh
        copyLocal.rules = rules

        setLocal(copyLocal)
    }

    const setData = (val: ILoadFileData, prop: string) => {
        const dataMerge: ILoadFileData = merge(local.data, val, prop)

        if (!val.value && imageDefaultView.current) {
            dataMerge.value = imageDefaultView.current
        }

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

    return (
        <div className={`${css.container} ${className}`} style={style}>

            {local.data.dirty && (
                <CheckCloseSVG className={css.container__Item__iconRollback} rollback={rollback} />
            )}

            {local.type === 'image' && (
                <img src={formatFile()} alt={local.name}
                    onClick={openInputFile} style={{ cursor: 'pointer' }}
                />
            )}

            {local.type === 'file' && (<>
                <button onClick={openInputFile}>Cargar archivo </button>
                {local.data.value && (
                    <a href={local.data.value} target='_blank'>
                        Abrir archivo
                    </a>
                )}
            </>)}

            <input type="file" ref={refFile} style={{ display: 'none' }} onChange={update} />
        </div>
    )
})
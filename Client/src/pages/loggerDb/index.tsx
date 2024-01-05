/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Input, Paginate, ui } from '@/libraries/index.libraries';
import useLoggerDbStore from './store'
import { JSONViewer } from './components/jsonViewer';
import css from './index.module.css'



import Switch from "react-switch";

import { InputList } from '@/libraries/fwk-react-inputs/InputList';
import { useFormCustom } from '@/hooks/index.hooks';
import { IFormData, IFormProps } from './interface/IForm';
import { InputCalendar } from '@/libraries/fwk-react-inputs/inputCalendar';

export const LoggerDB: React.FC = () => {

    const storeUi = ui.useStoreUi()
    const store = useLoggerDbStore()
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)

    const { form, handleChange } = useFormCustom<IFormData>({
        dateFrom: { value: '' },
        dateUntil: { value: '' },
        typeEvent: { value: false },
        limitPage: { value: 10 },
        user: { value: undefined, options: [] },
    })

    const formsProps: IFormProps = {
        dateFrom: {
            data: {
                value: form['dateFrom'].value
            },
            name: 'dateFrom',
            required: true,
            autoComplete: 'off',
            handleChange: handleChange,

        },
        dateUntil: {
            data: { value: form['dateUntil'].value },
            name: 'dateUntil',
            required: true,
            autoComplete: 'off',
            handleChange: handleChange

        },
        typeEvent: {
            handleChange: handleChange,
            data: { value: form['typeEvent'].value },
            name: 'typeEvent',
        },
        user: {
            data: {
                value: form['user'].value,
                options: [
                    { key: 'EEE', value: 'LALALA' },
                    { key: 'a', value: 'Asdasd' }
                ],
            },
            optId: 'key',
            optLbl: 'value',
            placeholder: 'Seleccione un usuario',
            name: 'user',
            required: false,
            autoComplete: 'off',
            handleChange: handleChange
        },
        limitPage: {
            data: { value: form['limitPage'].value },
            type: 'number',
            placeholder: 'Ingrese un numero.',
            name: 'limitPage',
            required: true,
            autoComplete: 'off',
            handleChange: handleChange
        }
    }

    const getAllLoggersDb = (page: number = 1) => {
        console.log("🚀 ~ file: index.tsx:29 ~ form:", form)
        store.actions.getAllLogersDb({
            page,
            limitPage: 20,
            dateFrom: form.dateFrom.value,
            dateUntil: form.dateUntil.value,
            userId: '',//form.user.value,
            typeEvent: !form.typeEvent.value ? 'Evento' : 'Error',
        })
    }

    const changePage = ({ selected }: any) => getAllLoggersDb(selected + 1)
    const handleToggle = (e: any) => handleChange('typeEvent', { value: e })

    useEffect(() => {
        storeUi.actions.setTitleView('Reportes de Logs')
    }, [])

    useEffect(() => {
        const flag = (form.dateFrom.error || form.dateUntil.error || form.user.error) as boolean
        setDisabledBtn(flag)
    }, [form.dateFrom.error, form.dateUntil.error, form.user.error])

    return (
        <main className={css.main}>

            <div className={css.containerNavFilter}>

                <div className={css.navFilterDate}>
                    <h4 > Fecha desde: </h4>
                    <InputCalendar props={formsProps.dateFrom} />
                </div>

                <div className={css.navFilterDate}>
                    <h4 > Fecha hasta: </h4>
                    <InputCalendar props={formsProps.dateUntil} />
                </div>

                <div className={css.navFilterToggle}>
                    <h4>Tipo de Log</h4>
                    <div>
                        <span>Evento</span>
                        <Switch
                            checked={formsProps.typeEvent.data.value}
                            onChange={handleToggle}
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
                        <span>Error</span>
                    </div>
                </div>

                <InputList props={formsProps['user']} className={css.navFilterInputList} />

                <div className={css.navFilterInputNumber}>
                    <h4 > Cant. logs X pag.: </h4>
                    <Input props={formsProps.limitPage} />
                </div>

                <button onClick={() => getAllLoggersDb()}
                    className={css.navFilterBtn}
                    disabled={disabledBtn}
                >
                    Cargar registros
                </button>

            </div>

            <div className={css.containerBoxs}>
                {store.state.loggersDb.length > 0
                    ? store.state.loggersDb.map((doc: any, index: number) => (
                        <div key={index} className={css.box}>
                            <JSONViewer data={doc} key={index} />
                        </div>
                    ))
                    : <h2>Aun no se ha cargado ningun registro</h2>}
            </div>

            {store.state.loggersDb.length > 0 && (<div className={css.containerPaginate}>
                <Paginate
                    btnNextText='Siguiente'
                    btnPreviousText='Anterior'
                    changePage={changePage}
                    pagesTotal={store.state.paginate.pagesTotal}
                    pageActual={store.state.paginate.pageActual}
                />
            </div>)}

        </main>
    )
}
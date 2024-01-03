/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Input, Paginate, ui } from '@/libraries/index.libraries';
import useLoggerDbStore from './store'
import { JSONViewer } from './components/jsonViewer';
import css from './index.module.css'

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import Switch from "react-switch";
import { InputList } from '@/libraries/fwk-react-inputs/InputList';
import { useFormCustom } from '@/hooks/index.hooks';

export const LoggerDB: React.FC = () => {

    const storeUi = ui.useStoreUi()
    const store = useLoggerDbStore()

    const getAllLoggersDb = (page: number = 1) => {
        const fechaHasta = new Date()
        const fechaDesde = new Date(fechaHasta)
        fechaDesde.setDate(fechaDesde.getDate() - 2)
        fechaDesde.setHours(0, 0, 0, 0)

        store.actions.getAllLogersDb({
            page,
            limitPage: 2,
            dateFrom: fechaDesde,
            dateUntil: fechaHasta,
            userId: '658d8d790b4915d7e98c834e',
            typeEvent: '',
        })
    }

    const changePage = ({ selected }: any) => {
        console.log("🚀 ~ selected:", selected)
        //getAllLoggersDb(selected + 1)
    }

    const [toggleState, setToggle] = useState(false)
    const handleToggle = () => {
        setToggle(!toggleState)
    };


    const { form, handleChange } = useFormCustom<any>({
        userList: { value: undefined, dirty: false, error: false },
    })
    console.log("🚀 ~ file: index.tsx:51 ~ form:", form)

    useEffect(() => {
        storeUi.actions.setTitleView('Logger DB')
        getAllLoggersDb()
    }, [])


    return (
        <main className={css.main}>
            <h3 className='sub-section-title'>Registros de Logs</h3>

            <div>
                {/*<div>
                    <label > Fecha desde: </label>
                    <DatePicker
                        onChange={(e: any) => console.log(e)}
                        value={new Date()}
                        monthPlaceholder="asdasd"
                    />
                </div>
                <div>
                    <label > Fecha hasta: </label>
                    <DatePicker
                        onChange={(e: any) => console.log(e)}
                        value={new Date()}
                        calendarAriaLabel="asdasd"
                    />
                </div>

                <label htmlFor="material-switch">
                    <span>Toggle wacho</span>
                    <Switch
                        checked={toggleState}
                        onChange={handleToggle}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                    />
                </label>*/}

                <div style={{ width: '220px' }}>
                    <Input props={{
                        data: { value: undefined },
                        placeholder: 'Ingrese usuario',
                        type: 'email',
                        name: 'email',
                        required: true,
                        autoComplete: 'off',
                        handleChange: () => { }
                    }} />
                </div>

                <div style={{ width: '220px' }}>
                    <InputList props={{
                        data: {
                            value: form['userList'].value,
                            options: [
                                { key: 'EEE', value: 'LALALA' },
                                { key: 'a', value: 'Asdasd' }
                            ],
                            messageError: 'asdqwd error'
                        },
                        optId: 'key',
                        optLbl: 'value',
                        placeholder: 'Seleccione un usuario',
                        name: 'userList',
                        required: true,
                        autoComplete: 'off',
                        handleChange
                    }} />
                </div>

            </div>


            {/* PROBAANDO */}

            <div className={css.containerBoxs}>
                {store.state.loggersDb.map((doc: any, index: number) => (
                    <div key={index} className={css.box}>
                        <JSONViewer data={doc} key={index} />
                    </div>
                ))}
            </div>

            <div>
                <Paginate
                    btnNextText='Siguiente'
                    btnPreviousText='Anterior'
                    changePage={changePage}
                    pagesTotal={store.state.paginate.pagesTotal}
                    pageActual={store.state.paginate.pageActual}
                />
            </div>
        </main>
    )
}
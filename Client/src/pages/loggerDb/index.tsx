/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Paginate, ui } from '@/libraries/index.libraries';
import useLoggerDbStore from './store'
import { JSONViewer } from './components/jsonViewer';
import css from './index.module.css'

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import Switch from "react-switch";

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


    useEffect(() => {
        storeUi.actions.setTitleView('Logger DB')
        getAllLoggersDb()
    }, [])


    return (
        <main className={css.main}>
            <h3 className='sub-section-title'>Registros de Logs</h3>

            <div>
                <div>
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
                </label>
            </div>




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
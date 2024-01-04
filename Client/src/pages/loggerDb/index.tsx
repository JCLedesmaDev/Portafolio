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
import { IFormData, IFormProps } from './interface/IForm';

export const LoggerDB: React.FC = () => {

    const storeUi = ui.useStoreUi()
    const store = useLoggerDbStore()


    const { form, handleChange } = useFormCustom<IFormData>({
        user: { value: undefined, dirty: false, error: false, options: [] },
        countPerPage: { value: undefined, dirty: false, error: false },
    })

    const formsProps: IFormProps = {
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
            required: true,
            autoComplete: 'off',
            handleChange: handleChange
        },
        countPerPage: {
            data: {
                value: form['countPerPage'].value,
            },
            type: 'number',
            placeholder: '',
            name: 'countPerPage',
            required: false,
            autoComplete: 'off',
            handleChange: handleChange
        }
    }



    const fechaHasta = new Date()
    const fechaDesde = new Date(fechaHasta)
    fechaDesde.setDate(fechaDesde.getDate() - 2)
    fechaDesde.setHours(0, 0, 0, 0)




    const getAllLoggersDb = (page: number = 1) => {

        store.actions.getAllLogersDb({
            page,
            limitPage: 10,
            dateFrom: fechaDesde,
            dateUntil: fechaHasta,
            //userId: '658d8d790b4915d7e98c834e',
            userId: '',
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
        storeUi.actions.setTitleView('Reportes de Logs')
        getAllLoggersDb()
    }, [])

    return (
        <main className={css.main}>

            <div className={css.containerNavFilter}>

                <div className={css.navFilterDate}>
                    <h4 > Fecha desde: </h4>
                    <DatePicker
                        onChange={(e: any) => console.log(e)}
                        value={fechaDesde}
                    />
                </div>

                <div className={css.navFilterDate}>
                    <h4 > Fecha hasta: </h4>
                    <DatePicker
                        onChange={(e: any) => console.log(e)}
                        value={fechaHasta}
                    />
                </div>

                <div className={css.navFilterToggle}>
                    <h4>Tipo de Log</h4>
                    <div>
                        <span>Evento</span>
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
                        <span>Error</span>
                    </div>
                </div>

                {/*<div className={css.navFilterInput}>
                    <h4>Cant. Logs por pagina</h4>
                    <Input props={formsProps['countPerPage']} />
                </div>*/}

                <InputList props={formsProps['user']} className={css.navFilterInputList} />

                <button className={css.navFilterBtn}>
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

            {/*store.state.loggersDb.length > 0 &&*/}

            <Paginate
                btnNextText='Siguiente'
                btnPreviousText='Anterior'
                changePage={changePage}
                pagesTotal={store.state.paginate.pagesTotal}
                pageActual={store.state.paginate.pageActual}
            />
        </main>
    )
}
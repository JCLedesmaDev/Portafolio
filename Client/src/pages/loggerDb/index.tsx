/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Paginate, ui } from '@/libraries/index.libraries';
import useLoggerDbStore from './store'
import { JSONViewer } from './JSONViewer';
import css from './index.module.css'

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
            limitPage: 10,
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

    useEffect(() => {
        storeUi.actions.setTitleView('Logger DB')
        getAllLoggersDb()
    }, [])

    return (
        <main className={css.main}>
            <h3 className='sub-section-title'>Registros de Logs</h3>

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
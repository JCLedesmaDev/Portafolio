/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Paginate, ui } from '@/libraries/index.libraries';
import useLoggerDbStore from './store'
import { JSONViewer } from './JSONViewer';
import css from './index.module.css'

export const LoggerDB: React.FC = () => {

    const storeUi = ui.useStoreUi()
    const store = useLoggerDbStore()

    const changePage = ({ selected }: any) => {
        console.log("🚀 ~ file: index.tsx:15 ~ changePage ~ selected:", selected)
        //    window.scrollTo(0, 0);
        //    //getAllAlbumCollections(selected + 1)
    }

    useEffect(() => {
        storeUi.actions.setTitleView('Logger DB')
        store.actions.getAllLogersDb()
    }, [])

    return (
        <main className={css.main}>
            <h3 className='sub-section-title'>Registros de Logs</h3>

            <div className={css.containerBoxs}>
                {store.state.loggersDb.map((doc: any, index: number) => (
                    <div className={css.box}>
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
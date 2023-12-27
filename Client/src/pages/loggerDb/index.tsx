/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { ui } from '@/libraries/index.libraries';
import useLoggerDbStore from './store'
import { JSONViewer } from './JSONViewer';
import css from './index.module.css'

export const LoggerDB: React.FC = () => {

    const storeUi = ui.useStoreUi()
    const store = useLoggerDbStore()

    useEffect(() => {
        storeUi.actions.setTitleView('Logger DB')
        store.actions.getAllLogersDb()
    }, [])

    return (
        <main className={css.main}>
            <h3 className='sub-section-title'>Registros de Logs</h3>

            <div className={css.containerBoxs}>
                {store.state.loggersDb.map((doc: any, index: number) => (
                    <JSONViewer data={doc} key={index} />
                ))}
            </div>
        </main>
    )
}
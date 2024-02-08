/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import useLoggerDbStore from './store'
import { JSONViewer } from './components/jsonViewer';
import css from './index.module.css'
import useAppStore from '@/appStore'
import { IExposeInput, IExposeInputCalendar, IExposeInputList, InputText, InputList, InputCalendar, InputToggle, Paginate, ui, IExposeInputToggle } from '@/libraries/index.libraries';
import { IFormProps } from './interface/IForm';
import { initBindingForm } from '@/utils/index.utils';

export const LoggerDB: React.FC = () => {

    /// HOOKS
    const storeUi = ui.useStore()
    const store = useLoggerDbStore()
    const appStore = useAppStore()
    const [disabledBtn, setDisabledBtn] = useState<boolean>(false)

    /// VARIABLES
    const refs = {
        dateFrom: useRef<IExposeInputCalendar>(null),
        dateUntil: useRef<IExposeInputCalendar>(null),
        limitPage: useRef<IExposeInput>(null),
        user: useRef<IExposeInputList>(null),
        typeEvent: useRef<IExposeInputToggle>(null),
    }
    const formProps: IFormProps = {
        dateFrom: {
            data: { value: '' },
            name: 'dateFrom',
            required: true,
            autoComplete: 'off',
            rules: [],
            refresh: appStore.actions.forzedRender
        },
        dateUntil: {
            data: { value: '' },
            name: 'dateUntil',
            required: true,
            autoComplete: 'off',
            rules: [],
            refresh: appStore.actions.forzedRender
        },
        typeEvent: {
            data: { value: false },
            name: 'typeEvent',
            rules: [],
            refresh: appStore.actions.forzedRender
        },
        user: {
            data: { value: '', options: store.state.users },
            //data: {
            //    value: form['user'].value, options: [...store.state.users, {
            //        "id": "658d8d790b4915d7e98c839e",
            //        "email": "admin@gmail.com",
            //        "projectsList": [],
            //        "skillsList": []
            //    }]
            //},
            optId: 'id',
            optLbl: 'email',
            placeholder: 'Seleccione un usuario',
            name: 'user',
            required: false,
            autoComplete: 'off',
            rules: [],
            refresh: appStore.actions.forzedRender
        },
        limitPage: {
            data: { value: 10 },
            type: 'number',
            placeholder: 'Ingrese un numero.',
            name: 'limitPage',
            required: true,
            autoComplete: 'off',
            rules: [],
            refresh: appStore.actions.forzedRender
        }
    }

    /// METODOS
    const changePage = ({ selected }: any) => getAllLoggersDb(selected + 1)

    const getAllLoggersDb = (page: number = 1) => {
        store.actions.getAllLoggersDb({
            page,
            limitPage: refs.limitPage.current?.props.data.value,
            dateFrom: refs.dateFrom.current?.props.data.value,
            dateUntil: refs.dateUntil.current?.props.data.value,
            userId: refs.user.current?.props.data.value,
            typeEvent: !refs.typeEvent.current?.props.data.value ? 'Evento' : 'Error',
        })
    }

    useEffect(() => {
        storeUi.actions.setTitleView('Reportes de Logs')
        store.actions.getAllUsers().then(() => {
            initBindingForm(refs, formProps)
        })
    }, [])

    useEffect(() => {
        const flag = (
            refs.dateFrom.current?.props.data.error || refs.dateUntil.current?.props.data.error || refs.user.current?.props.data.error || refs.limitPage.current?.props.data.error
        ) as boolean
        setDisabledBtn(flag)
    }, [
        refs.dateFrom.current?.props, refs.dateUntil.current?.props,
        refs.user.current?.props, refs.limitPage.current?.props
    ])

    return (
        <main className={css.main}>

            <div className={css.containerNavFilter}>

                <div className={css.navFilterDate}>
                    <h4 > Fecha desde: </h4>
                    <InputCalendar ref={refs.dateFrom} />
                </div>

                <div className={css.navFilterDate}>
                    <h4 > Fecha hasta: </h4>
                    <InputCalendar ref={refs.dateUntil} />
                </div>

                <div className={css.navFilterToggle}>
                    <h4>Tipo de Log</h4>
                    <div>
                        <span>Evento</span>
                        <InputToggle ref={refs.typeEvent} />
                        <span>Error</span>
                    </div>
                </div>

                <InputList ref={refs.user} className={css.navFilterInputList} />

                <div className={css.navFilterInputNumber}>
                    <h4 > Cant. logs X pag.: </h4>
                    <InputText ref={refs.limitPage} />
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
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import loading from './spinner.gif'
import css from './index.module.css'
import ReactDOM from 'react-dom/client'
import storeLoader, { useStoreLoader } from './store'

const initializateLoader = (ref: any) => {
    const root = ReactDOM.createRoot(ref.current as any)
    root.render(<Loader />)
}

const showLoader = (message: string = '') => {
    storeLoader.getState().actions.showLoader(message)
}
const closeLoader = () => {
    storeLoader.getState().actions.closeLoader()
}

const Loader: React.FC = () => {
    const store = useStoreLoader()

    useEffect(() => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        if (store.state.show) {
            $body.style.overflowY = "hidden";
        } else {
            $body.style.overflowY = "scroll";
        }
    }, [store.state.show])

    return (
        store.state.show ? (
            <div className={css.skeletom}>
                <div className={css.card}>
                    <img className={css.spinnerGif} src={loading} />
                    <div> {store.state.message}</div>
                </div>
            </div >
        ) : null
    )
}

export default {
    initializateLoader,
    showLoader,
    closeLoader
}
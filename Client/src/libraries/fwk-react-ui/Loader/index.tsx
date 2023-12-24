/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import loading from './spinner.gif'
import css from './index.module.css'
import ReactDOM from 'react-dom/client'
import { useStoreUi } from '../store'

const initializateLoader = (ref: React.MutableRefObject<HTMLDivElement>) => {
    const $loader = ref.current
    const root = ReactDOM.createRoot($loader as any)
    root.render(<Loader />)
}

const Loader: React.FC = () => {
    const store = useStoreUi()

    useEffect(() => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        const $loader = document.getElementById("loader") as HTMLBodyElement;

        if (store.state.show) {
            $body.style.overflowY = "hidden";
            $loader.style.position = 'absolute'
            $loader.style.width = '100%';
            $loader.style.height = '100%';
            $loader.style.backgroundColor = 'rgba(0, 0, 0, 0.296)';

            $loader.style.display = 'flex'
            $loader.style.justifyContent = 'center'
            $loader.style.alignItems = 'center'
            $loader.style.zIndex = '1000000';
        } else {
            $body.style.overflowY = "scroll";
            $loader.style.display = 'none'
        }
    }, [store.state.show])

    return (
        store.state.show ? (
            <div className={css.container}>
                <img className={css.spinnerGif} src={loading} />
                <div> {store.state.message}</div>
            </div>
        ) : null
    )
}

export default { initializateLoader }
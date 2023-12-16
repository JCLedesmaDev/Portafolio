/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';


interface ToastIndexSignature {
    [key: string]: any;
}

const optionsDef: ToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
}

const showNotify = (message: string, type: string, options: ToastOptions = {}) => {
    //type TypeToast = 'success' | 'info' | 'warning' | 'error'
    const myToast: ToastIndexSignature = toast;
    const opt = { ...optionsDef, ...options }

    myToast[type](message, opt)
}

const initializateNotify = (ref: React.MutableRefObject<HTMLDivElement>) => {
    const root = ReactDOM.createRoot(ref.current as any)
    root.render(<ToastContainer />)
}


export default {
    initializateNotify,
    showNotify,
}
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export const showNotify = () => {
    toast.success('EEEE')
}

export const createNotify = () => {
    const toastContainerRoot = document.createElement('div');
    toastContainerRoot.id = 'toast-container-root';


    const root = ReactDOM.createRoot(toastContainerRoot)
    root.render(
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    )
}
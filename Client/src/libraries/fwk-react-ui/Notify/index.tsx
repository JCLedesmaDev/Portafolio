/* eslint-disable @typescript-eslint/no-explicit-any */
import { ToastContainer } from "react-toastify";
import ReactDOM from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';


const initializateNotify = (ref: React.MutableRefObject<HTMLDivElement>) => {
    const root = ReactDOM.createRoot(ref.current as any)
    root.render(<ToastContainer />)
}

export default { initializateNotify }
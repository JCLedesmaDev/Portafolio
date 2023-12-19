import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import produce from 'immer'
import { ToastOptions, toast } from "react-toastify";

interface IStore {
    state: {
        show: boolean;
        message?: string;
        titleView: string;
    },
    actions: {
        showLoader: (newMessage?: string) => void;
        closeLoader: () => void;
        showNotify: (newMessage: string, type: string, options?: ToastOptions) => void;
        setTitleView: (newTitle: string) => void;
    }
}

const storeUi = createWithEqualityFn<IStore>((set) => ({
    state: {
        show: false,
        titleView: ''
    },
    actions: {
        showLoader: (newMessage: string = 'Espere por favor...') => {
            set(produce((store: IStore) => {
                store.state.message = newMessage
                store.state.show = true
            }))
        },
        closeLoader: () => {
            set(produce((store: IStore) => {
                store.state.show = false
            }))
        },
        showNotify: (newMessage: string, type: string, options: ToastOptions = {}) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            interface ToastIndexSignature { [key: string]: any }

            const myToast: ToastIndexSignature = toast;
            const opt = {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
                theme: "light",
                ...options
            }
            myToast[type](newMessage, opt)
        },
        setTitleView: (newTitle: string) => {
            console.log("🚀 ~ setTitleVie:", newTitle)
            set(produce((store: IStore) => {
                store.state.titleView = newTitle
            }))
        }
    }
}), shallow)


export const useStoreUi = () => ({ ...storeUi((state) => (state)) })
export default storeUi


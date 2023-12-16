import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import produce from 'immer'

interface IStore {
    state: { show: boolean; message?: string; },
    actions: {
        showLoader: (message: string) => void;
        closeLoader: () => void;
    }
}

const storeLoader = createWithEqualityFn<IStore>((set, get) => ({
    state: { show: false, message: 'Espere por favor...' },
    actions: {
        showLoader: (message: string) => {
            set(produce((store: IStore) => {
                if (message) store.state.message = message
                store.state.show = true
            }))
        },
        closeLoader: () => {
            set(produce((store: IStore) => {
                store.state.show = false
            }))
        },
    }
}), shallow)


export const useStoreLoader = () => ({ ...storeLoader((state) => (state)) })
export default storeLoader


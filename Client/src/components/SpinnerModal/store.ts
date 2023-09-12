import { create, } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'


export interface ISpinnerModels {
    status: boolean;
    showSpinner: boolean;
    message: string;
}

interface IStore {
    state: {
        status: boolean;
        showSpinner: boolean;
        message: string;
    },
    actions: {
        setSpinnerModal: (newObjStatus: ISpinnerModels) => void;
    }
}

const storeSpinner = create<IStore>((set) => ({
    state: {
        showSpinner: false,
        status: false,
        message: ''
    },
    actions: {
        setSpinnerModal: (newObjStatus: ISpinnerModels) => {
            set(produce((store: IStore) => {
                store.state = {
                    ...store.state,
                    ...newObjStatus
                }
            }))
        },
    }
}))


export const useStoreSpinner = () => ({
    ...storeSpinner((state) => (state), shallow)
})
export default storeSpinner
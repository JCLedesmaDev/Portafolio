import { create, } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'


export interface ISpinnerPopup {
    status: boolean;
    show: boolean;
    message: string;
}

interface IStore {
    state: {
        status: boolean;
        show: boolean;
        message: string;
    },
    actions: {
        setSpinnerPopup: (newObjStatus: ISpinnerPopup) => void;
    }
}

const storeSpinner = create<IStore>((set) => ({
    state: {
        show: false,
        status: false,
        message: ''
    },
    actions: {
        setSpinnerPopup: (newObjStatus: ISpinnerPopup) => {
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
import { create, } from "zustand";
import { shallow } from "zustand/shallow";
import produce from 'immer'
import { ISpinnerModels } from "../../models/ISpinner.models";



interface IStore {
    readonly state: {
        spinnerModal: ISpinnerModels;
        showPopup: boolean;
    },
    actions: {
        setSpinnerModal: (newObjStatus: ISpinnerModels) => void;
        setShowPopup: (newStatus: boolean) => void;
    }
}

const storeSpinner = create<IStore>((set) => ({
    state: {
        spinnerModal: {} as ISpinnerModels,
        showPopup: false
    },
    actions: {
        setSpinnerModal: (newObjStatus: ISpinnerModels) => {
            set(produce((store: IStore) => {
                store.state.spinnerModal = { ...store.state.spinnerModal, ...newObjStatus }
            }))
        },
        setShowPopup: (newStatus: boolean) => {
            set(produce((store: IStore) => {
                store.state.showPopup = newStatus
            }))
        },
    }
}))


export const useAppStore = () => ({ ...storeSpinner((state) => (state), shallow) })
export default storeSpinner
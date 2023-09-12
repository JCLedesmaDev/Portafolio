import produce from "immer";
import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { IUserModels } from "../models/index.models";
import { magnamentStorage } from "../utils";


// export interface IFilterSearch {
//     page: number;
//     filterText?: string
// }

// interface IPagination {
//     totalPages: number;
//     currentPage: number;
// }

interface IStore {
    readonly state: {
        user: IUserModels;
    },
    actions: {
        setUser: (user: IUserModels) => void
    }
}

const appStore = create<IStore>((set) => ({
    state: {
        user: magnamentStorage.get<IUserModels>("User") ?? {} as IUserModels,
    },
    actions: {
        setUser: (user: IUserModels) => {
            magnamentStorage.set("User", user)
            set(produce((store: IStore) => {
                store.state.user = user
            }))
        }
    }
}))


export const useAppStore = () => ({ ...appStore((state) => (state), shallow) })
export default appStore
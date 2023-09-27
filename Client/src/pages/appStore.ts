import produce from "immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { IUserModels } from "@/models/index.models";
import { magnamentStorage } from "@/utils/index.utils";
// import  {} from ""

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

const appStore = createWithEqualityFn<IStore>((set) => ({
    state: {
        user: magnamentStorage.get<IUserModels>("user") ?? {} as IUserModels,
    },
    actions: {
        setUser: (user: IUserModels) => {
            magnamentStorage.set("User", user)
            set(produce((store: IStore) => {
                store.state.user = user
            }))
        }
    }
}), shallow)


export const useAppStore = () => ({ ...appStore((state) => (state)) })
export default appStore
import produce from "immer";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { apiSrv } from "@/libraries/index.libraries";
import { magnamentStorage } from "@/utils/index.utils";
import { IUserModel } from '@/models/index.models';
import mapper from '@/mappers/index.mappers'

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
        user: IUserModel;
    },
    actions: {
        setUser: (user: IUserModel) => void;
        logOut: () => void;
    }
}

const appStore = createWithEqualityFn<IStore>((set, get) => ({
    state: {
        user: magnamentStorage.get<IUserModel>("user") ?? {} as IUserModel,
    },
    actions: {
        setUser: (user: IUserModel) => {
            magnamentStorage.set("User", user)
            set(produce((store: IStore) => {
                store.state.user = user
            }))
        },
        getUser: async () => {
            const res = await apiSrv.callBackEnd({
                preCallback: async () => {
                    return await apiSrv.callSrv({
                        method: 'GET',
                        path: '/users/getUser'
                    })
                },
                options: { loader: true }
            })

            const userAdapted: IUserModel = mapper.user(res.user);
            get().actions.setUser(userAdapted)
        },
        logOut: async () => {
            await apiSrv.callBackEnd({
                preCallback: async () => {
                    return await apiSrv.callSrv({
                        method: 'GET',
                        path: '/users/logOut'
                    })
                },
                options: { loader: true }
            })
            magnamentStorage.remove("user");
        }
    },
}), shallow)


export const useAppStore = () => ({ ...appStore((state) => (state)) })
export default appStore
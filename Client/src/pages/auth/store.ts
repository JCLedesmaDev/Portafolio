/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
// import produce from 'immer'

// import { userMapper } from "./mappers";
// import { IUserModels } from "../../models/IUser.models";
import { apiSrv } from "@/utils/index.utils";
// import appStore from "../appStore";
// import { ILoginDto } from "./interface/frontToBack/ILogin.dto";
// import { IFormRegister, IRegisterDto } from "./interface/frontToBack/IRegister.dto";

interface IStore {
    readonly state: {
        // loginFormActive: boolean;
        // registerFormActive: boolean;
        // styleForm: string;
    },
    actions: {
        // setLoginFormActive: (newState: boolean) => void;
        // setRegisterFormActive: (newState: boolean) => void;
        // changeStyleForm: () => void
        login: (payload: any) => Promise<boolean>
        getUser: () => Promise<any>
        // login: (payload: ILoginDto) => Promise<boolean>
        // register: (payload: IRegisterDto) => Promise<boolean>
    }
}

const store = createWithEqualityFn<IStore>((set, get) => {
    console.log("🚀 ~ file: store.ts:28 ~ store ~ get:", get)
    console.log("🚀 ~ file: store.ts:28 ~ store ~ set:", set)
    return {
        state: {
            // loginFormActive: true,
            // registerFormActive: false,
            // styleForm: '',
        },
        actions: {
            // setLoginFormActive: (newState: boolean) => set(produce(
            //     (store: IStore) => {
            //         store.state.loginFormActive = newState
            //     })
            // ),
            // setRegisterFormActive: (newState: boolean) => set(produce(
            //     (store: IStore) => {
            //         store.state.registerFormActive = newState
            //     })
            // ),
            // changeStyleForm: () => {
            //     let style = (get().state.loginFormActive && !get().state.registerFormActive)
            //         ? 'containerPage__Auth--loginActive'
            //         : 'containerPage__Auth--registerActive'

            //     set(produce((store: IStore) => {
            //         store.state.styleForm = style
            //     }))
            // },
            login: async (payload: any) => {
                let flagIsLogin = false

                const res = await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/users/login',
                        data: payload
                    })
                }, { loader: true })

                if (res.info.type === 'error') return flagIsLogin
                flagIsLogin = true

                // const userAdapted: IUserModels = userMapper(res.info.data);
                // appStore.getState().actions.setUser(userAdapted)
                return flagIsLogin
            },
            getUser: async () => {
                await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'GET',
                        path: '/users/getUser'
                    })
                }, { loader: true })
            },
            // register: async (payload: IRegisterDto) => {
            //     let flagIsRegister = false

            //     const res = await apiSrv.callBackend(async () => {
            //         return await apiSrv.callSrv({
            //             method: 'POST',
            //             path: '/users/register',
            //             data: payload
            //         })
            //     }, { loader: true, status: true })

            //     if (res.info.type === 'error') return flagIsRegister
            //     flagIsRegister = true

            //     return flagIsRegister
            // }
        }
    }
}, shallow)

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
// export const useAuthUserStore = () => ({ ...store((state:IStore) => (state), shallow) })
export default store

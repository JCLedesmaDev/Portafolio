/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
// import produce from 'immer'

// import { userMapper } from "./mappers";
// import { IUserModels } from "../../models/IUser.models";
import { apiSrv } from "@/libraries/index.libraries";
import { ILoginDtoRequest } from './interface/ILogin.dto';
// import appStore from "../appStore";


interface IStore {
    //readonly state: {},
    actions: {
        login: (payload: ILoginDtoRequest) => Promise<boolean>
        getUser: () => Promise<any>
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const store = createWithEqualityFn<IStore>((set, get) => {

    return {
        //state: {
        // loginFormActive: true,
        // registerFormActive: false,
        // styleForm: '',
        //},
        actions: {
            login: async (payload: ILoginDtoRequest) => {
                const res = await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/users/login',
                        data: payload
                    })
                }, { loader: true })

                // const userAdapted: IUserModels = userMapper(res.info.data);
                // appStore.getState().actions.setUser(userAdapted)
                return res
            },
            getUser: async () => {
                await apiSrv.callBackend(async () => {
                    return await apiSrv.callSrv({
                        method: 'GET',
                        path: '/users/getUser'
                    })
                }, { loader: true })
            },
        }
    }
}, shallow)

// Utilizamos "shallow" para poder comparar a nivel atomico los {} y []
// export const useAuthUserStore = () => ({ ...store((state:IStore) => (state), shallow) })
export default store

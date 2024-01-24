/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import { ILoginDtoRequest } from './interface/ILoginRequest.dto';
import mapper from '@/mappers/index.mappers'
import { IUserModel } from '@/models/IUser.model';
import appStore from "@/appStore";

interface IStore {
    actions: {
        login: (payload: ILoginDtoRequest) => Promise<boolean>
    }
}

const store = createWithEqualityFn<IStore>(() => {
    return {
        actions: {
            login: async (userData: ILoginDtoRequest) => {
                const res = await apiSrv.callBackEnd({
                    preCallback: async () => {
                        return await apiSrv.callSrv({
                            method: 'POST',
                            path: '/users/login',
                            data: userData
                        })
                    },
                    options: { loader: true }
                })

                const userAdapted: IUserModel = mapper.singleUser(res.user);
                appStore.getState().actions.setUser(userAdapted)
                return res
            }
        }
    }
}, shallow)

//export const useAuthStore = () => ({ ...store((state) => (state)) })
export default store

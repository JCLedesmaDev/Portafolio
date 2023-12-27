/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import { ILoginDtoRequest } from './interface/ILoginRequest.dto';
import mapper from '@/mappers/index.mappers'
import { IUserModel } from '@/models/IUser.model';
import appStore from "@/appStore";
import { magnamentStorage } from '@/utils/index.utils';

interface IStore {
    actions: {
        getRegisterLogger: () => Promise<boolean>
    }
}

const store = createWithEqualityFn<IStore>((set, get) => {
    return {
        actions: {
            getRegisterLogger: async () => {
                //const res = await apiSrv.callBackEnd({
                //    preCallback: async () => {
                //        return await apiSrv.callSrv({
                //            method: 'POST',
                //            path: '/users/login',
                //            data: payload
                //        })
                //    },
                //    options: { loader: true }
                //})

                //const userAdapted: IUserModel = mapper.user(res.user);
                //magnamentStorage.set('user', userAdapted)
                //appStore.getState().actions.setUser(userAdapted)

                //return res
            }
        }
    }
}, shallow)

export default store

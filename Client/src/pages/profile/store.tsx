/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import mapper from '@/mappers/index.mappers'
import { IUserModel } from '@/models/IUser.model';
import { IUpdateUserDtoRequest } from './interface/IUpdateUserRequest.dto';
import appStore from "@/appStore";

interface IStore {
    actions: {
        updateUser: (usrData: IUpdateUserDtoRequest) => Promise<boolean>
    }
}

const store = createWithEqualityFn<IStore>((set, get) => ({
    actions: {
        updateUser: async (usrData: IUpdateUserDtoRequest) => {
            const res = await apiSrv.callBackEnd({
                preCallback: async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/users/updateUser',
                        data: usrData
                    })
                },
                options: { loader: true }
            })

            const userAdapted: IUserModel = mapper.singleUser(res.user);
            appStore.getState().actions.setUser(userAdapted)
            return res
        }
    }
}), shallow)

export default store


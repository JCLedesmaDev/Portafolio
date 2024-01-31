/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import mapper from '@/mappers/index.mappers'
import { IUserModel } from '@/models/IUser.model';
import appStore from "@/appStore";

interface IStore {
    actions: {
        updateUser: (usrData: FormData) => Promise<boolean>
    }
}

const store = createWithEqualityFn<IStore>(() => ({
    actions: {
        updateUser: async (usrData: FormData) => {
            const res = await apiSrv.callBackEnd({
                preCallback: async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/users/updateUser',
                        data: usrData
                    })
                },
                options: { loader: true, status: true }
            })

            const userAdapted: IUserModel = mapper.singleUser(res.user);
            appStore.getState().actions.setUser(userAdapted)
            return res
        }
    }
}), shallow)

export default store


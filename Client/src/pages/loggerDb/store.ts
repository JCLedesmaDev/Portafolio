/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import produce from "immer";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import mapper from '@/mappers/index.mappers'
import { ILoggerDB } from '@/models/ILoggerDB.model';

interface IStore {
    state: {
        loggersDb: ILoggerDB[]
    }
    actions: {
        setLoggersDb: (loggers: ILoggerDB[]) => void;
        getAllLogersDb: () => Promise<boolean>
    }
}

const store = createWithEqualityFn<IStore>((set, get) => ({
    state: {
        loggersDb: []
    },
    actions: {
        setLoggersDb: (loggers: ILoggerDB[]) => {
            set(produce((store: IStore) => {
                store.state.loggersDb = loggers
            }))
        },
        getAllLogersDb: async () => {
            const res = await apiSrv.callBackEnd({
                preCallback: async () => {
                    return await apiSrv.callSrv({
                        method: 'GET',
                        path: '/loggerDb/getAll'
                    })
                },
                options: { loader: true }
            })
            console.log("🚀 ~ file: store.ts:34 ~ getAllLogersDb: ~ res:", res)

            const loggersAdapted: ILoggerDB[] = mapper.registerLoggers(
                res.user
            );
            get().actions.setLoggersDb(loggersAdapted)
            return res
        }
    }
}), shallow)

export default store

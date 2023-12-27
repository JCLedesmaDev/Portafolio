/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import produce from "immer";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import mapper from '@/mappers/index.mappers'
import { ILoggerDB } from '@/models/ILoggerDB.model';

export interface IFilterSearch {
    page: number;
    filterText?: string
}
interface IPagination {
    pagesTotal: number;
    pageActual: number;
}

interface IStore {
    state: {
        loggersDb: ILoggerDB[],
        paginate: IPagination
    }
    actions: {
        setLoggersDb: (loggers: ILoggerDB[]) => void;
        setPaginate: (data: IPagination) => void
        getAllLogersDb: () => Promise<boolean>
    }
}

const store = createWithEqualityFn<IStore>((set, get) => ({
    state: {
        loggersDb: [],
        paginate: {
            pagesTotal: 0,
            pageActual: 0
        }
    },
    actions: {
        setLoggersDb: (loggers: ILoggerDB[]) => {
            set(produce((store: IStore) => {
                store.state.loggersDb = loggers
            }))
        },
        setPaginate: (data: any) => {
            set(produce((store: IStore) => {
                store.state.paginate = {
                    pageActual: data.currentPage - 1,
                    pagesTotal: data.totalPages
                }
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
            const loggersAdapted: ILoggerDB[] = mapper.loggerDb(res.docs);
            get().actions.setLoggersDb(loggersAdapted)
            get().actions.setPaginate(res)

            return res
        }
    }
}), shallow)

export default store

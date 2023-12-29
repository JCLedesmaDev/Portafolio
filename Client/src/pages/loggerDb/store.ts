/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import produce from "immer";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import mapper from '@/mappers/index.mappers'
import { ILoggerDB } from '@/models/ILoggerDB.model';
import { IPagination } from '@/interface/IPagination';
import { IFilterPaginationDb } from './interface/IFilterPaginationDb';



interface IStore {
    state: {
        loggersDb: ILoggerDB[],
        paginate: IPagination
    }
    actions: {
        setLoggersDb: (loggers: ILoggerDB[]) => void;
        setPaginate: (data: IPagination) => void
        getAllLogersDb: (filters: IFilterPaginationDb) => Promise<boolean>
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
        getAllLogersDb: async (filters: IFilterPaginationDb) => {
            const res = await apiSrv.callBackEnd({
                preCallback: async () => {
                    return await apiSrv.callSrv({
                        method: 'POST',
                        path: '/loggerDb/getAll',
                        data: filters
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


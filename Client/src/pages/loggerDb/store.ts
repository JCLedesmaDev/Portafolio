/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWithEqualityFn } from "zustand/traditional";
import produce from "immer";
import { shallow } from "zustand/shallow";

import { apiSrv } from "@/libraries/index.libraries";
import mapper from '@/mappers/index.mappers'
import { ILoggerDB } from '@/models/ILoggerDB.model';
import { IPagination } from '@/interface/IPagination';
import { IUserModel } from '@/models/IUser.model';
import { IGetAllLoggersDtoRequest } from './interface/IGetAllLoggersRequest.dto';

interface IStore {
    state: {
        loggersDb: ILoggerDB[],
        paginate: IPagination
        users: IUserModel[]
    }
    actions: {
        setLoggersDb: (loggers: ILoggerDB[]) => void;
        setUsers: (users: IUserModel[]) => void;
        setPaginate: (data: IPagination) => void
        getAllLoggersDb: (filters: IGetAllLoggersDtoRequest) => Promise<boolean>
        getAllUsers: () => Promise<any>
    }
}

const store = createWithEqualityFn<IStore>((set, get) => ({
    state: {
        loggersDb: [],
        paginate: {
            pagesTotal: 0,
            pageActual: 0
        },
        users: []
    },
    actions: {
        setLoggersDb: (loggers: ILoggerDB[]) => {
            set(produce((store: IStore) => {
                store.state.loggersDb = loggers
            }))
        },
        setUsers: (users: IUserModel[]) => {
            set(produce((store: IStore) => {
                store.state.users = users
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
        getAllLoggersDb: async (filters: IGetAllLoggersDtoRequest) => {
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

            if (res) {
                const loggersAdapted: ILoggerDB[] = mapper.loggerDb(res.docs);
                get().actions.setLoggersDb(loggersAdapted)
                get().actions.setPaginate(res)
            }

            return res
        },
        getAllUsers: async () => {
            const res = await apiSrv.callBackEnd({
                preCallback: async () => {
                    return await apiSrv.callSrv({
                        method: 'GET',
                        path: '/users/getAllUsers'
                    })
                },
                options: { loader: true }
            })
            if (res) {
                const usersAdapted: IUserModel[] = mapper.multipleUsers(res.users);
                get().actions.setUsers(usersAdapted)
            }
        }
    }
}), shallow)

export default store


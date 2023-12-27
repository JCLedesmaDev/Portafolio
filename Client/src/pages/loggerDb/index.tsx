/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { ui } from '@/libraries/index.libraries';
import { JSONViewer } from './JSONViewer';
import css from './index.module.css'

export const LoggerDB: React.FC = () => {

    const storeUi = ui.useStoreUi()
    const [document, setDocument] = useState<any>(null);

    useEffect(() => {
        const sampleDocument = [
            {
                "type": "Evento",
                "date": "1696466225496",
                "request": {
                    "headers": {
                        "host": "localhost:8000",
                        "connection": "keep-alive",
                        "content-length": "62",
                        "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Opera\";v=\"102\"",
                        "mockmode": "false",
                        "accept-language": "es-ES,es;q=0.9",
                        "sec-ch-ua-mobile": "?0",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0",
                        "content-type": "application/json;charset=UTF-8",
                        "accept": "application/json, text/plain, */*",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "origin": "http://127.0.0.1:5173",
                        "sec-fetch-site": "cross-site",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-dest": "empty",
                        "referer": "http://127.0.0.1:5173/",
                        "accept-encoding": "gzip, deflate, br"
                    },
                    "body": {
                        "email": "juanledesma6040@gmail.com",
                        "password": "holahola123",
                        "remoteAddress": "::1",
                        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0"
                    },
                    "url": "/api/users/login"
                },
                "response": {
                    "info": {
                        "type": "success",
                        "msg": "Ha iniciado sesion correctamente!",
                        "data": {
                            "user": {
                                "id": "651e03fdbf1da666a2c14357",
                                "email": "juanledesma6040@gmail.com",
                                "projectsList": [
                                    {
                                        'nombre': 'lalala'
                                    },
                                    {
                                        'nombre': 'eeee'
                                    }
                                ],
                                "skillsList": []
                            }
                        }
                    }
                },
                "user": "651e053110baacf597e22e33"
            },
            {
                "type": "Evento",
                "date": "1696466225496",
                "request": {
                    "headers": {
                        "host": "localhost:8000",
                        "connection": "keep-alive",
                        "content-length": "62",
                        "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Opera\";v=\"102\"",
                        "mockmode": "false",
                        "accept-language": "es-ES,es;q=0.9",
                        "sec-ch-ua-mobile": "?0",
                        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0",
                        "content-type": "application/json;charset=UTF-8",
                        "accept": "application/json, text/plain, */*",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "origin": "http://127.0.0.1:5173",
                        "sec-fetch-site": "cross-site",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-dest": "empty",
                        "referer": "http://127.0.0.1:5173/",
                        "accept-encoding": "gzip, deflate, br"
                    },
                    "body": {
                        "email": "juanledesma6040@gmail.com",
                        "password": "holahola123",
                        "remoteAddress": "::1",
                        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 OPR/102.0.0.0"
                    },
                    "url": "/api/users/login"
                },
                "response": {
                    "info": {
                        "type": "success",
                        "msg": "Ha iniciado sesion correctamente!",
                        "data": {
                            "user": {
                                "id": "651e03fdbf1da666a2c14357",
                                "email": "juanledesma6040@gmail.com",
                                "projectsList": [
                                    {
                                        'nombre': 'lalala'
                                    },
                                    {
                                        'nombre': 'eeee'
                                    }
                                ],
                                "skillsList": []
                            }
                        }
                    }
                },
                "user": "651e053110baacf597e22e33"
            }
        ]
        setDocument(sampleDocument);

        storeUi.actions.setTitleView('Logger DB')
    }, [])

    return (
        <main className={css.main}>
            <h3 className='sub-section-title'>Registros de Logs</h3>

            <div className={css.containerBoxs}>
                {document && (document.map((doc: any, index: number) => (
                    <JSONViewer data={doc} key={index} />
                )))}
            </div>
        </main>
    )
}
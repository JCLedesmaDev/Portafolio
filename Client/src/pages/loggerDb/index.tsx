/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react';
import css from './index.module.css'

const JSONViewer = ({ data }: any) => {
    const [expanded, setExpanded] = useState(true);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const renderValue = (value: any) => {
        return typeof value === 'object'
            ? <JSONViewer data={value} />
            : <span>{value} </span>;
    };

    const renderObject = (obj: any) => {
        return (
            <ul>
                {Object.entries(obj).map(([key, value]) => (
                    <li key={key}>
                        <div className={css['json-key']} onClick={toggleExpand}>
                            <strong>{key}:</strong>
                        </div>
                        {expanded
                            ? <div className={css["json-value"]}>{renderValue(value)}</div>
                            : 'asd'
                        }
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className={css["json-viewer"]}>
            <div className={css["json-toggle"]} onClick={toggleExpand}>
                {expanded ? '-' : '+'}
            </div>
            {renderObject(data)}
        </div>
    );
};


export const LoggerDB: React.FC = () => {

    const [document, setDocument] = useState<any>(null);

    useEffect(() => {
        // Aquí podrías realizar una llamada a la API de tu servidor para obtener el documento desde MongoDB
        // Por ahora, simplemente simularemos un documento de ejemplo
        const sampleDocument = {
            "request": {
                "headers": {
                    "host": "localhost:8000",
                    "connection": "keep-alive",
                    "content-length": "62",
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
                            "id": {
                                "$oid": "651e03fdbf1da666a2c14357"
                            },
                            "email": "juanledesma6040@gmail.com",
                            "projectsList": [],
                            "skillsList": []
                        }
                    }
                }
            }
        }

        setDocument(sampleDocument);
    }, []);

    return (
        <main >
            <h2>JSON Viewer</h2>
            {document && <JSONViewer data={document} />}

        </main>
    )
}
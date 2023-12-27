/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import css from './index.module.css'
import { DialogModal } from '@/libraries/index.libraries';


const JSONViewerItem = (props: any) => {
    const { name, value, depth, expandObj } = props

    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        if (expandObj) setExpanded(!expanded)
    };

    return (<>
        <div className={css['json-attr']}>
            {(typeof value === 'object')
                ? (<>
                    <div onClick={toggleExpand}>
                        <b>{expanded ? '-' : '+'} {name}: </b>
                        {Array.isArray(value) ? 'Array' : 'Object'}
                    </div>
                    {expanded && (
                        <JSONViewer
                            data={value}
                            depth={depth + 1}
                            openModal={false}
                            expandObj={expandObj}
                        />
                    )}
                </>)
                : (<><b> {name}:</b> {value} </>)}
        </div>
    </>);
};

export const JSONViewer = ({ data, depth = 0, openModal = true, expandObj = false }: any) => {
    const [modal, setModal] = useState(false)

    const showModal = () => {
        if (openModal) setModal(true)
    }

    return (<>
        <div className={`${css['json-viewer']} ${css[`depth-${depth}`]}`}
            onClick={showModal}>
            {Object.entries(data)?.map(([key, value]) => (
                <JSONViewerItem
                    key={key}
                    name={key}
                    value={value}
                    depth={depth}
                    expandObj={expandObj}
                />
            ))}
        </div>

        <DialogModal isOpen={modal}>
            <div id="header">
                <h2>Datos del Log</h2>
            </div>

            <div id="body" className={css.dialogBody}>
                {Object.entries(data)?.map(([key, value]) => (
                    <JSONViewerItem
                        key={key}
                        name={key}
                        value={value}
                        depth={depth}
                        expandObj={true}
                    />
                ))}
            </div>

            <div id='footer'>
                <button onClick={() => setModal(false)}>Cerrar</button>
            </div>
        </DialogModal>
    </>)
};

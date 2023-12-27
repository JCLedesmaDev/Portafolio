/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import css from './index.module.css'
import { DialogModal } from '@/components/index.components';


const JSONViewerItem = (props: any) => {
    const { name, value, depth } = props

    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);
    const typeData = Array.isArray(value) ? 'Array' : 'Object'

    return (<>
        <div className={css['json-attr']}>
            {(typeof value === 'object')
                ? (<>
                    <div style={{ cursor: 'pointer' }} onClick={toggleExpand}>
                        <b>{expanded ? '-' : '+'} {name}:</b> {typeData}
                    </div>
                    {expanded && (<JSONViewer data={value} depth={depth + 1} />)}
                </>)
                : (<><b> {name}:</b> {value} </>)}
        </div>

    </>);
};

export const JSONViewer = ({ data, depth = 0 }: any) => {
    const [modal, setModal] = useState(false)

    const showModal = (data: any) => {
        console.log("🚀 ~ file: index.tsx:33 ~ showModal ~ data:", data)
        setModal(true)
    }

    return (<>
        <div className={`${css['json-viewer']} ${css[`depth-${depth}`]}`}
            onClick={() => showModal(data)}>
            {Object.entries(data)?.map(([key, value]) => (
                <JSONViewerItem
                    key={key}
                    name={key}
                    value={value}
                    depth={depth}
                />
            ))}
        </div>

        <DialogModal isOpen={modal} onClose={() => setModal(false)}>
            {/*<div id="header">
                <div>asd</div>
                ASd
            </div>*/}

            <h1 id="body" style={{ width: '300px' }}>BODY</h1>

            {/*<div id='footer'>
                footer
            </div>*/}
        </DialogModal>
    </>)
};

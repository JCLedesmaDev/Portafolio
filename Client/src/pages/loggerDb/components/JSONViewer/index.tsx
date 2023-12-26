/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import css from './index.module.css'


const JSONViewerItem = (props: any) => {
    const { name, value, depth } = props

    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(!expanded);
    const typeData = Array.isArray(value) ? 'Array' : 'Object'

    return (<>
        {typeof value === 'object'
            ? (<>
                <div className={css['json-attr']} style={{ cursor: 'pointer' }} onClick={toggleExpand}>
                    <b>{expanded ? '-' : '+'} {name}:</b> {typeData}
                </div>
                {expanded && (<JSONViewer data={value} depth={depth + 1} />)}
            </>)
            : (<div className={css['json-attr']}><b> {name}:</b>  {value} </div>)
        }
    </>);
};

export const JSONViewer = ({ data, depth = 0 }: any) => (
    <div className={`${css['json-viewer']} ${css[`depth-${depth}`]}`}>
        {Object.entries(data)?.map(([key, value]) => (
            <JSONViewerItem key={key} name={key} value={value} depth={depth} />
        ))}
    </div>
);

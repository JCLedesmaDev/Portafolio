import { ui } from '@/libraries/index.libraries';
import React from 'react';

export const Header: React.FC = () => {
    const storeUi = ui.useStoreUi()

    //useEffect(() => {
    //    console.log('AAAAAAAAAAAAEEE', ui.state.titleView)
    //}, [ui.state.titleView])
    return (
        <>
            <p> Esto es el HEADER</p>
            <p> {storeUi.state.titleView}</p>
        </>
    )
}
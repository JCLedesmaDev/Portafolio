import { ui } from '@/libraries/index.libraries';
import React from 'react';

export const Header: React.FC = () => {

    return (
        <>
            <p> Esto es el HEADER</p>
            <p> {ui.state.titleView}</p>
        </>
    )
}
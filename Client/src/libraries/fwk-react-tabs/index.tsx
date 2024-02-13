/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import css from './index.module.css'

interface IProps {
    tabsArray: Array<{
        title: string;
        content: React.ComponentType<any>;
    }>;
    className?: any
}

export const Tabs: React.FC<IProps> = ({ tabsArray, className }) => {
    const [tabActiva, setTabActiva] = useState(0);

    return (
        <div className={css.main}>

            <div className={`${css.navTabs} ${className}`}>
                {tabsArray.map((tab, index) => (
                    <a key={index}
                        className={index === tabActiva ? css.active : ''}
                        onClick={() => setTabActiva(index)}
                    >
                        {tab.title}
                    </a>
                ))}
            </div>

            <div className={css.container}>
                <TabContent Component={tabsArray[tabActiva].content} />
            </div>

        </div>
    )
}

// Componente para renderizar el contenido del tab
const TabContent: React.FC<{ Component: React.ComponentType<any> }> = ({ Component }) => {
    return <Component />;
};
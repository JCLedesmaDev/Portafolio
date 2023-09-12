/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useAppStore } from "../../pages/appStore";
import styleCss from "./index.module.css";

interface Props {
    children: string | any;
    personCss: any;
}

export const ModalContainer: React.FC<Props> = (props) => {

    const { children, personCss } = props;
    
    
    /// VARIABLES
    const OpenModalCss = `${styleCss.containerModal} ${styleCss["containerModal--openModal"]}`;
    const CloseModalCss = `${styleCss.containerModal}`;

    /// HOOKS
    const appStore = useAppStore()
    

    useEffect(() => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        if (appStore.state.showPopup) {
            // slideCarrusel();
            $body.style.overflowY = "hidden";
        } else {
            $body.style.overflowY = "scroll";
        }
    }, [appStore.state.showPopup])


    return (
        <article className={`${appStore.state.showPopup ? OpenModalCss : CloseModalCss} `}>
            <div>
                <article className={` ${styleCss.contentModal} ${personCss}  `}>
                    {children}
                </article>
            </div>
        </article>
    );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styleCss from "./index.module.css";

interface Props {
    children: string | any;
    personCss: any;
    isOpen: boolean;
    onClose: () => void;
}

export const DialogModal: React.FC<Props> = (props) => {

    const { children, personCss, isOpen } = props;

    /// VARIABLES
    const modalRoot = document.body;
    const modalContainer = document.createElement('div');
    const OpenModalCss = `${styleCss.containerModal} ${styleCss["containerModal--openModal"]}`;
    const CloseModalCss = `${styleCss.containerModal}`;


    useEffect(() => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        if (isOpen) {
            $body.style.overflowY = "hidden";
        } else {
            $body.style.overflowY = "scroll";
        }
    }, [isOpen])


    // Asegurarse de que el contenedor del modal se monte una vez.
    useEffect(() => {
        modalRoot.appendChild(modalContainer);
        /*  Aseguramos que el componente se elimine del 
            DOM al desmontar el componente, al isOpen 
            pasar de true a falso  */
        return () => {
            modalRoot.removeChild(modalContainer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isOpen) setTimeout(() => { return null; }, 1500)

    return ReactDOM.createPortal(
        <article className={`${isOpen ? OpenModalCss : CloseModalCss} `}>
            <div>
                <article className={` ${styleCss.contentModal} ${personCss}  `}>
                    {children}
                </article>
            </div>
        </article>,
        modalContainer
    );
};
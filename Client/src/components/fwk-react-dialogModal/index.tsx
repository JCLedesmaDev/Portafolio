/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styleCss from "./index.module.css";

interface Props {
    children: string | any;
    personCss?: any;
    isOpen: boolean;
    onClose: () => void;
}

export const DialogModal: React.FC<Props> = (props) => {

    const { children, personCss, isOpen } = props;
    console.log("🚀 ~ file: index.tsx:16 ~ children:", children)

    /// VARIABLES
    const [css, setCss] = useState(styleCss.containerModal)

    useEffect(() => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        if (isOpen) {
            $body.style.overflowY = "hidden";
            setCss(`${styleCss.containerModal} ${styleCss["containerModal--openModal"]}`)
        } else {
            $body.style.overflowY = "scroll";
            setCss(styleCss.containerModal)
        }
    }, [isOpen])

    return ReactDOM.createPortal(isOpen && (
        <article className={css}>
            <div>
                <article className={`${styleCss.contentModal} ${personCss}`} >
                    {children}
                </article>
                <button onClick={props.onClose}>CERRAR</button>
            </div>
        </article>),
        document.getElementById('root') as HTMLElement
    );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import css from "./index.module.css";

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
    const [updateCss, setUpdateCss] = useState(css.containerModal)

    useEffect(() => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        if (isOpen) {
            $body.style.overflowY = "hidden";
            setUpdateCss(`${css.container} ${css["container--open"]}`)
        } else {
            $body.style.overflowY = "scroll";
            setUpdateCss(css.container)
        }
    }, [isOpen])

    return ReactDOM.createPortal(isOpen && (
        <article className={updateCss}>
            <div className={`${css.content} ${personCss}`} >
                {children}
                <button onClick={props.onClose}>CERRAR</button>
            </div>
        </article>),
        document.getElementById('root') as HTMLElement
    );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import css from "./index.module.css";

interface Props {
    isOpen: boolean;
    onCancel?: () => void;
    onAccept?: () => void;
    children?: any;
    message?: string;
    title?: string;
}

export const DialogModal: React.FC<Props> = (props) => {

    /// VARIABLES
    const [updateCss, setUpdateCss] = useState(css.containerModal)
    const [childrens, setChildrens] = useState({
        header: null,
        body: null,
        footer: null
    })

    const showDialog = () => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        $body.style.overflowY = "hidden";
        setUpdateCss(`${css.container} ${css["container--open"]}`)
    }

    const closeDialog = () => {
        const $body = document.querySelector("body") as HTMLBodyElement;
        $body.style.overflowY = "scroll";
        setUpdateCss(css.container)
    }

    const defineChildrens = () => {
        const isSeveralChildrens = Array.isArray(props.children)
        if (isSeveralChildrens) {
            const fndHeader = props.children.find((x: any) => x.props.id === 'header')
            const fndBody = props.children.find((x: any) => x.props.id === 'body')
            const fndFooter = props.children.find((x: any) => x.props.id === 'footer')
            setChildrens((prevVal) => ({
                ...prevVal,
                ...(fndHeader && { header: fndHeader }),
                ...(fndBody && { body: fndBody }),
                ...(fndFooter && { footer: fndFooter })
            }))
        }
        if (!isSeveralChildrens && props.children) {
            setChildrens((prevVal) => ({
                ...prevVal,
                [props.children.props.id]: props.children,
            }))
        }
    }

    useEffect(() => {
        if (props.isOpen) {
            defineChildrens()
            showDialog()
        } else { closeDialog() }
    }, [props.isOpen])

    return ReactDOM.createPortal(props.isOpen && (
        <article className={updateCss}>
            <div className={`${css.content}`} >

                <div>
                    {childrens.header ?? (<h2>{props.title}</h2>)}
                </div>

                <div>
                    {childrens.body ?? (<h3>{props.message}</h3>)}
                </div>

                <div className={css.btnContainer}>
                    {childrens.footer ?? (<>
                        <button onClick={props.onCancel}>Cancelar</button>
                        <button onClick={props.onAccept}>Aceptar</button>
                    </>)}
                </div>

            </div>
        </article>),
        document.getElementById('root') as HTMLElement
    );
};
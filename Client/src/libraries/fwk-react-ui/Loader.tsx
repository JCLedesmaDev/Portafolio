/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ReactDOM from 'react-dom/client'


const showLoader = (message: string) => {

}

const initializateLoader = (ref: React.MutableRefObject<null>) => {
    const elementoDom = ref.current
    if (elementoDom) {
        const root = ReactDOM.createRoot(elementoDom)
        root.render(<Loader/>)
    }
}

const Loader: React.FC = () => {

    return (
        <p>asd</p>
    )
}

export default {
    initializateLoader,
    showLoader,
}
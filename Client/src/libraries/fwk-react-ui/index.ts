import ReactDOM from 'react-dom/client'
import notify from './Notify'
import loader from './Loader'


const initializateLibraryUi = (refHtml: React.MutableRefObject<null>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const root = ReactDOM.createRoot(refHtml.current as any)

    notify.initializateNotify(root)
    loader.initializateLoader(root)
}

export default { notify, loader, initializateLibraryUi }


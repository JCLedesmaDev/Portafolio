import notify from './Notify'
import loader from './Loader'


const initializateLibraryUi = (
    refNotify: React.MutableRefObject<HTMLDivElement>,
    refLoader: React.MutableRefObject<HTMLDivElement>
) => {
    notify.initializateNotify(refNotify)
    loader.initializateLoader(refLoader)
}

export default { notify, loader, initializateLibraryUi }


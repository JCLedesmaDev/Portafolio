import notify from './Notify'
import loader from './Loader'


const initializateLibraryUi = (
    refNotify: React.MutableRefObject<null>,
    refLoader: React.MutableRefObject<null>
) => {
    notify.initializateNotify(refNotify)
    loader.initializateLoader(refLoader)
}

export default { notify, loader, initializateLibraryUi }


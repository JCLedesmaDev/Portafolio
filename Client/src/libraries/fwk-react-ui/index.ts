import notify from './Notify'
import loader from './Loader'
import storeUi from './store'

const initializateLibraryUi = (
    refNotify: React.MutableRefObject<HTMLDivElement>,
    refLoader: React.MutableRefObject<HTMLDivElement>
) => {
    notify.initializateNotify(refNotify)
    loader.initializateLoader(refLoader)
}

export default {
    state: storeUi.getState().state,
    actions: storeUi.getState().actions,
    initializateLibraryUi
}


import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useAppStore } from "../../pages/appStore";
import css from "./index.module.css";

export const SpinnerModal: React.FC = () => {

  const appStore = useAppStore()

  /// VARIABLES
  const styleOpenModalStatus = `${css.containerModal} ${css["containerModal--openModal"]}`;
  const styleCloseModalStatus = `${css.containerModal}`;

  useEffect(() => {
    const $body = document.querySelector("body") as HTMLBodyElement;

    if (appStore.state.spinnerModal.showStatus || appStore.state.spinnerModal.showSpinner) {
      $body.style.overflowY = "hidden";
    } else {
      $body.style.overflowY = "scroll";
    }
  }, [appStore.state.spinnerModal.showStatus, appStore.state.spinnerModal.showSpinner])


  if (appStore.state.spinnerModal.showSpinner) {
    return ReactDOM.createPortal(
      <div className={`
        ${appStore.state.spinnerModal.showSpinner
          ? css.backgroundSpinner : css.CloseLoader} 
      `}>

        <div className={css.containerSpinner}>

          <div className={css.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <h5> Espere por favor...</h5>

        </div>

      </div>,
      document.body
    );
  }

  return ReactDOM.createPortal(
    <article className={`
      ${appStore.state.spinnerModal.showStatus
        ? styleOpenModalStatus : styleCloseModalStatus}
        `}>
      <div>
        <article className={css.contentModal}>
          <p>{`${appStore.state.spinnerModal.message}`}</p>
          <i className="far fa-smile-wink" />
        </article>
      </div>
    </article>,
    document.body
  )
};

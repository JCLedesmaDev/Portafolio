import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useStoreSpinner } from './store'
import css from "./index.module.css";

export const SpinnerModal: React.FC = () => {

  const appStore = useStoreSpinner()

  /// VARIABLES
  const styleOpenModalStatus = `${css.containerModal} ${css["containerModal--openModal"]}`;
  const styleCloseModalStatus = `${css.containerModal}`;

  useEffect(() => {
    const $body = document.querySelector("body") as HTMLBodyElement;

    if (appStore.state.status || appStore.state.showSpinner) {
      $body.style.overflowY = "hidden";
    } else {
      $body.style.overflowY = "scroll";
    }
  }, [appStore.state.status, appStore.state.showSpinner])


  if (appStore.state.showSpinner) {
    return ReactDOM.createPortal(
      <div className={`
        ${appStore.state.showSpinner ? css.backgroundSpinner : css.CloseLoader} 
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
      ${appStore.state.status ? styleOpenModalStatus : styleCloseModalStatus}`}>
      <div>
        <article className={css.contentModal}>
          <p>{`${appStore.state.message}`}</p>
          <i className="far fa-smile-wink" />
        </article>
      </div>
    </article>,
    document.body
  )
};

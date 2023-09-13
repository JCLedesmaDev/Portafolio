import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useStoreSpinner } from './store'
import css from "./index.module.css";
import storeSpinner, { ISpinnerPopup } from "./store";


// eslint-disable-next-line react-refresh/only-export-components
export const showPopupSpinnerAlert = (spinner = false, status = false, message = '') => {
  storeSpinner.getState().actions.setSpinnerPopup({
    show: spinner,
    status,
    message
  } as ISpinnerPopup)
}

export const SpinnerPopup: React.FC = () => {

  const storeSpinner = useStoreSpinner()

  /// VARIABLES
  const modalRoot = document.body;
  const modalContainer = document.createElement('div');
  const styleOpenModalStatus = `${css.containerModal} ${css["containerModal--openModal"]}`;
  const styleCloseModalStatus = `${css.containerModal}`;

  useEffect(() => {
    const $body = document.querySelector("body") as HTMLBodyElement;
    if (storeSpinner.state.status || storeSpinner.state.show) {
      $body.style.overflowY = "hidden";
    } else {
      $body.style.overflowY = "scroll";
    }
  }, [storeSpinner.state.status, storeSpinner.state.show])

  // Asegurarse de que el contenedor del modal se monte una vez.
  useEffect(() => {
    modalRoot.appendChild(modalContainer);
    /*  Aseguramos que el componente se elimine del 
        DOM al desmontar el componente, al isOpen 
        pasar de true a falso  */
    return () => {
      modalRoot.removeChild(modalContainer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (storeSpinner.state.show && !storeSpinner.state.status) {
    return ReactDOM.createPortal(
      <div className={`
        ${storeSpinner.state.show ? css.backgroundSpinner : css.CloseLoader} 
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
      modalContainer
    );
  }

  if (!storeSpinner.state.show && !storeSpinner.state.status) {
    setTimeout(() => { return null; }, 3000)
  }

  return ReactDOM.createPortal(
    <article className={`
      ${storeSpinner.state.status ? styleOpenModalStatus : styleCloseModalStatus}`}>
      <div>
        <article className={css.contentModal}>
          <p>{`${storeSpinner.state.message}`}</p>
          <i className="far fa-smile-wink" />
        </article>
      </div>
    </article>,
    modalContainer
  )
};

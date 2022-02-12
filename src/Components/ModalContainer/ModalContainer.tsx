import React, { useEffect } from "react";
import ModalContainerCSS from "./ModalContainer.module.css";

interface Props {
  children: string | any;
  validation: any;
}

export const ModalContainer: React.FC<Props> = (props) => {
  const { children, validation } = props;
  const openModalCSS = `${ModalContainerCSS.portfolioModal} ${ModalContainerCSS.openPortafolioModal}`;
  const modalCSS = `${ModalContainerCSS.portfolioModal}`;

  useEffect(() => {
    const $body = document.querySelector("body") as HTMLBodyElement;
    if (validation) {
      // slideCarrusel();
      $body.style.overflowY = "hidden";
    } else {
      $body.style.overflowY = "scroll";
    }
    document.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        window.location.hash = "#close";
      }
    });
  }, [validation]);

  return (
    <article className={validation ? openModalCSS : modalCSS}>
      {children}
    </article>
  );
};

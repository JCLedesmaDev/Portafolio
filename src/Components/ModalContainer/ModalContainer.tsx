import React from "react";
import ModalContainerCSS from "./ModalContainer.module.css";

interface Props {
  children: string | any;
  validation: any;
}

export const ModalContainer: React.FC<Props> = (props) => {
  const { children, validation } = props;
  const openModalCSS = `${ModalContainerCSS.portfolioModal} ${ModalContainerCSS.openPortafolioModal}`;
  const modalCSS = `${ModalContainerCSS.portfolioModal}`;

  return (
    <article className={validation ? openModalCSS : modalCSS}>
      {children}
    </article>
  );
};

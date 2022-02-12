import React, { useState } from "react";
import parse from "html-react-parser";
import { useMyData } from "../../Hooks/useMyData";
import { useForm } from "react-hook-form";
import SocialsCSS from "./Socials.module.css";
import FormCSS from "./Form.module.css";
import PortfolioCSS from "../Portfolio/Portfolio.module.css";
import { noneElement } from "../../Utils/noneElement";
import Loader from "../../Static/Spin-1s-200px.svg";
import { InputForm } from "./InputForm";
import { TexTarea } from "./TexTareaForm";
import { axiosMethod } from "../../Utils/axiosMethod";
import { useLocation } from "react-use";
import { ModalContainer } from "../ModalContainer/ModalContainer";

export const Contact: React.FC = () => {
  /// VARIABLES
  const { contact } = useMyData();
  const formInputs = contact?.formContactInputs;
  const CssOpenModal = `${PortfolioCSS.portfolioModal} ${PortfolioCSS.openPortafolioModal}`;

  /// HOOKS
  const location = useLocation().hash;
  const { register, handleSubmit, reset } = useForm();
  const [loaderActive, setLoaderActive] = useState(false);

  /// METODOS

  const onSubmit = handleSubmit(async (dataForm) => {
    try {
      setLoaderActive(true);

      const { data, message } = await axiosMethod({
        method: "POST",
        url: "https://formsubmit.co/ajax/5e0986ed3ab6208281bd2ec47b0252c1",
        data: dataForm,
      });

      if (message) throw new Error(message);

      openModal("#gracias");
    } catch (error) {
      openModal("#ups");
    }
  });

  const openModal = (message: string) => {
    setLoaderActive(false);
    window.location.hash = message;

    setTimeout(() => {
      window.location.hash = "#close";
    }, 3000);

    document.querySelectorAll("form i").forEach((enlace) => {
      enlace.classList.remove("fa-check-circle");
      enlace.classList.remove("fa-times-circle");
    });
    reset();
  };

  return (
    <section
      id="contact"
      className={` ${FormCSS.contact} section-space`}
      data-scroll-spy
    >
      <div className="centerContainer">
        <h2 className="section-title">{contact?.interested}</h2>

        {/* <!-- SOCIALES --> */}
        <article className={`${SocialsCSS.contact__cards} centerContainer`}>
          {contact?.modeContact?.map((contact, indexContact) => (
            <aside
              key={indexContact}
              className={`${SocialsCSS.contact__cardTarget} box-shadow`}
            >
              <i className={contact?.icon} />
              <h5>{contact?.title}</h5>
              {indexContact !== 3 ? (
                <small>{parse(contact.links[0])}</small>
              ) : (
                <div>
                  {contact?.links.map((link, indexLink) => (
                    <small key={indexLink}>{parse(link)}</small>
                  ))}
                </div>
              )}
            </aside>
          ))}
        </article>

        {/* <!-- FORMULARIO --> */}
        <form
          className={`${FormCSS.contact__form} box-shadow`}
          onSubmit={onSubmit}
        >
          {formInputs?.map((inputForm, index) => (
            <div id={`form__${inputForm.name}`} key={index}>
              {inputForm.type !== "textarea" ? (
                <InputForm form={inputForm} register={register} />
              ) : (
                <TexTarea form={inputForm} register={register} />
              )}

              <p className={FormCSS.contact_messageError}>
                {inputForm.messageError}
              </p>
            </div>
          ))}

          <div
            className={`${
              FormCSS.contact__form__loader
            } text-center ${noneElement(!loaderActive)}`}
          >
            <img src={Loader} alt="Enviando..." />
          </div>

          <div id="form__boton">
            <input
              type="submit"
              className="button text-center "
              style={{
                marginTop: ".5rem",
              }}
              value={contact?.button}
            />
          </div>
        </form>

        {/* <!-- MODAL DEL FORMULARIO --> */}
        <ModalContainer
          validation={
            location?.includes("#gracias") || location?.includes("#ups")
          }
        >
          <div>
            <article className={FormCSS.modal__contactForm_response}>
              <h3>
                {location?.includes("#gracias") && contact?.modalContact}
                {location?.includes("#ups") && contact?.modalContactError}
              </h3>

              <i className="far fa-smile-wink"></i>
            </article>
          </div>
        </ModalContainer>

        {/* <ModalContainer validation={true}>
          <h3>asdasw</h3>
        </ModalContainer> */}
      </div>
    </section>
  );
};

import React, { useState } from "react";
import { useMyData } from "../../Hooks/useMyData";
import { useForm } from "react-hook-form";
import SocialsCSS from "./Components/Socials.module.css";
import ContactCSS from "./Contact.module.css";
import { noneElement } from "../../Utils/noneElement";
import Loader from "../../Static/Spin-1s-200px.svg";
import { InputForm } from "./Components/InputForm";
import { TexTarea } from "./Components/TexTareaForm";
import { axiosMethod } from "../../Utils/axiosMethod";
import { useLocation } from "react-use";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { Tarjet } from "./Components/Tarjet/Tarjet";

export const Contact: React.FC = () => {

  /// VARIABLES
  const { contact } = useMyData(); 
  const formInputs = contact?.formContactInputs;

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
      className={` ${ContactCSS.contact} section-space`}
      data-scroll-spy
    >
      <div className="centerContainer">
        <h2 className="section-title">{contact?.interested}</h2>

        {/* <!-- SOCIALES --> */}
        <article className={`${SocialsCSS.contact__cards} centerContainer`}>
          {contact?.modeContact?.map((contact, indexContact) => (
            <Tarjet Contact={contact} IndexContact={indexContact}/>
          ))}
        </article>

        {/* <!-- FORMULARIO --> */}
        <form
          className={`${ContactCSS.contact__form} box-shadow`}
          onSubmit={onSubmit}
        >
          {formInputs?.map((inputForm, index) => (
            <div id={`form__${inputForm.name}`} key={index}>
              {inputForm.type !== "textarea" ? (
                <InputForm form={inputForm} register={register} />
              ) : (
                <TexTarea form={inputForm} register={register} />
              )}

              <p className={ContactCSS.contact_messageError}>
                {inputForm.messageError}
              </p>
            </div>
          ))}

          <div
            className={`${
              ContactCSS.contact__form__loader
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
        <ModalContainer validation={
            location?.includes("#gracias") || location?.includes("#ups")
          }
        >
          <div>
            <article className={ContactCSS.modal__contactForm_response}>
              <h3>
                {location?.includes("#gracias") && contact?.modalContact}
                {location?.includes("#ups") && contact?.modalContactError}
              </h3>

              <i className="far fa-smile-wink"></i>
            </article>
          </div>

        </ModalContainer>

      </div>
    </section>
  );
};

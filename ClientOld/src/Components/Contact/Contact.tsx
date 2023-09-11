import React, { useState } from "react";
import { useMyData } from "../../Hooks/useMyData";
import { useForm } from "react-hook-form";
import { noneElement } from "../../Utils/noneElement";
import Loader from "../../Static/Spin-1s-200px.svg";
import { InputForm } from "./Components/FormField/InputForm";
import { TexTarea } from "./Components/FormField/TexTareaForm";
import { axiosMethod } from "../../Utils/axiosMethod";
import { useLocation } from "react-use";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { Tarjet } from "./Components/Tarjet/Tarjet";

import ContactCSS from "./Contact.module.css";
import FormFieldCSS from "./Components/FormField/FormField.module.css";
import { ModalMessage } from "./Components/ModalMessage/ModalMessage";



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
    <section id="contact" data-scroll-spy
      className={`${ContactCSS.contact} section-space`}      
    >
      <div className={`${ContactCSS.contactContainer} centerContainer`}>

        <h2 className="section-title">{contact?.interested}</h2>

        <article className={`${ContactCSS.tarjet} centerContainer`}>
          {contact?.modeContact?.map((contact, indexContact) => (
            <Tarjet Contact={contact} IndexContact={indexContact}/>
          ))}
        </article>

        {/* <!-- FORMULARIO --> */}
        <form onSubmit={onSubmit}
          className={`${ContactCSS.contactContainer__form} box-shadow`}
        >
          {formInputs?.map((inputForm, index) => (
            <div id={`form__${inputForm.name}`} key={index}>
              {inputForm.type !== "textarea" ? (
                <InputForm form={inputForm} register={register} />
              ) : (
                <TexTarea form={inputForm} register={register} />
              )}

              <p className={FormFieldCSS.messageError}>
                {inputForm.messageError}
              </p>
            </div>
          ))}

          <div className={`${
              ContactCSS.contactContainer__formLoader
            } text-center ${noneElement(!loaderActive)}`}
          ><img src={Loader} alt="Enviando..." /></div>

          <div id="form__boton"> 
            <input type="submit"
              className="button text-center "
              style={{marginTop: ".5rem"}}
              value={contact?.button}
            />
          </div>

        </form>

        {/* <!-- MODAL DEL FORMULARIO --> */}
        <ModalContainer validation={
            location?.includes("#gracias") || location?.includes("#ups")
          }
        > <ModalMessage />
        </ModalContainer>

      </div>
    </section>
  );
};

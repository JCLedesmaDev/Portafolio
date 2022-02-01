export const expRegForm: any = {
  name: {
    required: {
      value: true,
      message: "Campo requerido.",
    },
    pattern: {
      value: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{1,40}$/i,
    },
  },
  email: {
    required: {
      value: true,
      message: "Campo requerido.",
    },
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
    },
  },
  comment: {
    required: {
      value: true,
      message: "Campo requerido.",
    },
    pattern: { value: /^.{1,255}$/ },
  },
};

export const validateInput = (
  input: any,
  nameElement: string,
  FormCSS: any
) => {
  const $iconInput = document.querySelector(
    `#form__${nameElement} i`
  ) as HTMLElement;
  const $formError = document.querySelector(
    `#form__${nameElement} p`
  ) as HTMLElement;

  const expReg = expRegForm[nameElement].pattern.value;

  if (expReg.exec(input.value)) {
    //Cambiamos el color del icono a VERDE
    $iconInput.classList.remove(`${FormCSS.iconValidate_incorrect}`);
    $iconInput.classList.add(`${FormCSS.iconValidate_correct}`);

    //Cambiamos el icono de la X al icono valido
    $iconInput.classList.add("fa-check-circle");
    $iconInput.classList.remove("fa-times-circle");

    //Quitamos la clase para que no aparezca el mensaje de error
    $formError.classList.remove(`${FormCSS.contact_messageErrorActive}`);
  } else {
    //Cambiamos el color del icono a incorrecto(rojo)
    $iconInput.classList.add(`${FormCSS.iconValidate_incorrect}`);
    $iconInput.classList.remove(`${FormCSS.iconValidate_correct}`);

    //Cambiamos el icono de valido a la X
    $iconInput.classList.remove("fa-check-circle");
    $iconInput.classList.add("fa-times-circle");

    //Agregamos la clase para que aparezca el mensaje de error
    $formError.classList.add(`${FormCSS.contact_messageErrorActive}`);
  }

  if (input.value === "") {
    //Quitamos el icono en cuestion
    $iconInput.classList.remove("fa-check-circle");
    $iconInput.classList.remove("fa-times-circle");

    //Quitamos la clase para que no aparezca el mensaje de error
    $formError.classList.remove(`${FormCSS.contact_messageErrorActive}`);
  }
};

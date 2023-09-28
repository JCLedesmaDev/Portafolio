
/* Puntos necesarios para poder utilizar este custom hooks */

1) Crear una interface que contenta todos los campos que tendra el formulario.
  Por ejem.:

  export interface IFormLogin {
    emailLogin: string;
    passwordLogin: string;
  }

2) Cuando ejecutamos nuestro custom hooks, le deberemos pasar, la interface definida en el paso anterior y un objeto con los valores iniciales de los campos de nuestro  formulario.

  Por ejem.: 
    const formularioLogin = useFormCustom<IFormLogin>({
      emailLogin: "",
      passwordLogin: "",
    });
    const { formulario, handleChange, resetForm } = formularioLogin;

  Este CustomHook nos devolvera
  - Objeto con todos los campos del formulario y sus valores.
  - Metodo HandleChange, para rellenar los valores del formulario.
  - Metodo resetForm, para resetear los valores del formulario.
  - Cada uno de los campos del formulario.

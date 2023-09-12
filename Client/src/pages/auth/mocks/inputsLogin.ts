import { IInputs } from "../../../components/Input/IInputs";

export const InputsMockLogin: IInputs[] = [
  {
    placeholder: "Correo electronico: ",
    type: "email",
    name: "email",
    expReg: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
    errorMessage: "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.",
  },
  {
    placeholder: "Contraseña: ",
    type: "password",
    name: "password",
    expReg: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    errorMessage: "La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.",
  },
];

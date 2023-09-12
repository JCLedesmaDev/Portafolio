import { useContext } from "react";
import { FormsContext } from "./formsProvider";

export const useFormsContext = () => {
    
  /* 
    Utilizamos este useHooks para evitar llamar muchas veces el Context
    Entonces, de esta manera, llamamos solo una vez el context y retomamos
    los valores que nos provee
  */

  const formsContext = useContext(FormsContext);

  return { ...formsContext };
};
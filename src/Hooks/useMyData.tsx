import myDataES from "../Language/myData-ES.json";
// import myDataEN from "../Language/myData-EN.json";


export const useMyData = () => {

/* TODO: Implementar metodo para que determinado el caso, me devuelva
    el .Json en ingles o en español... Aplicar Context seguramente
*/
  return {
    ...myDataES,
  };
};

import myDataES from "../Language/myData-ES.json";
import myDataEN from "../Language/myData-EN.json";
import { useEffect, useState } from "react";
import { IMyData } from "../Interface/IMyData";

const INITIAL_STATE = {
  spanish: myDataES,
  english: myDataEN,
};

export const useMyData = () => {
  //   /* TODO: MEJORAR; VER CON CONTEXT
  //     Usar este custom hook dentro del useContext y en cada componente
  //     en vez de llamar a useMyData, seria llamar al useContext
  //
  //    PD: Cuando haga la funcionalidad de cambiar de español a
  //     ingles, descomentar todo y  borrar lo unico q retorna
  //   */

  // const lenguage = localStorage.getItem("leng") as any;

  // const [idioma, setIdioma] = useState<IMyData>();

  // const selectLenguage: any = {
  //   ES: () => {
  //     setIdioma(INITIAL_STATE.spanish);
  //     localStorage.setItem("leng", "ES");
  //   },
  //   EN: () => {
  //     setIdioma(INITIAL_STATE.english);
  //     localStorage.setItem("leng", "EN");
  //   },
  // };

  // const changeLenguage = () => {
  //   lenguage === "ES" ? selectLenguage["EN"]() : selectLenguage["ES"]();
  //   window.location.reload()
  // };

  // useEffect(() => {
  //   lenguage ? selectLenguage[lenguage]() : selectLenguage["ES"]();
  // }, []);

  /*  */
  return {
    ...INITIAL_STATE.spanish,
    // ...idioma,
    // changeLenguage,
  };
};

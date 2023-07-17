import axios, { Method  } from "axios";

interface IDataPetition {
  url: string;
  method: Method | undefined;
  data: any;
}

export const axiosMethod = async (dataPetition: IDataPetition) => {
  let message;
  let data;
  try {
    let response = await axios(dataPetition.url, {
      method: dataPetition.method,
      data: dataPetition.data,
    });
    // console.log("VER ESTO ", response)

    data = await response.data;
  } catch (error: any) {
    // Manipulacion del error
    message = error?.response?.statusText || "Ocurrio un error";
  }

  return {
    data,
    message,
  };
};

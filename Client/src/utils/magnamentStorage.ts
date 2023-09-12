/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */


export const magnamentStorage = {
  
  set: <TypeStorage extends Object>(
    nameStorage: string,
    datesStorage: TypeStorage
  ): void => {
    //Cambiar nombre por el que sea en la circunstancia.
    localStorage.setItem(nameStorage, JSON.stringify(datesStorage));
  },

  get: <TypeStorage>(nameStorage: string) => {
    const storage = localStorage.getItem(nameStorage) as null | string
    return storage
      ? JSON.parse(storage) as TypeStorage
      : {} as TypeStorage;
  },

  remove: (nameStorage: string) => {
    localStorage.removeItem(nameStorage);
  }

}




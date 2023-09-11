/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const set = <TypeStorage extends Object>(
  nameStorage: string,
  datesStorage: TypeStorage
): void => {
  //Cambiar nombre por el que sea en la circunstancia.
  localStorage.setItem(nameStorage, JSON.stringify(datesStorage));
};

export const get = <TypeStorage>(nameStorage: string) => {
  const storage = localStorage.getItem(nameStorage) as null | string
  return storage
    ? JSON.parse(storage) as TypeStorage
    : {} as TypeStorage;
};

export const remove = (nameStorage: string) => {
  localStorage.removeItem(nameStorage);
}

export default { set, get, remove }
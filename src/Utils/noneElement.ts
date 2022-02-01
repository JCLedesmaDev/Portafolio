export const noneElement = (active: boolean): string => {
  let className: string = "";

  active ? (className = "noneElement") : (className = "");
  return className;
};

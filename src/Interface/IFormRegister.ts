import { UseFormRegister } from "react-hook-form";

 interface IFormData {
  name: string;
  email: string;
  comment: string;
}

export interface IFormRegister {
  form: IFormData | any;
  register: UseFormRegister<any>;
}

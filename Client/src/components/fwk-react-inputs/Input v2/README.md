

Puntos necesarios para poder utilizar este Componente 

  Necesitaremos pasarle
  - Value: Un state para poder obtener el valor del input 
  - handleChange: el setState del useState();
  - expReg: Una expresion regular para que pueda validar 
    lo que se escribe.
  - errorMessage: Un mensaje de error para cuando estemos escribiendo
    algo que no debamos.
  - inputProps: Un objeto que contenga
      * type=""
      * placeholder=""
      * name=""
    Con sus respectivos valores dependiendo del Input.

  La interface de esto seria:
  export interface IFormInputs {
    placeholder: string;
    type: any;
    name: string;
    expReg: RegExp;
    errorMessage: string;
  }
  
  Por ejem.:

  const [inputText, setInputText] = useState("")
  const propsInput = {
    placeholder: "Correo electronico: ",
    type: "email",
    name: "emailLogin",
    expReg: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
    errorMessage:
      "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.",
  },

  <Input
    inputProps={propsInput}
    value={inputText}
    handleChange={setInputText}
    errorMessage={propsInput.errorMessage}
    expReg={propsInput.expReg}
  />


<h1> Puntos necesarios para poder utilizar este Componente </h1> 

El componente espera a que le pasemos el siguiente objeto de propeidades:
{
    attrInput: {
        placeholder: "Contraseña: ",
        type: "password",
        name: "password",
        required: true,
        autoComplete: "off"
    },
    expReg: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
    errorMessage: "La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.",
    data: { value: form['password'].value },
    handleChange: handleChange
}

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
      * required: true,
      * autoComplete: "off"

Con sus respectivos valores dependiendo del Input.

--------------------------------------------------------------------------

Por ejem.:

const formsProps = {
    email: {
        attrInput: {
            name: 'email',
            placeholder: 'Ingrese usuario',
            type: 'email',
            required: true,
            autoComplete: 'off'
        },
        expReg: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
        errorMessage: "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.",
        data: { value: form['email'].value },
        handleChange: handleChange
    },
    password: {
        attrInput: {
            placeholder: "Contraseña: ",
            type: "password",
            name: "password",
            required: true,
            autoComplete: "off"
        },
        expReg: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        errorMessage: "La contraseña debe contener al menos: 1 letra mayuscula, 1 letra minuscula y 1 numero.",
        data: { value: form['password'].value },
        handleChange: handleChange
    }
}
<Input props={formsProps.email} />
<Input props={formsProps.password} />


Cabe aclarar que el "handleChange", recibe como parametros los siguientes
datos:
-> Nombre input
->  {
      value: 'SARAZA',
      dirty: true,
      error: false
    }

Ejemplo:
const handleChange = (nameField: string, data: any) => {
  setForm((prevForm) => ({
    ...prevForm, [nameField]: data
  }))
}
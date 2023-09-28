/* Puntos necesarios para poder utilizar este custom hooks */

1) Cuando ejecutamos nuestro custom hook, le deberemos pasar como
    parametro, el nombre del evento al cual nos vamos a subscribir.
    Por ejemplo: 

    const data = useSubscribeEvent({ subscribeEventName: 'updateInput' })

Este custom hook, nos devolvera todos los argumentos que estan subscriptos al 
evento 'updateInput'.
Esto implica que tendremos que importar para su uso:
import { evtEmitter } from "@/utils/index.utils";

Y tener componetes o paginas que se subinscriban y envien argumentos al mismo nombre de evento para que nuestro hook los pueda recibir y capturarlos en el "data" 




EJEMPLO de USO
En el componente PADRE 

import { useSubscribeEvent } from "@/hooks/index.hooks"

const data = useSubscribeEvent({ subscribeEventName: 'updateInput' })
console.log("🚀 ~ file: README.md:92 ~ data:", data)

En el componente HIJO:
  const update = (evt: any) => {

    const updateLocal = {
      value: evt.target.value,
      dirty: local.value !== data.value,
      error: expReg.exec(evt.target.value) === null
    }

    if (updateLocal.value === '') verifyisValueBlank()

    // A todos los oyentes de 'updateInput', van a recibir este arguemtno
    evtEmitter.emitToSubscribers({
      subscribedEventName: subscribedEventName,
      args: { [attrInput.name]: updateLocal }
    })

    setLocal(updateLocal)
  };

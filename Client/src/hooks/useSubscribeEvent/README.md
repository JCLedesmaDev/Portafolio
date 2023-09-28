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
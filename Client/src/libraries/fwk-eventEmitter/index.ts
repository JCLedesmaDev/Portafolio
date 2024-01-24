/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEmitToSubscribers, ISubscribe, IUnsubscribe } from "./interface";

class EventEmitter {
    private events: any;
    constructor() { this.events = {} }
    /**
     * Subscribirse a la emision de un Evento.
     * @param subscribeEventName - Nombre del evento al que te vas a subscribir
     * @param fnResponseWhenEmitEvent - Funcion de respuesta del subscriptor para cuando reciba una emision 
     * @returns Returna la desubscripcion de la misma subscripcion.
     */
    subscribe ({ subscribeEventName, fnResponseWhenEmitEvent }: ISubscribe) {
        // Verificamos que subscribeEventName NO exista dentro de this.events
        if (!(subscribeEventName in this.events)) {
            this.events[subscribeEventName] = []
        }
        this.events[subscribeEventName].push(fnResponseWhenEmitEvent)
        /* Alternativa para desubscribirse con la funcion del obj que retorna 
           y evitar tener que ejecutar en otro lado manualmente el 
           "this.unsubscribe" con la pasada de parametros. */
        return {
            unsubscribe: () => this.unSubscribe({
                subscribedEventName: subscribeEventName,
                fnResponseWhenEmitEvent
            })
        }
    }

    unSubscribe ({ subscribedEventName, fnResponseWhenEmitEvent }: IUnsubscribe) {
        // Verificamos que subscribedEventName NO exista dentro de this.events
        if (!(subscribedEventName in this.events)) {
            return
        }
        const idx = this.events[subscribedEventName].indexOf(fnResponseWhenEmitEvent)
        if (idx > -1) this.events[subscribedEventName].splice(idx, 1)
        if (this.events[subscribedEventName].length === 0) {
            delete this.events[subscribedEventName]
        }
    }

    emitToSubscribers ({ subscribedEventName, args }: IEmitToSubscribers) {
        if (!(subscribedEventName in this.events)) {
            return
        }
        this.events[subscribedEventName].forEach((fnResponseWhenEmitEvent: any) => {
            fnResponseWhenEmitEvent(args)
        })
    }

    /* se utiliza para registrar un oyente para un evento personalizado, 
       pero con la particularidad de que este oyente solo se ejecutará una 
       vez la primera vez que se emita el evento y luego se desuscribirá 
       automáticamente.*/
    onceSubscribe ({ subscribeEventName, fnResponseWhenEmitEvent }: ISubscribe) {
        const fnCallback = (...args: any) => {
            evt.unsubscribe()
            fnResponseWhenEmitEvent(args)
        }
        const evt = this.subscribe({
            subscribeEventName: subscribeEventName,
            fnResponseWhenEmitEvent: fnCallback
        })
    }
}

const evt = new EventEmitter()
export const evtEmitter = evt
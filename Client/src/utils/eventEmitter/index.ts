/* eslint-disable @typescript-eslint/no-explicit-any */
class EventEmitter {
    events: any;

    constructor() {
        this.events = {}
    }
    on(event: any, listener: any) {
        if (!(event in this.events)) {
            this.events[event] = []
        }
        this.events[event].push(listener)
        return () => this.removeListener(event, listener)
    }
    removeListener(event: any, listener?: any) {
        if (!(event in this.events)) {
            return
        }
        const idx = this.events[event].indexOf(listener)
        if (idx > -1) {
            this.events[event].splice(idx, 1)
        }
        if (this.events[event].length === 0) {
            delete this.events[event]
        }
    }
    emit(event: any, ...args: any) {
        if (!(event in this.events)) {
            return
        }
        this.events[event].forEach((listener: any) => listener(...args))
        console.log("🚀 ~ this.events[event]:", this.events[event])
    }
    once(event: any, listener: any) {
        const remove = this.on(event, (...args: any) => {
            remove()
            listener(...args)
        })
    }
}

const evt = new EventEmitter()
export const evtEmitter = evt
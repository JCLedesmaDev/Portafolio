/* eslint-disable @typescript-eslint/no-explicit-any */
import { evtEmitter } from "@/utils/index.utils";
import { useEffect, useState } from "react";


export const useSubscribeEvent = ({ subscribeEventName, closeSubscribe = false }: any) => {

    const [data, setData] = useState({})

    useEffect(() => {
        console.log("🚀 CUSTOM HOOK useSubscribeEvent:", subscribeEventName)
        // Registrar un oyente para el evento personalizado cuando el componente se monta
        const evt = evtEmitter.subscribe({
            subscribeEventName: subscribeEventName,
            fnResponseWhenEmitEvent: (info: any) => {
                setData((prevData) => ({ ...prevData, ...info }))
            }
        });

        // Eliminar el oyente cuando el componente se desmonta
        return () => { if (closeSubscribe) evt.unsubscribe() };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return data
}
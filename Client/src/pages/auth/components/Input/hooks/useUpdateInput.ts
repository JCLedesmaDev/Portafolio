/* eslint-disable @typescript-eslint/no-explicit-any */
import { evtEmitter } from "@/utils/index.utils";
import { useEffect, useState } from "react";

export const useUpdateInput = (nameEvt: string) => {

    const [data, setData] = useState({})

    useEffect(() => {
        // Registrar un oyente para el evento personalizado cuando el componente se monta
        evtEmitter.on(nameEvt, (info: any) => {
            setData((prevData) => ({
                ...prevData, ...info
            }))
        });

        // Eliminar el oyente cuando el componente se desmonta
        return () => { evtEmitter.removeListener(nameEvt); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return data
}
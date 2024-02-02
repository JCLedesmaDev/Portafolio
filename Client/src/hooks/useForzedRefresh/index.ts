import { useState } from 'react';

export const useForzedRefesh = () => {
    const [, setRefesh] = useState(false)
    return () => {
        setRefesh(prevVal => !prevVal)
    }
}   
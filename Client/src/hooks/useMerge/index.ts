/* eslint-disable @typescript-eslint/no-explicit-any */

export const useMerge = () => {
    const merge = (src: any, val: any, prop: any) => {
        //console.log('MERGE: ', val, prop)
        const v = (typeof (val) !== 'object' || Array.isArray(val)) ? val : JSON.parse(JSON.stringify(val))
        if (prop && prop !== '*') { src[prop] = v }
        if (!prop) { src = { ...src, ...v } }
        if (prop === '*') { src = v }
        return src
    }
    return {
        merge
    }
}
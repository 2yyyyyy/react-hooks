import useMemoizedFn from "../useMemoizedFn";
import { useState } from "react";

function useMap<K, V>(initialValue?: Iterable<readonly [K, V]>) {
    const getInitValue = () => new Map(initialValue);
    const [map, setMap] = useState<Map<K, V>>(getInitValue);

    const set = (key: K, entry: V) => {
        setMap(prev => {
            const newMap = new Map(prev);
            newMap.set(key, entry);
            return newMap;
        });
    }

    const setAll = (newMap: Iterable<readonly [K, V]>) => {
        setMap(new Map(newMap));
    }

    const remove = (key: K) => {
        setMap(prev => {
            const newMap = new Map(prev);
            newMap.delete(key);
            return newMap;
        });
    }

    const reset = () => {
        setMap(getInitValue());
    }

    const get = (key: K) => {
        return map.get(key);
    }

    return [
        map,
        {
            set: useMemoizedFn(set),
            setAll: useMemoizedFn(setAll),
            remove: useMemoizedFn(remove),
            reset: useMemoizedFn(reset),
            get: useMemoizedFn(get),
        }
    ] as const;
}

export default useMap;
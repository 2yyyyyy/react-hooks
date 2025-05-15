import { isFunction } from "../utils";
import isDev from "../utils/isDev"
import useLatest from "../useLatest";
import { useEffect } from "react";

const useUnmount = (fn: () => void) => {
    if (isDev) {
        if (!isFunction(fn)) {
            console.error(`useUnmount expected parameter is a function, got ${typeof fn}`);
        }
    }

    const fnRef = useLatest(fn);

    useEffect(
        () => () => {
            fnRef.current();
        },
        [],
    );
};

export default useUnmount;
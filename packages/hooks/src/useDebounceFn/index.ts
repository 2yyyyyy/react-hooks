import { isFunction } from "../utils";
import { debounce } from '../utils/lodash-polyfill';
import type { DebounceOptions } from "../useDebounce/debounceOptions";
import isDev from "../utils/isDev";
import useLatest from "../useLatest";
import { useMemo } from "react";
import useUnmount from "../useUnmount";


type noop = (...args: any[]) => any;

function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
    if (isDev) {
        if (!isFunction(fn)) {
            console.error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
        }
    }
    const fnRef = useLatest(fn);

    const wait = options?.wait ?? 1000;

    const debounced = useMemo(
        () =>
            debounce(
                (...args: Parameters<T>): ReturnType<T> => {
                    return fnRef.current(...args);
                },
                wait,
                options,
            ),
        [],
    );

    useUnmount(() => {
        debounced.cancel();
    })

    return {
        run: debounced,
        cancel: debounced.cancel,
        flush: debounced.flush,
    }
}

export default useDebounceFn;
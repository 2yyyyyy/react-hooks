import { useState, useEffect } from "react";

import type { DebounceOptions } from "./debounceOptions";
import useDebounceFn from "../useDebounceFn";

function useDebounce<T>(value: T, options?: DebounceOptions) {

    const [debounced, setDebounced] = useState(value);
    const { run } = useDebounceFn(() => {
        setDebounced(value);
    }, options);

    useEffect(() => {
        run();
    }, [value]);

    return debounced;
}

export default useDebounce;
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react'
import useMemoizedFn from '../useMemoizedFn';

type ResetState = () => void;

function useResetState<S>(
    initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, ResetState] {
    const [state, setState] = useState(initialState);

    const resetState = useMemoizedFn(() => {
        setState(initialState);
    })
    return [state, setState, resetState]
}

export default useResetState
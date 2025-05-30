import type { Dispatch, SetStateAction, GetStateAction } from 'react';
import { useState, useRef, useCallback } from 'react';

function useGetState<S>(
    initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useGetState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>,
    GetStateAction<S | undefined>,
];

function useGetState<S>(initialState?: S) {
    const [state, setState] = useState(initialState);
    const stateRef = useRef(state);
    stateRef.current = state;

    const getState = useCallback(() => {
        return stateRef.current;
    }, []);

    return [state, setState, getState];
}

export default useGetState;
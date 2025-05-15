import {useState} from 'react';
import useMemoizedFn from '../useMemoizedFn';

function useSet<K>(initialValue?: Iterable<K>) {
    const getInitValue = () => new Set(initialValue)
    const [set, setSet] = useState<Set<K>>(getInitValue);

    const add = (key: K) => {
        if(set.has(key)){
            return;
        }
        setSet(prev => {
            const newSet = new Set(prev);
            newSet.add(key);
            return newSet;
        })
    }

    const remove = (key: K) => {
        if(!set.has(key)){
            return;
        }
        setSet(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
        })
    }

    const reset = () => {
        setSet(getInitValue())
    }
    
    return [
        set,
        {
            add: useMemoizedFn(add),
            remove: useMemoizedFn(remove),
            reset: useMemoizedFn(reset),
        }
    ]
}

export default useSet;

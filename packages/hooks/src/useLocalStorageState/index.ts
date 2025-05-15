import createUseStorageState from "../createUseStorageState";
import isBorwser from "../utils/isBrowser";

const useLocalStorageState = createUseStorageState(() => 
    isBorwser ? localStorage : undefined
)

export default useLocalStorageState;
import createUseStorageState from "../createUseStorageState";
import isBorwser from "../utils/isBrowser";

const useSessionStorageState  = createUseStorageState(() => 
    isBorwser ? sessionStorage : undefined
)

export default useSessionStorageState;
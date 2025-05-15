const isBorwser = !!(
    typeof window !== 'undefined' && 
    window.document && 
    window.document.createElement
)

export default isBorwser;
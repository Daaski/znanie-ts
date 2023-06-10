export function debounce(callback, delay) {
    let timerId
    return function() {
        clearTimeout(timerId)
        timerId = setTimeout(callback, delay)
    }
}
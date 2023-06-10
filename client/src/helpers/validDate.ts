export function dateIsValid(d) {
    return d instanceof Date && isFinite(d);
}

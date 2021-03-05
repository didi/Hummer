export function isNotEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0
}

export function isOfType<T>(varToBeChecked: unknown, propertyToCheckFor: keyof T): varToBeChecked is T {
    if (!varToBeChecked) {
        return false
    }
    return (varToBeChecked as T)[propertyToCheckFor] !== undefined
}
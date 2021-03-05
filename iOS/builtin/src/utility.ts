export function isNotEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0
}

export function isOfType<T>(varToBeChecked: unknown, propertyToCheckFor: keyof T): varToBeChecked is T {
    return (varToBeChecked as (T | undefined | null))?.[propertyToCheckFor] !== undefined
}
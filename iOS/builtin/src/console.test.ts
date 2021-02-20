import { getNativeLogFunction, LogLevel } from "./console"

test('console', () => {
    globalThis.nativeLoggingHook = jest.fn()
    getNativeLogFunction(LogLevel.info)({})
    expect(globalThis.nativeLoggingHook.mock.calls.length).toBe(1)
    expect(globalThis.nativeLoggingHook.mock.calls[0][0]).toBe('{}')
    globalThis.nativeLoggingHook = undefined
})
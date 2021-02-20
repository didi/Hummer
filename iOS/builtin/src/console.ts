export enum LogLevel {
    trace = 0,
    info,
    warn,
    error
}

const INSPECTOR_LEVELS: string[] = []

INSPECTOR_LEVELS[LogLevel.trace] = 'debug'
INSPECTOR_LEVELS[LogLevel.info] = 'log'
INSPECTOR_LEVELS[LogLevel.warn] = 'warning'
INSPECTOR_LEVELS[LogLevel.error] = 'error'

// Strip the inner function in getNativeLogFunction(), if in dev also
// strip method printing to originalConsole.
// const INSPECTOR_FRAMES_TO_SKIP = globalThis.__DEV__ ? 2 : 1
// const INSPECTOR_FRAMES_TO_SKIP = 2

const groupStack = []

interface Context {
    formatValueCalls: number,
    seen: unknown[],
}

function groupFormat(prefix: string, msg: string) {
    // Insert group formatting before the console message
    return groupStack.join('') + prefix + ' ' + (msg || '')
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar: unknown): ar is unknown[] {
    return Array.isArray(ar)
}

function isBoolean(arg: unknown): arg is boolean {
    return typeof arg === 'boolean'
}

function isNull(arg: unknown): arg is null {
    return arg === null
}

//   function isNullOrUndefined(arg: unknown): arg is null | undefined {
//     return arg == null
//   }

function isNumber(arg: unknown): arg is number {
    return typeof arg === 'number'
}

function isString(arg: unknown): arg is string {
    return typeof arg === 'string'
}

//   function isSymbol(arg: unknown): arg is symbol {
//     return typeof arg === 'symbol'
//   }

function isUndefined(arg: unknown): arg is undefined {
    return arg === void 0
}

function isRegExp(re: unknown): re is RegExp {
    return isObject(re) && objectToString(re) === '[object RegExp]'
}

function isObject(arg: unknown): arg is Record<string, unknown> {
    return typeof arg === 'object' && arg !== null
}

function isDate(d: unknown): d is Date {
    return isObject(d) && objectToString(d) === '[object Date]'
}

function isError(e: unknown): e is Error {
    return (
        isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error)
    )
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(arg: unknown): arg is Function {
    return typeof arg === 'function'
}

function objectToString(o: unknown) {
    return Object.prototype.toString.call(o)
}

function hasOwnProperty(obj: unknown, prop: string) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
}

// function formatPrimitive(ctx: Context, value: unknown) {
function formatPrimitive(value: unknown) {
    // if (isUndefined(value)) return ctx.stylize('undefined', 'undefined')
    if (isUndefined(value)) return 'undefined'
    if (isString(value)) {
        const simple =
            "'" +
            JSON.stringify(value)
                .replace(/^"|"$/g, '')
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"') +
            "'"
        //   return ctx.stylize(simple, 'string')
        return simple
    }
    // if (isNumber(value)) return ctx.stylize('' + value, 'number')
    if (isNumber(value)) return '' + value
    // if (isBoolean(value)) return ctx.stylize('' + value, 'boolean')
    if (isBoolean(value)) return '' + value
    // For some reason typeof null is "object", so special case here.
    // if (isNull(value)) return ctx.stylize('null', 'null')
    if (isNull(value)) return 'null'

    return
}

function arrayToHash(array: string[]) {
    const hash: Record<string, boolean> = {}

    array.forEach(function (val) {
        hash[val] = true
    })

    return hash
}

function formatError(value: unknown) {
    return '[' + Error.prototype.toString.call(value) + ']'
}

function formatProperty(ctx: Context, value: Record<string, unknown> | unknown[], recurseTimes: number | null, visibleKeys: Record<string, boolean>, key: string, array: boolean) {
    let name: string | undefined
    let str = ''
    const desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] }
    if (desc.get) {
        if (desc.set) {
            // str = ctx.stylize('[Getter/Setter]', 'special')
            str = '[Getter/Setter]'
        } else {
            // str = ctx.stylize('[Getter]', 'special')
            str = '[Getter]'
        }
    } else {
        if (desc.set) {
            // str = ctx.stylize('[Setter]', 'special')
            str = '[Setter]'
        }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']'
    }
    if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null)
            } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1)
            }
            if ((str).indexOf('\n') > -1) {
                if (array) {
                    str = str
                        .split('\n')
                        .map(function (line) {
                            return '  ' + line
                        })
                        .join('\n')
                        .substr(2)
                } else {
                    str =
                        '\n' +
                        str
                            .split('\n')
                            .map(function (line) {
                                return '   ' + line
                            })
                            .join('\n')
                }
            }
        } else {
            // str = ctx.stylize('[Circular]', 'special')
            str = '[Circular]'
        }
    }
    if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
            return str
        }
        name = JSON.stringify('' + key)
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2)
            // name = ctx.stylize(name, 'name')
        } else {
            name = name
                .replace(/'/g, "\\'")
                .replace(/\\"/g, '"')
                .replace(/(^"|"$)/g, "'")
            // name = ctx.stylize(name, 'string')
        }
    }

    return name + ': ' + str
}

function formatArray(ctx: Context, value: unknown[], recurseTimes: number | null, visibleKeys: Record<string, boolean>, keys: string[]) {
    const output: string[] = []
    for (let i = 0, l = value.length; i < l; ++i) {
        if (hasOwnProperty(value, String(i))) {
            output.push(
                formatProperty(
                    ctx,
                    value,
                    recurseTimes,
                    visibleKeys,
                    String(i),
                    true,
                ),
            )
        } else {
            output.push('')
        }
    }
    keys.forEach(function (key) {
        if (!key.match(/^\d+$/)) {
            output.push(
                formatProperty(ctx, value, recurseTimes, visibleKeys, key, true),
            )
        }
    })
    return output
}

function formatValue(ctx: Context, value: Record<string, unknown> | unknown[], recurseTimes: number | null) {
    ctx.formatValueCalls++
    if (ctx.formatValueCalls > 200) {
        return `[TOO BIG formatValueCalls ${ctx.formatValueCalls
            } exceeded limit of 200]`
    }

    // Primitive types cannot have properties
    const primitive = formatPrimitive(value)
    if (primitive) {
        return primitive
    }

    // Look up the keys of the object.
    const keys = Object.keys(value)
    const visibleKeys = arrayToHash(keys)

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (
        isError(value) &&
        (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)
    ) {
        return formatError(value)
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
        if (isFunction(value)) {
            const name = value.name ? ': ' + value.name : ''
            // return ctx.stylize('[Function' + name + ']', 'special')

            return '[Function' + name + ']'
        }
        if (isRegExp(value)) {
            // return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp')
            return RegExp.prototype.toString.call(value)
        }
        if (isDate(value)) {
            // return ctx.stylize(Date.prototype.toString.call(value), 'date')
            return Date.prototype.toString.call(value)
        }
        if (isError(value)) {
            return formatError(value)
        }
    }

    let base = '',
        array = false,
        braces = ['{', '}']

    // Make Array say that they are Array
    if (isArray(value)) {
        array = true
        braces = ['[', ']']
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
        const n = value.name ? ': ' + value.name : ''
        base = ' [Function' + n + ']'
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value)
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value)
    }

    // Make error with message first say the error
    if (isError(value)) {
        base = ' ' + formatError(value)
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1]
    }

    if (recurseTimes != null && recurseTimes < 0) {
        if (isRegExp(value)) {
            // return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp')
            return RegExp.prototype.toString.call(value)
        } else {
            // return ctx.stylize('[Object]', 'special')
            return '[Object]'
        }
    }

    ctx.seen.push(value)

    let output: string[] | undefined
    if (array && isArray(value)) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys)
    } else {
        output = keys.map(function (key) {
            return formatProperty(
                ctx,
                value,
                recurseTimes,
                visibleKeys,
                key,
                array,
            )
        })
    }

    ctx.seen.pop()

    return reduceToSingleString(output, base, braces)
}

function reduceToSingleString(output: string[], base: string, braces: string[]) {
    // let numLinesEst = 0
    const length = output.reduce(function (prev, cur) {
        //   numLinesEst++
        //   if (cur.indexOf('\n') >= 0) numLinesEst++
        // 清空颜色
        // eslint-disable-next-line no-control-regex
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1
    }, 0)

    if (length > 60) {
        return (
            braces[0] +
            (base === '' ? '' : base + '\n ') +
            ' ' +
            output.join(',\n  ') +
            ' ' +
            braces[1]
        )
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1]
}

function inspect(obj: Record<string, unknown>, opts: { depth: number }) {
    const ctx = {
        seen: [],
        formatValueCalls: 0,
        // stylize: stylizeNoColor,
    }
    return formatValue(ctx, obj, opts.depth)
}

export function consoleAssertPolyfill(expression: unknown, label: string): void {
    if (!expression) {
        globalThis.nativeLoggingHook('Assertion failed: ' + label, LogLevel.error)
    }
}

export function getNativeLogFunction(level: LogLevel): (...args: unknown[]) => void {
    return (...args: unknown[]) => {
        let str: string | undefined
        if (arguments.length === 1 && typeof args[0] === 'string') {
            str = args[0]
        } else {
            str = Array.prototype.map
                .call(args, function (arg) {
                    return inspect(arg, { depth: 10 })
                })
                .join(', ')
        }

        // TRICKY
        // If more than one argument is provided, the code above collapses them all
        // into a single formatted string. This transform wraps string arguments in
        // single quotes (e.g. "foo" -> "'foo'") which then breaks the "Warning:"
        // check below. So it's important that we look at the first argument, rather
        // than the formatted argument string.
        const firstArg = args[0]

        let logLevel = level
        if (
            typeof firstArg === 'string' &&
            firstArg.slice(0, 9) === 'Warning: ' &&
            logLevel >= LogLevel.error
        ) {
            // Hummer warnings use console.error so that a stack trace is shown,
            // but we don't (currently) want these to show a redbox
            // (Note: Logic duplicated in ExceptionsManager.js.)
            logLevel = LogLevel.warn
        }
        // if (globalThis.__inspectorLog) {
        //     globalThis.__inspectorLog(
        //         INSPECTOR_LEVELS[logLevel],
        //         str,
        //         [].slice.call(args),
        //         INSPECTOR_FRAMES_TO_SKIP,
        //     )
        // }
        if (groupStack.length) {
            str = groupFormat('', str)
        }
        globalThis.nativeLoggingHook(str, logLevel)
    }
}
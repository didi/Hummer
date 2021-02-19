import injectClassModel from "./injectClassModel"

test('injectClassModel() with single class', () => {
    const className = 'View'
    const viewClass = injectClassModel(className, {
    }, {})
    expect(globalThis[className]).toBe(viewClass)
    expect(typeof viewClass === 'function').toBe(true)
    expect(viewClass?.name).toBe(className)
    expect(Object.getPrototypeOf(viewClass?.prototype).constructor.name).toBe('HummerBase')
    globalThis[className] = undefined
})

test('injectClassModel() with prototype chain', () => {
    const viewClassName = 'View'
    const buttonClassName = 'Button'
    const classModelMap = {
        [viewClassName]: {},
        [buttonClassName]: {
            superClassName: viewClassName
        }
    }
    const buttonClass = injectClassModel(buttonClassName, classModelMap[buttonClassName], classModelMap)
    expect(globalThis[viewClassName]).toBeDefined()
    expect(Object.getPrototypeOf(buttonClass?.prototype)).toBe(globalThis[viewClassName].prototype)
    globalThis[viewClassName] = undefined
    globalThis[buttonClassName] = undefined
})

test('injectClassModel() with prototype chain by order', () => {
    const viewClassName = 'View'
    const buttonClassName = 'Button'
    const classModelMap = {
        [viewClassName]: {},
        [buttonClassName]: {
            superClassName: viewClassName
        }
    }
    const viewClass = injectClassModel(viewClassName, classModelMap[viewClassName], classModelMap)
    const buttonClass = injectClassModel(buttonClassName, classModelMap[buttonClassName], classModelMap)
    expect(globalThis[viewClassName]).toBeDefined()
    expect(Object.getPrototypeOf(buttonClass?.prototype)).toBe(viewClass?.prototype)
    globalThis[viewClassName] = undefined
    globalThis[buttonClassName] = undefined
})
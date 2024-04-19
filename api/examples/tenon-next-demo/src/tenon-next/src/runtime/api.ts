import {Plugin, ComponentOptions, Directive} from "@vue/runtime-core"
interface TenonContext{
  plugins: Array<any>,
  mixins: Array<any>,
  components: Array<any>,
  directives: Array<any>
}
export const context:TenonContext = {
  plugins: [],
  mixins: [],
  components: [],
  directives: [],
}

// FIXME:兼容Vue2用法
export const use = (plugin: Plugin, options?: any) => {
  context.plugins.push({
    plugin: plugin,
    options: options
  })
}

// FIXME:兼容Vue2用法
export const mixin = (mixin: ComponentOptions) =>{
  context.mixins.push({
    mixin: mixin
  })
}

// FIXME:兼容Vue2用法
export const component = (name: string, component:any): any => {
  context.components.push({
    name: name,
    component: component
  })
}

// FIXME:兼容Vue2用法
export const directive = (name: string, directive?: Directive) => {
  context.directives.push({
    name: name,
    directive: directive
  })
}

export const install = (app:any) => {
  // Install Plugins
  context.plugins.forEach(item => {
    app.use(item.plugin, item.options)
  })
  // Install Mixins
  context.mixins.forEach(item => {
    app.mixin(item.mixin)
  })
  // Install Components
  context.components.forEach(item => {
    app.component(item.name, item.component)
  })
  // Install Directives
  context.directives.forEach(item => {
    app.directive(item.name, item.directive)
  })
}
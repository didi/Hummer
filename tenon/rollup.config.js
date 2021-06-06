import path from 'path'
import ts from 'rollup-plugin-typescript2'
import strip from '@rollup/plugin-strip';
import json from '@rollup/plugin-json'
import externalGlobals from "rollup-plugin-external-globals";
import replace from '@rollup/plugin-replace'
// 不需要压缩，业务工程自行进行压缩，便于定位问题
// import { terser } from "rollup-plugin-terser";

const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const name = path.basename(packageDir)
const resolve = p => path.resolve(packageDir, p)
const isProduction = process.env.NODE_ENV === 'production'

const outputConfig = {
  es: {
    file: resolve(`dist/${name}.es.js`),
    format: `es`
  },
  global: {
    file: resolve(`dist/${name}.js`),
    format: `iife`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  }
}

const packageConfigs = Object.keys(outputConfig).map(format => {
  return createConfig(format, outputConfig[format])
}) 

export default packageConfigs


function createConfig(format, output, plugins = []) {
  let external = []
  const entryFile =  `src/index.ts` 
  output.sourcemap = true
  output.externalLiveBindings = false
  output.name = `index.${format}`
  if(/global/.test(format)){
    output.name = 'tenon'
  }
  if(process.env.TARGET === 'tenon-store'){
    external = ['@hummer/tenon-vue']
  }else if(process.env.TARGET === 'tenon-react'){
    // 防止tenon-react npm link 后 ，react 打包进项目中，导致工程项目由于 link 双份失效的问题
    external = ['react']
  }
  const tsPlugin = ts({
    check: true,
    tsconfig: path.resolve(packageDir, 'tsconfig.json'),
    cacheRoot: path.resolve(packageDir, 'node_modules/.rts2_cache'),
    useTsconfigDeclarationDir: true,
    tsconfigDefaults: {
      declaration: true,
      declarationDir: 'dist/types'
    },
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap
      },
      exclude: ['**/__tests__', 'test-dts']
    }
  })

  const nodePlugins = format !== 'cjs'
    ? [
        require('@rollup/plugin-node-resolve').nodeResolve({
          preferBuiltins: true
        }),
        require('@rollup/plugin-commonjs')({
          sourceMap: false
        }),
        require('rollup-plugin-node-builtins')(),
        require('rollup-plugin-node-globals')()
      ]
    : []
  const stripPlugins = isProduction ? [strip({
    include: ['**/*.ts'],
    functions: ['console.*'],
  })]:[]
  return {
    input: resolve(entryFile),
    external: ['@hummer/hummer-front', ...external],
    plugins: [
      json({
        namedExports: false
      }),
      ...nodePlugins,
      tsPlugin,
      createReplacePlugin(),
      ...plugins,
      ...stripPlugins,
      externalGlobals({
        '@hummer/hummer-front': '__GLOBAL__'
      }),
      // terser()
    ],
    output,
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
    treeshake: {
      moduleSideEffects: false
    }
  }
}

function createReplacePlugin(){
  const replacements = {
    __GLOBAL__: '__GLOBAL__',
    __DEV__: false,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
  }
  Object.keys(replacements).forEach(key => {
    if(key in process.env){
      replacements[key] = process.env[key]
    }
  })
  return replace({
    preventAssignment: true,
    values: replacements
  })
}

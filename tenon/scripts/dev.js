/**
 * dev 脚本
 */
const execa = require('execa')
const targets = ['tenon-compiler', 'tenon-utils', 'tenon-vue', 'tenon-store', 'tenon']

run()
async function run(){
  await buildAll(targets)
}

async function buildAll(targets){
  for(const target of targets){
    await build(target)
  }
}

async function build(target){
  execa(
    'rollup',
    [
      '-wc',
      '--environment',
      [
        `TARGET:${target}`
      ]
        .filter(Boolean)
        .join(',')
    ],
    {
      stdio: 'inherit'
    }
  )
}


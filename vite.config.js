export default {
  build: {
    outDir: 'docs'
  },
  base: '/coviz19/',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'f',
    jsxInject: `import {h, f} from 'jsx-pragma'`
  }
}
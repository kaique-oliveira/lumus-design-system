import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  fixedExtension: true,
  platform: 'browser',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
})

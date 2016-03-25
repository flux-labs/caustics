
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/reflection.test.js',
  dest: 'dist/reflection.test.js',
  format: 'cjs',
  external: ['gl-matrix'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: 'es2015-rollup'
    }),
    commonjs(),
    nodeResolve({
      jsnext: true,
      main: true,
      skip: [ 'gl-matrix' ],
    })
  ]
}
import { rollup } from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: 'blocks',
  plugins: [
    nodeResolve({
      jsnext: true,
      skip: [ 'gl-matrix' ],
    }),
    commonjs()
  ]
}
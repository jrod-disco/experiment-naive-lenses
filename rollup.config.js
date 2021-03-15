import html from 'rollup-plugin-html2';
import scss from 'rollup-plugin-scss';
import json from '@rollup/plugin-json';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';
import dotenv from 'dotenv';

const isClean = process.env.BUILD === 'clean';
const isProd = process.env.BUILD === 'prod';
const isDev = process.env.BUILD === 'dev';

dotenv.config();

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/app.js',
        format: 'iife',
        sourcemap: true,
      },
    ],
    watch: {
      watch: {
        include: 'src/**',
      },
    },
    plugins: [
      resolve({ base: 'src', browser: true, preferBuiltins: false }),

      typescript({
        typescript: ttypescript,
      }),
      scss(),
      html({ template: './src/index.html', inject: false }),
      json({
        compact: true,
      }),
      (isProd || isClean) && terser(),
      isProd &&
        strip({
          exclude: ['./src/util/jrvascii.ts'],
          include: ['**/*.js', '**/*.ts'],
        }),
      isDev && serve('dist/'),
      isDev && livereload(),
    ],
  },
];

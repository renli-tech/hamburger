import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import sourceMaps from "rollup-plugin-sourcemaps";
import camelCase from "lodash.camelcase";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import path from "path";
import fs from "fs-extra";

const pkg = require("./package.json");

const libraryName = "@hamburger/recipe";

const tsconfigOverride = {
  compilerOptions: {
    sourceMap: true,
    mapRoot: "dist",
  },
};

const EXTENSIONS = [`.ts`, `.tsx`, `.js`, `.jsx`, `.es6`, `.es`, `.mjs`];

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: "umd",
      sourcemap: true,
    },
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: "cjs",
      sourcemap: true,
    },
    { file: pkg.module, format: "es", sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: "src/**",
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      typescript: require(`typescript`),
      tsconfigOverride,
      rollupCommonJSResolveHack: true,
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    babel({
      babelHelpers: `bundled`,
      extensions: EXTENSIONS,
      exclude: `node_modules/**`,
    }),

    // Resolve source maps to the original source
    sourceMaps(),
    terser(),
  ],
};

export const copy = (source, dest) => {
  return {
    name: `copy`,
    generateBundle(opts, bundle, isWrite) {
      if (!isWrite) return;
      const cwd = process.cwd();
      const destDir = path.join(cwd, dest);
      const sourceDir = path.join(cwd, source);

      fs.ensureDirSync(destDir);
      fs.copySync(sourceDir, destDir);
    },
  };
};

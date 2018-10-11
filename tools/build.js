const { green, cyan, red } = require('chalk');

const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');

const targets = process.argv.slice(2);
const stdio = ['pipe', 'pipe', 'inherit'];

const srcRoot = path.join(__dirname, '../packages/');
const libRoot = path.join(__dirname, '../lib/');
const esRoot = path.join(__dirname, '../es/');

const clean = async dir => fse.existsSync(dir) && fse.remove(dir);

const step = (name, root, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await clean(root);
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const has = t => !targets.length || targets.includes(t);

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', libRoot, () =>
  execa.shell(`npx babel ${srcRoot} --out-dir ${libRoot} --env-name "lib"`, {
    stdio,
  }),
);

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', esRoot, () =>
  execa.shell(`npx babel ${srcRoot} --out-dir ${esRoot} --env-name "esm"`, {
    stdio,
  }),
);

/**
 * Bundles a minified and unminified version of react-bootstrap including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`),
);

Promise.all([has('lib') && buildLib(), has('es') && buildEsm()]).catch(err => {
  if (err) console.error(red(err.stack || err.toString()));
  process.exit(1);
});

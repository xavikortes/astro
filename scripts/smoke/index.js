/** @file Runs all smoke tests and may add extra smoke-test dependencies to `yarn.lock`. */

// @ts-check

import { execa } from 'execa';
import { polyfill } from '@astropub/webapi';
import { fileURLToPath } from 'node:url';
import { promises as fs } from 'node:fs';

polyfill(globalThis, { exclude: 'window document' });

/* Configuration
/* -------------------------------------------------------------------------- */

/** URL directory containing this current script. */
const scriptDir = new URL('./', import.meta.url);

/** URL directory containing the entire project. */
const rootDir = new URL('../../', import.meta.url);

/** URL directory containing the example subdirectories. */
const exampleDir = new URL('examples/', rootDir);
const smokeDir = new URL('smoke/', rootDir);

/** URL directory containing the Astro package. */
const astroDir = new URL('packages/astro/', rootDir);

/* Application
/* -------------------------------------------------------------------------- */

/** Runs all smoke tests. */
async function run() {
	console.log('');

	const directories = [...await getChildDirectories(exampleDir), ...await getChildDirectories(smokeDir)];

	console.log('🤖', 'Preparing', 'yarn');

	await execa('yarn', [], { cwd: fileURLToPath(rootDir), stdio: 'inherit' });

	for (const directory of directories) {
		console.log('🤖', 'Testing', directory.pathname.split('/').at(-1));

		try {
			await execa('yarn', ['run', 'build'], { cwd: fileURLToPath(directory), stdio: 'inherit' });
		} catch (err) {
			console.log(err);

			process.exit(1);
		}

		console.log();
	}
}

/** Returns all child directories of the given directory. */
const getChildDirectories = async (/** @type {URL} */ dir) => {
	/** @type {URL[]} */
	const dirs = [];

	for await (const dirent of await fs.opendir(dir)) {
		if (dirent.isDirectory()) {
			dirs.push(new URL(dirent.name, dir));
		}
	}

	return dirs;
};

run();

/** @typedef {{ org: string, name: string, branch: string }} GithubOpts */

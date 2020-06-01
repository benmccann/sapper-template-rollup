import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svelte from 'rollup-plugin-svelte';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			url({
				publicPath: '/client/'
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			})
		],

		preserveEntrySignatures: false,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			svelte({
				generate: 'ssr',
				dev
			}),
			url({
				publicPath: '/client/',
				emitFiles: false // already emitted by client build
			}),
			resolve({
				dedupe: ['svelte']
			})
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		preserveEntrySignatures: 'strict',
	}
};

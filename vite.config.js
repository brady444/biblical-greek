/* eslint-disable camelcase */

import { splitVendorChunkPlugin } from "vite";
import eslint from "vite-plugin-eslint";
import stylelint from "vite-plugin-stylelint";
import replace from "vite-plugin-filter-replace";
import { watch } from "vite-plugin-watch";

export default {
	root: "ui",
	
	build: {
		target: "esnext",
		outDir: "../docs",
		emptyOutDir: true,
		minify: "terser",
		
		terserOptions: {
			compress: {
				arguments: true,
				drop_console: true,
				ecma: "latest",
				passes: 2,
				toplevel: true
			},
			
			mangle: {
				toplevel: true,
				properties: true
			}
		}
	},
	
	server: {
		host: true
	},
	
	json: {
		stringify: true
	},
	
	// Workaround to make Vite watch for changes in the parser directory, so that vite-watch can auto-run the parser on changes
	envDir: "../parser",
	
	plugins: [
		splitVendorChunkPlugin (),
		eslint (),
		stylelint (),
		
		replace.default ([
			{
				filter: /.js$/u,
				
				replace: {
					from: "\t",
					to: ""
				}
			}
		]),
		
		watch ({
			pattern: "../parser/**/*",
			command: "bun parser",
			timeout: 0,
			onInit: false
		})
	]
};

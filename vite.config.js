import { splitVendorChunkPlugin } from "vite";
import eslint from "vite-plugin-eslint";
import stylelint from "vite-plugin-stylelint";
import replace from "vite-plugin-filter-replace";

export default {
	root: "ui",
	
	build: {
		outDir: "../docs"
	},
	
	server: {
		host: true
	},
	
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
		])
	]
};
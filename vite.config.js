import eslint from "vite-plugin-eslint";
import stylelint from "vite-plugin-stylelint";

export default {
	root: "ui",
	
	build: {
		outDir: "../docs"
	},
	
	server: {
		host: true
	},
	
	plugins: [
		eslint (),
		stylelint ()
	]
};
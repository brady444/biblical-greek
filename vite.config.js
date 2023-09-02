import eslint from "vite-plugin-eslint";
import stylelint from "vite-plugin-stylelint";

export default {
	root: "ui",
	
	build: {
		outDir: "../docs"
	},
	
	define: {
		"\t": "",
		"\t$": "$"
	},
	
	plugins: [
		eslint (),
		stylelint ()
	]
};
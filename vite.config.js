import eslint from "vite-plugin-eslint";
import stylelint from "vite-plugin-stylelint";

export default {
	define: {
		"\t": "",
		"\t$": "$"
	},
	
	build: {
		outDir: "docs"
	},
	
	plugins: [
		eslint (),
		stylelint ()
	]
};
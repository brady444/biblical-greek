const pages = {};

const pageImports = import.meta.glob ("/src/pages/*.js", { eager: true });

for (const path in pageImports) {
	pages [path.slice (11, -3)] = pageImports [path].default;
}

export default pages;

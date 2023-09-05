export default {
	trimEndComma: string => string.endsWith (",") ? string.slice (0, -1) : string,
	
	removeNumbers: string => string.replaceAll (/\d/gu, ""),
	
	simplifyGreek: text => text
		.normalize ("NFD")
		.replaceAll (/\p{Diacritic}/gu, "")
		.replaceAll ("ς", "σ")
		.replaceAll ("⸂", "")
		.replaceAll ("⸃", "")
		.replaceAll ("\"", "")
		.toLowerCase ()
};
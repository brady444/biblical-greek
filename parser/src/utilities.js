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
		.toLowerCase (),
	
	// getPartOfSpeech: tag => {
	// 	if (tag.startsWith ("n-")) {
	// 		return "noun";
	// 	}
		
	// 	if (tag.startsWith ("a-")) {
	// 		return "adjective";
	// 	}
		
	// 	if (tag.startsWith ("v-")) {
	// 		return "verb";
	// 	}
		
	// 	if (tag === "conj") {
	// 		return "conjunction";
	// 	}
		
	// 	if (tag === "prep") {
	// 		return "preposition";
	// 	}
		
	// 	return tag;
	// },
	
	formatGloss: gloss => gloss
		.replaceAll (";\n", "\n")
		.replaceAll ("; ", "\n")
		.replaceAll ("nom:", "nominative:")
		.replaceAll ("gen:", "genitive:")
		.replaceAll ("dat:", "dative:")
		.replaceAll ("acc:", "accusative:")
		.replaceAll ("sg:", "singular:")
		.replaceAll ("pl:", "plural:")
		.replaceAll ("conj:", "conjunction:")
		.replaceAll ("prep (nom):", "preposition (nominative):")
		.replaceAll ("prep (gen):", "preposition (genitive):")
		.replaceAll ("prep (dat):", "preposition (dative):")
		.replaceAll ("prep (acc):", "preposition (accusative):")
		.replaceAll ("inten.p.", "intensive pronoun")
		.replaceAll ("trans:", "transitive:")
		.replaceAll ("intrans:", "intransitive:")
		.replaceAll ("adj:", "adjective:")
		.replaceAll ("adv:", "adverb:")
		.replaceAll ("Spatially:", "spatially:")
		.replaceAll ("(nom.)", "nominative:")
		.replaceAll ("(gen.)", "genitive:")
		.replaceAll ("(dat.)", "dative:")
		.replaceAll ("(acc.)", "accusative:")
		.replaceAll ("(s.)", "singular:")
		.replaceAll ("(pl.)", "plural:")
		.replaceAll ("(sg)", "(singular)")
		.replaceAll ("(pl)", "(plural)")
		.replaceAll ("adv.", "adverb")
		.replaceAll (". Spatially", "; spatially")
		.replaceAll ("(pass.)", "(passive)")
	
	// getGntUrl: reference => {
	// 	const book = reference.split (" ").slice (0, -1).join (" ");
	// 	const numbers = reference.split (" ").slice (-1) [0].split (":");
		
	// 	const link = "https://www.gntreader.com/?c=" + numbers [0] + "&v=" + numbers [1] + "&b=";
		
	// 	switch (book) {
	// 		case "Matthew": {
	// 			return link + "MT";
	// 		}

	// 		case "Mark": {
	// 			return link + "MR";
	// 		}

	// 		case "Luke": {
	// 			return link + "LU";
	// 		}

	// 		case "John": {
	// 			return link + "JOH";
	// 		}

	// 		case "Acts": {
	// 			return link + "AC";
	// 		}

	// 		case "Romans": {
	// 			return link + "RO";
	// 		}

	// 		case "1 Corinthians": {
	// 			return link + "1CO";
	// 		}

	// 		case "2 Corinthians": {
	// 			return link + "2CO";
	// 		}

	// 		case "Galatians": {
	// 			return link + "GA";
	// 		}

	// 		case "Ephesians": {
	// 			return link + "EPH";
	// 		}

	// 		case "Philippians": {
	// 			return link + "PHP";
	// 		}

	// 		case "Colossians": {
	// 			return link + "COL";
	// 		}

	// 		case "1 Thessalonians": {
	// 			return link + "1TH";
	// 		}

	// 		case "2 Thessalonians": {
	// 			return link + "2TH";
	// 		}

	// 		case "1 Timothy": {
	// 			return link + "1TI";
	// 		}

	// 		case "2 Timothy": {
	// 			return link + "2TI";
	// 		}

	// 		case "Titus": {
	// 			return link + "TIT";
	// 		}

	// 		case "Philemon": {
	// 			return link + "PHM";
	// 		}

	// 		case "Hebrews": {
	// 			return link + "HEB";
	// 		}

	// 		case "James": {
	// 			return link + "JAS";
	// 		}

	// 		case "1 Peter": {
	// 			return link + "1PE";
	// 		}

	// 		case "2 Peter": {
	// 			return link + "2PE";
	// 		}

	// 		case "1 John": {
	// 			return link + "1JO";
	// 		}

	// 		case "2 John": {
	// 			return link + "2JO";
	// 		}

	// 		case "3 John": {
	// 			return link + "3JO";
	// 		}

	// 		case "Jude": {
	// 			return link + "JUDE";
	// 		}

	// 		case "Revelation": {
	// 			return link + "RE";
	// 		}
			
	// 		default: {
	// 			return link;
	// 		}
	// 	}
	// }
};
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
};
export default {
	morphGntFolderPath: "parser/data/morphgnt/",
	
	outputFilePath: "ui/res/data.json",
	
	invalidCharacterRegex: /.*[\w[\]\\{}|;:,<.>/?@$%^_=+"'~`*()-].*/giu,
	invalidRootsCharacterRegex: /.*[\w[\]\\{}|;:,<.>?@$%^_="'~`-].*/giu,
	
	overrides: {},
	
	// Used for sorting forms
	formUseProperties: {
		mood: [
			"indicative",
			"imperative",
			"subjunctive",
			"optative",
			"infinitive",
			"participle"
		],
		
		tense: [
			"present",
			"imperfect",
			"future",
			"aorist",
			"perfect",
			"pluperfect"
		],
		
		voice: [
			"active",
			"middle",
			"passive"
		],
		
		number: [
			"singular",
			"plural"
		],
		
		person: [
			"1st",
			"2nd",
			"3rd"
		],
		
		case: [
			"nominative",
			"genitive",
			"dative",
			"accusative",
			"vocative"
		],
		
		gender: [
			"masculine",
			"feminine",
			"neuter"
		],
		
		declension: [
			"1st",
			"2nd",
			"3rd"
		],
		
		degree: [
			"comparative",
			"superlative"
		],
		
		partOfSpeech: [
			"noun",
			"adjective",
			"verb",
			"adverb",
			"conjunction",
			"personal pronoun",
			"preposition",
			"particle",
			"demonstrative pronoun",
			"interrogative/indefinite pronoun",
			"definite article",
			"relative pronoun"
		]
	}
};
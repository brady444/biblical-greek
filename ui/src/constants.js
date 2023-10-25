import utilities from "./utilities.js";
import data from "/res/data.js";

const constants = {
	// Import data from the parser
	vocabulary: data.vocabulary,
	newTestament: data.newTestament,
	errors: data.errors,
	
	vocabularyMap: [],
	vocabularyNumberMap: {},
	vocabularyFormsMap: {},
	
	newTestamentBooks: [
		"Matthew",
		"Mark",
		"Luke",
		"John",
		"Acts",
		"Romans",
		"1 Corinthians",
		"2 Corinthians",
		"Galatians",
		"Ephesians",
		"Philippians",
		"Colossians",
		"1 Thessalonians",
		"2 Thessalonians",
		"1 Timothy",
		"2 Timothy",
		"Titus",
		"Philemon",
		"Hebrews",
		"James",
		"1 Peter",
		"2 Peter",
		"1 John",
		"2 John",
		"3 John",
		"Jude",
		"Revelation"
	],
	
	newTestamentChapterCounts: [],
	
	// Used for tooltips on principal parts
	principalParts: ["Present", "Future Active/Middle", "Aorist Active/Middle", "Perfect Active", "Perfect Middle/Passive", "Aorist Passive"],
	
	practiceVocabularyChoiceCount: 8,
	
	// Used for parsing mode on the practice page
	formUseProperties: [
		{
			name: "person",
			formattedName: "Person",
			
			values: [
				"1st",
				"2nd",
				"3rd"
			]
		},
		
		{
			name: "case",
			formattedName: "Case",
			
			values: [
				"Nominative",
				"Genitive",
				"Dative",
				"Accusative",
				"Vocative"
			]
		},
		
		{
			name: "number",
			formattedName: "Number",
			
			values: [
				"Singular",
				"Plural"
			]
		},
		
		{
			name: "gender",
			formattedName: "Gender",
			
			values: [
				"Masculine",
				"Feminine",
				"Neuter"
			]
		},
		
		{
			name: "tense",
			formattedName: "Tense",
			
			values: [
				"Present",
				"Imperfect",
				"Future",
				"Aorist",
				"Perfect",
				"Pluperfect"
			]
		},
		
		{
			name: "voice",
			formattedName: "Voice",
			
			values: [
				"Active",
				"Middle",
				"Passive"
			]
		},
		
		{
			name: "mood",
			formattedName: "Mood",
			
			values: [
				"Indicative",
				"Imperative",
				"Subjunctive",
				"Optative",
				"Infinitive",
				"Participle"
			]
		}
	],
	
	paradigms: {
		Nouns: {
			"Case Endings": {
				columnLabels: [
					"",
					"Masculine\n(2nd)",
					"Feminine\n(1st)",
					"Neuter\n(2nd)",
					"Masculine/\nFeminine\n(3rd)",
					"Neuter\n(3rd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "ς" },
					{ text: "–" },
					{ text: "ν" },
					{ text: "ς" },
					{ text: "–" },
					
					{ text: "υ" },
					{ text: "ς" },
					{ text: "υ" },
					{ text: "ος" },
					{ text: "ος" },
					
					{ text: "ͺ" },
					{ text: "ͺ" },
					{ text: "ͺ" },
					{ text: "ι" },
					{ text: "ι" },
					
					{ text: "ν" },
					{ text: "ν" },
					{ text: "ν" },
					{ text: "α / ν" },
					{ text: "–" },
					
					{ text: "ι" },
					{ text: "ι" },
					{ text: "α", underlined: true },
					{ text: "ες" },
					{ text: "α" },
					
					{ text: "ων", underlined: true },
					{ text: "ων", underlined: true },
					{ text: "ων", underlined: true },
					{ text: "ων" },
					{ text: "ων" },
					
					{ text: "ις" },
					{ text: "ις" },
					{ text: "ις" },
					{ text: "σι(ν)" },
					{ text: "σι(ν)" },
					
					{ text: "υς" },
					{ text: "ς" },
					{ text: "α", underlined: true },
					{ text: "ας" },
					{ text: "α" }
				]
			}
		},
		
		Verbs: {
			"Personal Endings": {
				columnLabels: [
					"",
					"Primary\nActive",
					"Primary\nMiddle/Passive",
					"Secondary\nActive",
					"Secondary\nMiddle/Passive"
				],
				
				rowLabels: [
					"1st Person\nSingular",
					"2nd Person\nSingular",
					"3rd Person\nSingular",
					"1st Person\nPlural",
					"2nd Person\nPlural",
					"3rd Person\nPlural"
				],
				
				elements: [
					{ text: "–" },
					{ text: "μαι" },
					{ text: "ν" },
					{ text: "μην" },
					
					{ text: "ς" },
					{ text: "σαι" },
					{ text: "ς" },
					{ text: "σο" },
					
					{ text: "ι" },
					{ text: "ται" },
					{ text: "–" },
					{ text: "το" },
					
					{ text: "μεν" },
					{ text: "μεθα" },
					{ text: "μεν" },
					{ text: "μεθα" },
					
					{ text: "τε" },
					{ text: "σθε" },
					{ text: "τε" },
					{ text: "σθε" },
					
					{ text: "νσι" },
					{ text: "νται" },
					{ text: "ν" },
					{ text: "ντο" }
				]
			},
			
			"Personal Endings (Inflected)": {
				columnLabels: [
					"",
					"Primary\nActive",
					"Primary\nMiddle/Passive",
					"Secondary\nActive",
					"Secondary\nMiddle/Passive"
				],
				
				rowLabels: [
					"1st Person\nSingular",
					"2nd Person\nSingular",
					"3rd Person\nSingular",
					"1st Person\nPlural",
					"2nd Person\nPlural",
					"3rd Person\nPlural"
				],
				
				elements: [
					{ text: "ω" },
					{ text: "ομαι" },
					{ text: "ον" },
					{ text: "ομην" },
					
					{ text: "εις" },
					{ text: "ῃ" },
					{ text: "ες" },
					{ text: "ου" },
					
					{ text: "ει" },
					{ text: "εται" },
					{ text: "ε(ν)" },
					{ text: "ετο" },
					
					{ text: "ομεν" },
					{ text: "ομεθα" },
					{ text: "ομεν" },
					{ text: "ομεθα" },
					
					{ text: "ετε" },
					{ text: "εσθε" },
					{ text: "ετε" },
					{ text: "εσθε" },
					
					{ text: "ουσι(ν)" },
					{ text: "ονται" },
					{ text: "ον" },
					{ text: "οντο" }
				]
			},
			
			"Indicative Verb Forms": {
				elementFontClass: "medium-font",
				
				columnLabels: [
					"Tense",
					"Augment/\nReduplication",
					"Tense\nStem",
					"Tense\nFormative",
					"Connecting\nVowel",
					"Personal\nEndings"
				],
				
				elements: [
					{ text: "Present Active" },
					{ answered: true },
					{ text: "Present" },
					{ answered: true },
					{ text: "ο/ε" },
					{ text: "Primary Active" },
					
					{ text: "Present Middle/Passive" },
					{ answered: true },
					{ text: "Present" },
					{ answered: true },
					{ text: "ο/ε" },
					{ text: "Primary Middle/Passive" },
					
					{ text: "Imperfect Active" },
					{ text: "ε" },
					{ text: "Present" },
					{ answered: true },
					{ text: "ο/ε" },
					{ text: "Secondary Active" },
					
					{ text: "Imperfect Middle/Passive" },
					{ text: "ε" },
					{ text: "Present" },
					{ answered: true },
					{ text: "ο/ε" },
					{ text: "Secondary Middle/Passive" },
					
					{ text: "Future Active" },
					{ answered: true },
					{ text: "Future Active" },
					{ text: "σ" },
					{ text: "ο/ε" },
					{ text: "Primary Active" },
					
					{ text: "Liquid Future Active" },
					{ answered: true },
					{ text: "Future Active" },
					{ text: "εσ" },
					{ text: "ο/ε" },
					{ text: "Primary Active" },
					
					{ text: "Future Middle" },
					{ answered: true },
					{ text: "Future Active" },
					{ text: "σ" },
					{ text: "ο/ε" },
					{ text: "Primary Middle/Passive" },
					
					{ text: "Liquid Future Middle" },
					{ answered: true },
					{ text: "Future Active" },
					{ text: "εσ" },
					{ text: "ο/ε" },
					{ text: "Primary Middle/Passive" },
					
					{ text: "1st Future Passive" },
					{ answered: true },
					{ text: "Aorist Passive" },
					{ text: "θησ" },
					{ text: "ο/ε" },
					{ text: "Primary Middle/Passive" },
					
					{ text: "2nd Future Passive" },
					{ answered: true },
					{ text: "Aorist Passive" },
					{ text: "ησ" },
					{ text: "ο/ε" },
					{ text: "Primary Middle/Passive" },
					
					{ text: "1st Aorist Active" },
					{ text: "ε" },
					{ text: "Aorist Active" },
					{ text: "σα" },
					{ answered: true },
					{ text: "Secondary Active" },
					
					{ text: "Liquid Aorist Active" },
					{ text: "ε" },
					{ text: "Aorist Active" },
					{ text: "α" },
					{ answered: true },
					{ text: "Secondary Middle/Passive" },
					
					{ text: "2nd Aorist Active" },
					{ text: "ε" },
					{ text: "Aorist Active" },
					{ answered: true },
					{ text: "ο/ε" },
					{ text: "Secondary Active" },
					
					{ text: "1st Aorist Middle" },
					{ text: "ε" },
					{ text: "Aorist Active" },
					{ text: "σα" },
					{ answered: true },
					{ text: "Secondary Middle/Passive" },
					
					{ text: "2nd Aorist Middle" },
					{ text: "ε" },
					{ text: "Aorist Active" },
					{ answered: true },
					{ text: "ο/ε" },
					{ text: "Secondary Middle/Passive" },
					
					{ text: "1st Aorist Passive" },
					{ text: "ε" },
					{ text: "Aorist Passive" },
					{ text: "θη" },
					{ answered: true },
					{ text: "Secondary Active" },
					
					{ text: "2nd Aorist Passive" },
					{ text: "ε" },
					{ text: "Aorist Passive" },
					{ text: "η" },
					{ answered: true },
					{ text: "Secondary Active" },
					
					{ text: "1st Perfect Active" },
					{ text: "λε" },
					{ text: "Perfect Active" },
					{ text: "κα" },
					{ answered: true },
					{ text: "Primary Active" },
					
					{ text: "2nd Perfect Active" },
					{ text: "λε" },
					{ text: "Perfect Active" },
					{ text: "α" },
					{ answered: true },
					{ text: "Primary Active" },
					
					{ text: "Perfect Middle/Passive" },
					{ text: "λε" },
					{ text: "Perfect Passive" },
					{ answered: true },
					{ answered: true },
					{ text: "Primary Middle/Passive" }
				]
			}
		},
		
		Article: {
			ὁ: {
				columnLabels: [
					"",
					"Masculine\n(2nd)",
					"Feminine\n(1st)",
					"Neuter\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "ὁ" },
					{ text: "ἡ" },
					{ text: "τό" },
					
					{ text: "τοῦ" },
					{ text: "τῆς" },
					{ text: "τοῦ" },
					
					{ text: "τῷ" },
					{ text: "τῇ" },
					{ text: "τῷ" },
					
					{ text: "τόν" },
					{ text: "τήν" },
					{ text: "τό" },
					
					{ text: "οἱ" },
					{ text: "αἱ" },
					{ text: "τά" },
					
					{ text: "τῶν" },
					{ text: "τῶν" },
					{ text: "τῶν" },
					
					{ text: "τοῖς" },
					{ text: "ταῖς" },
					{ text: "τοῖς" },
					
					{ text: "τούς" },
					{ text: "τάς" },
					{ text: "τά" }
				]
			}
		},
		
		Pronouns: {
			"ἐγώ / σύ": {
				columnLabels: [
					"",
					"First Person",
					"Second Person"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "ἐγώ" },
					{ text: "σύ" },
					
					{ text: "μου (ἐμοῦ)" },
					{ text: "σου (σοῦ)" },
					
					{ text: "μοι (ἐμοί)" },
					{ text: "σοι (σοί)" },
					
					{ text: "με (ἐμέ)" },
					{ text: "σε (σέ)" },
					
					{ text: "ἡμεῖς" },
					{ text: "ὑμεῖς" },
					
					{ text: "ἡμῶν" },
					{ text: "ὑμῶν" },
					
					{ text: "ἡμῖν" },
					{ text: "ὑμῖν" },
					
					{ text: "ἡμᾶς" },
					{ text: "ὑμᾶς" }
				]
			},
			
			αὐτός: {
				columnLabels: [
					"",
					"Masculine\n(2nd)",
					"Feminine\n(1st)",
					"Neuter\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "αὐτός" },
					{ text: "αὐτή" },
					{ text: "αὐτό" },
					
					{ text: "αὐτοῦ" },
					{ text: "αὐτῆς" },
					{ text: "αὐτοῦ" },
					
					{ text: "αὐτῷ" },
					{ text: "αὐτῇ" },
					{ text: "αὐτῷ" },
					
					{ text: "αὐτόν" },
					{ text: "αὐτήν" },
					{ text: "αὐτό" },
					
					{ text: "αὐτοί" },
					{ text: "αὐταί" },
					{ text: "αὐτά" },
					
					{ text: "αὐτῶν" },
					{ text: "αὐτῶν" },
					{ text: "αὐτῶν" },
					
					{ text: "αὐτοῖς" },
					{ text: "αὐταῖς" },
					{ text: "αὐτοῖς" },
					
					{ text: "αὐτούς" },
					{ text: "αὐτάς" },
					{ text: "αὐτά" }
				]
			},
			
			ὅς: {
				columnLabels: [
					"",
					"Masculine\n(2nd)",
					"Feminine\n(1st)",
					"Neuter\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "ὅς" },
					{ text: "ἥ" },
					{ text: "ὅ" },
					
					{ text: "οὗ" },
					{ text: "ἧς" },
					{ text: "οὗ" },
					
					{ text: "ᾧ" },
					{ text: "ᾗ" },
					{ text: "ᾧ" },
					
					{ text: "ὅν" },
					{ text: "ἥν" },
					{ text: "ὅ" },
					
					{ text: "οἵ" },
					{ text: "αἵ" },
					{ text: "ἅ" },
					
					{ text: "ὧν" },
					{ text: "ὧν" },
					{ text: "ὧν" },
					
					{ text: "οἷς" },
					{ text: "αἷς" },
					{ text: "οἷς" },
					
					{ text: "οὕς" },
					{ text: "ἅς" },
					{ text: "ἅ" }
				]
			}
		},
		
		Demonstratives: {
			οὗτος: {
				columnLabels: [
					"",
					"Masculine\n(2nd)",
					"Feminine\n(1st)",
					"Neuter\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "οὗτος" },
					{ text: "αὕτη" },
					{ text: "τοῦτο" },
					
					{ text: "τούτου" },
					{ text: "ταύτης" },
					{ text: "τούτου" },
					
					{ text: "τούτῳ" },
					{ text: "ταύτῃ" },
					{ text: "τούτῳ" },
					
					{ text: "τοῦτον" },
					{ text: "ταύτην" },
					{ text: "τοῦτο" },
					
					{ text: "οὗτοι" },
					{ text: "αὗται" },
					{ text: "ταῦτα" },
					
					{ text: "τούτων" },
					{ text: "τούτων" },
					{ text: "τούτων" },
					
					{ text: "τούτοις" },
					{ text: "ταύταις" },
					{ text: "τούτοις" },
					
					{ text: "τούτους" },
					{ text: "ταύτας" },
					{ text: "ταῦτα" }
				]
			},
			
			ἐκεῖνος: {
				columnLabels: [
					"",
					"Masculine\n(2nd)",
					"Feminine\n(1st)",
					"Neuter\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "ἐκεῖνος" },
					{ text: "ἐκείνη" },
					{ text: "ἐκεῖνο" },
					
					{ text: "ἐκείνου" },
					{ text: "ἐκείνης" },
					{ text: "ἐκείνου" },
					
					{ text: "ἐκείνῳ" },
					{ text: "ἐκείνῃ" },
					{ text: "ἐκείνῳ" },
					
					{ text: "ἐκεῖνον" },
					{ text: "ἐκείνην" },
					{ text: "ἐκεῖνο" },
					
					{ text: "ἐκεῖνοι" },
					{ text: "ἐκεῖναι" },
					{ text: "ἐκεῖνα" },
					
					{ text: "ἐκείνων" },
					{ text: "ἐκείνων" },
					{ text: "ἐκείνων" },
					
					{ text: "ἐκείνοις" },
					{ text: "ἐκείναις" },
					{ text: "ἐκείνοις" },
					
					{ text: "ἐκείνους" },
					{ text: "ἐκείνας" },
					{ text: "ἐκεῖνα" }
				]
			}
		},
		
		Other: {
			"Square of Stops": {
				columnLabels: [
					"",
					"Unvoiced",
					"Voiced",
					"Aspirate",
					"Stop + σ"
				],
				
				rowLabels: [
					"Labial",
					"Velar",
					"Dental"
				],
				
				elements: [
					{ text: "π" },
					{ text: "β" },
					{ text: "φ" },
					{ text: "ψ" },
					
					{ text: "κ" },
					{ text: "γ" },
					{ text: "χ" },
					{ text: "ξ" },
					
					{ text: "τ" },
					{ text: "δ" },
					{ text: "θ" },
					{ text: "σ" }
				]
			},
			
			εἰμί: {
				name: "εἰμί",
				
				columnLabels: [
					"",
					"Present",
					"Imperfect",
					"Future"
				],
				
				rowLabels: [
					"1st Person\nSingular",
					"2nd Person\nSingular",
					"3rd Person\nSingular",
					"1st Person\nPlural",
					"2nd Person\nPlural",
					"3rd Person\nPlural"
				],
				
				elements: [
					{ text: "εἰμί" },
					{ text: "ἤμην" },
					{ text: "ἔσομαι" },
					
					{ text: "εἶ" },
					{ text: "ἦς" },
					{ text: "ἔσῃ" },
					
					{ text: "ἐστίν" },
					{ text: "ἦν" },
					{ text: "ἔσται" },
					
					{ text: "ἐσμέν" },
					{ text: "ἦμεν / ἤμεθα" },
					{ text: "ἐσόμεθα" },
					
					{ text: "ἐστέ" },
					{ text: "ἦτε" },
					{ text: "ἔσεσθε" },
					
					{ text: "εἰσίν" },
					{ text: "ἦσαν" },
					{ text: "ἔσονται" }
				]
			},
			
			πᾶς: {
				columnLabels: [
					"",
					"Masculine\n(3rd)",
					"Feminine\n(1st)",
					"Neuter\n(3rd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "πᾶς" },
					{ text: "πᾶσα" },
					{ text: "πᾶν" },
					
					{ text: "παντός" },
					{ text: "πάσης" },
					{ text: "παντός" },
					
					{ text: "παντί" },
					{ text: "πάσῃ" },
					{ text: "παντί" },
					
					{ text: "πάντα" },
					{ text: "πᾶσαν" },
					{ text: "πᾶν" },
					
					{ text: "πάντες" },
					{ text: "πᾶσαι" },
					{ text: "πάντα" },
					
					{ text: "πάντων" },
					{ text: "πασῶν" },
					{ text: "πάντων" },
					
					{ text: "πᾶσι(ν)" },
					{ text: "πάσαις" },
					{ text: "πᾶσι(ν)" },
					
					{ text: "πάντας" },
					{ text: "πάσας" },
					{ text: "πάντα" }
				]
			},
			
			ὕδωρ: {
				columnLabels: [
					"",
					"Neuter\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "ὕδωρ" },
					
					{ text: "ὕδατος" },
					
					{ text: "ὕδατι" },
					
					{ text: "ὕδωρ" },
					
					{ text: "ὕδατα" },
					
					{ text: "ὑδάτων" },
					
					{ text: "ὕδασι(ν)" },
					
					{ text: "ὕδατα" }
				]
			},
			
			πατήρ: {
				columnLabels: [
					"",
					"Masculine\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "πατήρ" },
					
					{ text: "πατρός" },
					
					{ text: "πατρί" },
					
					{ text: "πατέρα" },
					
					{ text: "πατέρες" },
					
					{ text: "πατέρων" },
					
					{ text: "πατράσι(ν)" },
					
					{ text: "πατέρας" }
				]
			},
			
			μήτηρ: {
				columnLabels: [
					"",
					"Feminine\n(1st)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "μήτηρ" },
					
					{ text: "μητρός" },
					
					{ text: "μητρί" },
					
					{ text: "μητέρα" },
					
					{ text: "–" },
					
					{ text: "–" },
					
					{ text: "–" },
					
					{ text: "μητέρας" }
				]
			},
			
			ἀνήρ: {
				columnLabels: [
					"",
					"Masculine\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "ἀνήρ" },
					
					{ text: "ἀνδρός" },
					
					{ text: "ἀνδρί" },
					
					{ text: "ἄνδρα" },
					
					{ text: "ἄνδρες" },
					
					{ text: "ἀνδρῶν" },
					
					{ text: "ἀνδράσι(ν)" },
					
					{ text: "ἄνδρας" }
				]
			},
			
			πολύς: {
				columnLabels: [
					"",
					"Masculine\n(2nd)",
					"Feminine\n(1st)",
					"Neuter\n(2nd)"
				],
				
				rowLabels: [
					"Nominative\nSingular",
					"Genitive\nSingular",
					"Dative\nSingular",
					"Accusative\nSingular",
					"Nominative\nPlural",
					"Genitive\nPlural",
					"Dative\nPlural",
					"Accusative\nPlural"
				],
				
				elements: [
					{ text: "πολύς" },
					{ text: "πολλή" },
					{ text: "πολύ" },
					
					{ text: "πολλοῦ" },
					{ text: "πολλῆς" },
					{ text: "πολλοῦ" },
					
					{ text: "πολλῷ" },
					{ text: "πολλῇ" },
					{ text: "πολλῷ" },
					
					{ text: "πολύν" },
					{ text: "πολλήν" },
					{ text: "πολύ" },
					
					{ text: "πολλοί" },
					{ text: "πολλαί" },
					{ text: "πολλά" },
					
					{ text: "πολλῶν" },
					{ text: "πολλῶν" },
					{ text: "πολλῶν" },
					
					{ text: "πολλοῖς" },
					{ text: "πολλαῖς" },
					{ text: "πολλοῖς" },
					
					{ text: "πολλούς" },
					{ text: "πολλάς" },
					{ text: "πολλά" }
				]
			}
		}
	}
};

const vocabularyLength = constants.vocabulary.length;

for (let i = 0; i < vocabularyLength; i++) {
	const word = constants.vocabulary [i];
	
	word.frequency = 0;
	
	constants.vocabularyMap [word.lexicalForm] = word;
	constants.vocabularyNumberMap [word.number] = word;
	
	word.simplifiedLexicalForm = utilities.simplifyGreek (word.lexicalForm);
	
	let formsMapIncludesLexicalForm = false;
	
	for (let j = 0; j < word.forms.length; j++) {
		const form = word.forms [j];
		
		form.word = word;
		form.frequency = 0;
		
		const simplifiedFormText = utilities.simplifyGreek (form.text);
		
		if (constants.vocabularyFormsMap [simplifiedFormText] === undefined) {
			constants.vocabularyFormsMap [simplifiedFormText] = [];
		}
		
		constants.vocabularyFormsMap [simplifiedFormText].push (form);
		
		if (simplifiedFormText === word.simplifiedLexicalForm) {
			formsMapIncludesLexicalForm = true;
		}
		
		for (let k = 0; k < form.uses.length; k++) {
			const use = form.uses [k];
			
			use.shortDescription = [
				use.person ? use.person + " person" : undefined,
				use.mood === "participle" ? use.tense : use.case,
				use.mood === "participle" ? use.voice : use.number,
				use.mood === "participle" ? use.mood : use.gender,
				use.mood === "participle" ? use.case : use.tense,
				use.mood === "participle" ? use.number : use.voice,
				use.mood === "participle" ? use.gender : use.mood,
				use.degree,
				use.partOfSpeech
			].filter (property => property !== undefined).join (" ");
			
			use.description = use.shortDescription + " (x" + use.frequency.toLocaleString () + ")";
			
			word.frequency += use.frequency;
			form.frequency += use.frequency;
		}
	}
	
	if (!formsMapIncludesLexicalForm) {
		constants.vocabularyFormsMap [word.simplifiedLexicalForm] = [{
			text: word.lexicalForm,
			word: word
		}];
	}
	
	word.glossesString = word.glosses.join ("; ");
	word.simplifiedGlossesString = word.glossesString.toLowerCase ();
	
	word.frequency = word.frequency.toLocaleString ();
}

const newTestamentBookCount = constants.newTestament.length;

for (let i = 0; i < newTestamentBookCount; i++) {
	constants.newTestamentChapterCounts [i] = constants.newTestament [i].length;
}

for (let i = 0; i < constants.newTestament.length; i++) {
	const book = constants.newTestament [i];
	
	for (let j = 0; j < book.length; j++) {
		const chapter = book [j];
		
		for (let k = 0; k < chapter.length; k++) {
			const verse = chapter [k];
			
			if (verse === null) {
				continue;
			}
			
			for (let l = 0; l < verse.length; l++) {
				const word = verse [l];
				
				const vocabularyWord = constants.vocabulary [word.wordIndex];
				
				verse [l] = {
					text: word.text,
					word: vocabularyWord,
					form: vocabularyWord?.forms [word.formIndex],
					use: vocabularyWord?.forms [word.formIndex]?.uses [word.useIndex]
				};
			}
		}
	}
}

export default constants;

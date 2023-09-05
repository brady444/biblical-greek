export default {
	morphGntFolderPath: "parser/data/morphgnt/",
	
	outputFilePath: "ui/res/data.json",
	
	invalidCharacterRegex: /.*[\w[\]\\{}|;:,<.>/?@$%^_=+"'~`*()-].*/giu,
	
	// Verb personal endings, used for generating principal parts
	personalEndings: {
		primary: {
			"1st": [
				// Default
				[
					{
						firstSingular: "ω",
						endings: ["ομεν"]
					},
					
					{
						firstSingular: "ομαι",
						endings: ["ομεθα"]
					}
				],
				
				// Alpha Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["ῶμεν"]
					},
					
					{
						firstSingular: "ῶμαι",
						endings: ["ώμεθα"]
					}
				],
				
				// Epsilon Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["οῦμεν"]
					},
					
					{
						firstSingular: "οῦμαι",
						endings: ["ούμεθα"]
					}
				],
				
				// Omicron Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["οῦμεν"]
					},
					
					{
						firstSingular: "οῦμαι",
						endings: ["ούμεθα"]
					}
				]
			],
			
			"2nd": [
				// Default
				[
					{
						firstSingular: "ω",
						endings: ["εις", "ετε"]
					},
					
					{
						firstSingular: "ομαι",
						endings: ["ῃ", "εσθε"]
					}
				],
				
				// Alpha Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["ᾷς", "ᾶτε"]
					},
					
					{
						firstSingular: "ῶμαι",
						endings: ["ᾷ", "ᾶσθε"]
					}
				],
				
				// Epsilon Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["εῖς", "εῖτε"]
					},
					
					{
						firstSingular: "οῦμαι",
						endings: ["ῇ", "εῖσθε"]
					}
				],
				
				// Omicron Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["οῖς", "οῦτε"]
					},
					
					{
						firstSingular: "οῦμαι",
						endings: ["οῖ", "οῦσθε"]
					}
				]
			],
			
			"3rd": [
				// Default
				[
					{
						firstSingular: "ω",
						endings: ["ει", "ουσι(ν)"]
					},
					
					{
						firstSingular: "ομαι",
						endings: ["εται", "ονται"]
					}
					
				],
				
				// Alpha Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["ᾷ", "ῶσι(ν)"]
					},
					
					{
						firstSingular: "ῶμαι",
						endings: ["ᾶται", "ῶνται"]
					}
					
				],
				
				// Epsilon Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["εῖ", "οῦσι(ν)"]
					},
					
					{
						firstSingular: "οῦμαι",
						endings: ["εῖται", "οῦνται"]
					}
					
				],
				
				// Omicron Contract
				[
					{
						firstSingular: "ῶ",
						endings: ["οῖ", "οῦσι(ν)"]
					},
					
					{
						firstSingular: "οῦμαι",
						endings: ["οῦται", "οῦνται"]
					}
					
				]
			]
		},
		
		secondary: {
			"1st": [
				// First Aorist
				[
					{
						firstSingular: "α",
						endings: ["αμεν"]
					},
					
					{
						firstSingular: "άμην",
						endings: ["άμεθα"]
					}
					
				],
				
				// Default
				[
					{
						firstSingular: "ον",
						endings: ["ομεν"]
					},
					
					{
						firstSingular: "ομην",
						endings: ["ομεθα"]
					}
					
				],
				
				// Alpha Contract
				[
					{
						firstSingular: "ων",
						endings: ["ῶμεν"]
					},
					
					{
						firstSingular: "ώμην",
						endings: ["ώμεθα"]
					}
					
				],
				
				// Epsilon Contract
				[
					{
						firstSingular: "ουν",
						endings: ["οῦμεν"]
					},
					
					{
						firstSingular: "ούμην",
						endings: ["ούμεθα"]
					}
					
				],
				
				// Omicron Contract
				[
					{
						firstSingular: "ουν",
						endings: ["οῦμεν"]
					},
					
					{
						firstSingular: "ούμην",
						endings: ["ούμεθα"]
					}
					
				]
			],
			
			"2nd": [
				// First Aorist
				[
					{
						firstSingular: "α",
						endings: ["ας", "ατε"]
					},
					
					{
						firstSingular: "άμην",
						endings: ["ω", "ασθε"]
					}
					
				],
				
				// Default
				[
					{
						firstSingular: "ον",
						endings: ["ες", "ετε"]
					},
					
					{
						firstSingular: "ομην",
						endings: ["ου", "εσθε"]
					}
					
				],
				
				// Alpha Contract
				[
					{
						firstSingular: "ων",
						endings: ["ας", "ᾶτε"]
					},
					
					{
						firstSingular: "ώμην",
						endings: ["ῶ", "ᾶσθε"]
					}
					
				],
				
				// Epsilon Contract
				[
					{
						firstSingular: "ουν",
						endings: ["εις", "εῖτε"]
					},
					
					{
						firstSingular: "ούμην",
						endings: ["οῦ", "εῖσθε"]
					}
					
				],
				
				// Omicron Contract
				[
					{
						firstSingular: "ουν",
						endings: ["ους", "οῦτε"]
					},
					
					{
						firstSingular: "ούμην",
						endings: ["οῦ", "οῦσθε"]
					}
					
				]
			],
			
			"3rd": [
				// First Aorist
				[
					{
						firstSingular: "σα",
						endings: ["σε(ν)", "σαν"]
					},
					
					{
						firstSingular: "άμην",
						endings: ["ατο", "αντο"]
					}
					
				],
				
				// Default
				[
					{
						firstSingular: "ον",
						endings: ["ε(ν)", "ον"]
					},
					
					{
						firstSingular: "ομην",
						endings: ["ετο", "οντο"]
					}
					
				],
				
				// Alpha Contract
				[
					{
						firstSingular: "ων",
						endings: ["α", "ων"]
					},
					
					{
						firstSingular: "ώμην",
						endings: ["ᾶτο", "ῶντο"]
					}
					
				],
				
				// Epsilon Contract
				[
					{
						firstSingular: "ουν",
						endings: ["ει", "ουν"]
					},
					
					{
						firstSingular: "ούμην",
						endings: ["εῖτο", "οῦντο"]
					}
					
				],
				
				// Omicron Contract
				[
					{
						firstSingular: "ουν",
						endings: ["ου", "ουν"]
					},
					
					{
						firstSingular: "ούμην",
						endings: ["οῦτο", "οῦντο"]
					}
					
				]
			]
		}
	},
	
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
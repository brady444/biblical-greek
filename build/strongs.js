import strongsGreekDictionary from "./data/strongs-greek-dictionary.js";

export default {
	getData: addError => {
		const data = {
			vocabulary: []
		};
		
		const vocabularyNumbers = Object.keys (strongsGreekDictionary)
			.sort ((a, b) => parseInt (a.slice (1)) - parseInt (b.slice (1)));
		
		for (let i = 0; i < vocabularyNumbers.length; i++) {
			const number = vocabularyNumbers [i];
			
			const word = {
				number: number,
				lexicalForm: strongsGreekDictionary [number].lemma?.trim (),
				transliteration: "/" + strongsGreekDictionary [number].translit + "/",
				strongsDefinition: ((strongsGreekDictionary [number].derivation ?? "") + strongsGreekDictionary [number].strongs_def).split (";").map (line => line.trim ()),
				strongsKjvDefinition: strongsGreekDictionary [number].kjv_def,
				forms: []
			};
			
			// Remove -- from the start of kjvDefinitions
			if (word.strongsKjvDefinition?.startsWith ("--")) {
				word.strongsKjvDefinition = word.strongsKjvDefinition.slice (2);
			}
			
			data.vocabulary.push (word);
			
			if (word.transliteration === undefined) {
				addError ("Word " + word.number + " is missing a transliteration");
			}
			
			if (word.strongsDefinition === undefined) {
				addError ("Word " + word.number + " is missing a Strong's definition");
			}
			
			if (word.strongsKjvDefinition === undefined) {
				addError ("Word " + word.number + " is missing a Strong's KJV Definition");
			}
		}
		
		// Sort vocabulary
		
		data.vocabulary.sort ((a, b) => a.lexicalForm.replaceAll (/[-"]/gu, "").localeCompare (b.lexicalForm.replaceAll (/[-"]/gu, "")));
		
		return data;
	}
};

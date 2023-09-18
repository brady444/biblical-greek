import fs from "fs";

import constants from "./constants.js";
import utilities from "./utilities.js";

export default {
	getData: () => {
		const data = {
			// Map of extended Strong's number -> word
			vocabulary: {}
		};
		
		const stepBibleLexicon = utilities.oxiaToTonos (fs.readFileSync (constants.stepBibleLexiconFilePath, "utf8"));
		
		// The data starts at line 90, and we exclude the last newline
		const lines = stepBibleLexicon.split ("\n").slice (90, -1);
		
		for (let i = 0; i < lines.length; i++) {
			const columns = lines [i].split ("\t");
			
			const extendedStrongsNumber = "G" + parseInt (columns [0].slice (1));
			// const disambiguatedStrongsNumber = columns [1];
			// const unifiedStrongsNumber = columns [2];
			const lexicalForm = columns [3];
			const transliteration = "/" + columns [4] + "/";
			// const morph = columns [5];
			const gloss = columns [6];
			// const definition = columns [7];
			
			// Stop at G6000
			if (extendedStrongsNumber === "G6000") {
				break;
			}
			
			let word = data.vocabulary [extendedStrongsNumber];
			
			// If this number was already used
			if (word === undefined) {
				word = {
					number: extendedStrongsNumber,
					lexicalForm: lexicalForm,
					transliteration: transliteration,
					glosses: new Set ()
				};
				
				word.glosses.add (gloss);
				
				data.vocabulary [extendedStrongsNumber] = word;
			}
			
			else {
				word.glosses.add (gloss);
			}
		}
		
		const numbers = Object.keys (data.vocabulary);
		
		for (let i = 0; i < numbers.length; i++) {
			const word = data.vocabulary [numbers [i]];
			
			word.glosses = [...word.glosses];
			
			if (word.glosses.length === 0) {
				addError ("Word " + word.number + " has no glosses");
			}
		}
		
		return data;
	}
};

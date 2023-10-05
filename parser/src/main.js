import fs from "fs";

import constants from "./constants.js";
import utilities from "./utilities.js";
import strongs from "./strongs.js";
import step from "./step.js";
import morphGnt from "./morphgnt.js";
import lemmaMappings from "./lemma-mappings.js";

let outputData = {
	errors: new Set ()
};

const addError = error => {
	outputData.errors.add (error);
};

const data = {
	strongs: strongs.getData (addError),
	step: step.getData (addError),
	morphGnt: morphGnt.getData (addError),
	lemmaMappings: lemmaMappings.getData (addError)
};

// Merge data

outputData.vocabulary = data.strongs.vocabulary;

// Add step data to vocabulary
for (let i = 0; i < outputData.vocabulary.length; i++) {
	const word = outputData.vocabulary [i];
	
	outputData.vocabulary [i] = {
		...word,
		// Add the data from STEPBible's vocabulary (for any duplicate fields, this overwrites Strong's data with STEPBible's)
		...data.step.vocabulary [word.number]
	};
}

// Map of lexical form -> array of matching words
const vocabularyMap = {};
// Map of Strong's number -> word
const vocabularyNumberMap = {};

// Populate vocabularyMap and vocabularyNumberMap
for (let i = 0; i < outputData.vocabulary.length; i++) {
	const word = outputData.vocabulary [i];
	
	if (vocabularyMap [word.lexicalForm] === undefined) {
		vocabularyMap [word.lexicalForm] = [];
	}
	
	vocabularyMap [word.lexicalForm].push (word);
	vocabularyNumberMap [word.number] = word;
}

// Assign the forms and principal parts of words based on matching Strong's numbers
const morphGntLexicalForms = Object.keys (data.morphGnt.vocabulary);

for (let i = 0; i < morphGntLexicalForms.length; i++) {
	const morphGntWord = data.morphGnt.vocabulary [morphGntLexicalForms [i]];
	
	const lemmaMapping = data.lemmaMappings.vocabulary [morphGntWord.lexicalForm];
	
	if (lemmaMapping === undefined) {
		addError ("Lexical form \"" + morphGntLexicalForms [i] + "\" doesn't have a Strong's number");
		
		continue;
	}
	
	for (let j = 0; j < lemmaMapping.numbers.length; j++) {
		const number = lemmaMapping.numbers [j];
		
		// If there are multiple Strong's numbers for this lexical form
		if (j === 1) {
			addError ("Lexical form \"" + morphGntLexicalForms [i] + "\" has multiple Strong's numbers: " + lemmaMapping.numbers.join (", "));
		}
		
		// If there are multiple lexical forms for this Strong's number
		if (vocabularyNumberMap [number].forms.length > 0) {
			addError ("Word " + number + " has multiple lexical forms");
		}
		
		// If this word's lexical form appears in outputData.vocabulary with a different Strong's number
		const existingWords = vocabularyMap [morphGntWord.lexicalForm];
		
		if (existingWords !== undefined) {
			for (let k = 0; k < existingWords.length; k++) {
				if (existingWords [k].number !== number) {
					addError ("Word \"" + morphGntWord.lexicalForm + "\"'s Strong's numbers are " + existingWords.map (existingWord => existingWord.number + " (\"" + existingWord.lexicalForm + "\")").join (", ") + ", but MorphGNT says they're " + lemmaMapping.numbers.map (lemmaMappingNumber => lemmaMappingNumber + " (Strong's: \"" + vocabularyNumberMap [lemmaMappingNumber].lexicalForm + "\")").join (", "));
				}
			}
		}
		
		vocabularyNumberMap [number].forms = vocabularyNumberMap [number].forms.concat (morphGntWord.forms);
		vocabularyNumberMap [number].principalParts = morphGntWord.principalParts;
		
		// TODO Set multiple indices when there are two numbers for a lexical form
		// Set vocabularyIndex so that forms can be mapped to words in the main vocabulary array (used below for the New Testament words)
		morphGntWord.vocabularyIndex = outputData.vocabulary.indexOf (vocabularyNumberMap [number]);
	}
}

for (let i = 0; i < outputData.vocabulary.length; i++) {
	const word = outputData.vocabulary [i];
	
	if (word.forms.length === 0) {
		addError ("Word " + word.number + " has no forms");
	}
	
	for (let j = 0; j < word.forms.length; j++) {
		// Delete redundant data
		delete word.forms [j].lexicalForm;
	}
}

// Change errors to an array
outputData.errors = [...outputData.errors];

// Sort errors
outputData.errors.sort ();

// Run oxiaToTonos on outputData (excluding newTestament)
outputData = JSON.parse (utilities.oxiaToTonos (JSON.stringify (outputData)));

outputData.newTestament = data.morphGnt.newTestament;

// Set word, form, and use indices for newTestament
for (let i = 0; i < outputData.newTestament.length; i++) {
	const book = outputData.newTestament [i];
	
	for (let j = 0; j < book.length; j++) {
		const chapter = book [j];
		
		for (let k = 0; k < chapter.length; k++) {
			const verse = chapter [k];
			
			if (verse === undefined) {
				continue;
			}
			
			for (let l = 0; l < verse.length; l++) {
				const word = verse [l];
				
				if (word.word !== undefined) {
					word.wordIndex = word.word.vocabularyIndex;
					word.formIndex = word.word.forms.indexOf (word.form);
					word.useIndex = word.form.uses.indexOf (word.use);
				}
			}
		}
	}
}

// Remove redundant data
for (let i = 0; i < outputData.newTestament.length; i++) {
	const book = outputData.newTestament [i];
	
	for (let j = 0; j < book.length; j++) {
		const chapter = book [j];
		
		for (let k = 0; k < chapter.length; k++) {
			const verse = chapter [k];
			
			if (verse === undefined) {
				continue;
			}
			
			for (let l = 0; l < verse.length; l++) {
				const word = verse [l];
				
				delete word.use;
				delete word.word;
				delete word.form;
				delete word.use;
			}
		}
	}
}

// Output data

const output = "export default " + JSON.stringify (outputData, null, "\t") + ";\n";

console.log ("Error count: " + outputData.errors.length.toLocaleString ());
console.log ("Data size: " + (new Blob ([JSON.stringify (outputData)]).size / 1000000).toLocaleString () + "MB");

const outputDataKeys = Object.keys (outputData);

for (let i = 0; i < outputDataKeys.length; i++) {
	console.log ("- " + outputDataKeys [i] + ": " + (new Blob ([JSON.stringify (outputData [outputDataKeys [i]])]).size / 1000000).toLocaleString () + "MB");
}

fs.writeFileSync (constants.outputFilePath, output);

console.log ("\nWrote data to " + constants.outputFilePath);

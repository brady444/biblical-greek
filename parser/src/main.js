import fs from "fs";
import path from "path";

import constants from "./constants.js";
import utilities from "./utilities.js";

import strongsGreekDictionary from "../data/strongs-greek-dictionary.js";

const data = {
	vocabulary: [],
	// Map lexicalForm -> word
	vocabularyMap: {},
	// Map Strong's number -> word
	vocabularyNumberMap: {},
	// Map simplified form text -> array of matching forms
	vocabularyFormsMap: {},
	newTestament: [],
	errors: []
};

const addError = error => {
	const formattedError = "Error! " + error;
	
	data.errors.push (formattedError);
};

const getFormUse = (formText, partOfSpeech, parsingCode) => {
	const use = {
		frequency: 1
	};
	
	switch (partOfSpeech) {
		case "A-": {
			use.partOfSpeech = "adjective";
			
			break;
		}
		
		case "C-": {
			use.partOfSpeech = "conjunction";
			
			break;
		}
		
		case "D-": {
			use.partOfSpeech = "adverb";
			
			break;
		}
		
		case "I-": {
			use.partOfSpeech = "interjection";
			
			break;
		}
		
		case "N-": {
			use.partOfSpeech = "noun";
			
			break;
		}
		
		case "P-": {
			use.partOfSpeech = "preposition";
			
			break;
		}
		
		case "RA": {
			use.partOfSpeech = "definite article";
			
			break;
		}
		
		case "RD": {
			use.partOfSpeech = "demonstrative pronoun";
			
			break;
		}
		
		case "RI": {
			use.partOfSpeech = "interrogative/indefinite pronoun";
			
			break;
		}
		
		case "RP": {
			use.partOfSpeech = "personal pronoun";
			
			break;
		}
		
		case "RR": {
			use.partOfSpeech = "relative pronoun";
			
			break;
		}
		
		case "V-": {
			use.partOfSpeech = "verb";
			
			break;
		}
		
		case "X-": {
			use.partOfSpeech = "particle";
			
			break;
		}
		
		default: {
			addError ("Invalid partOfSpeech \"" + partOfSpeech + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [0]) {
		case "-": {
			break;
		}
		
		case "1": {
			use.person = "1st";
			
			break;
		}
		
		case "2": {
			use.person = "2nd";
			
			break;
		}
		
		case "3": {
			use.person = "3rd";
			
			break;
		}
		
		default: {
			addError ("Invalid person \"" + parsingCode [0] + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [1]) {
		case "-": {
			break;
		}
		
		case "P": {
			use.tense = "present";
			
			break;
		}
		
		case "I": {
			use.tense = "imperfect";
			
			break;
		}
		
		case "F": {
			use.tense = "future";
			
			break;
		}
		
		case "A": {
			use.tense = "aorist";
			
			break;
		}
		
		case "X": {
			use.tense = "perfect";
			
			break;
		}
		
		case "Y": {
			use.tense = "pluperfect";
			
			break;
		}
		
		default: {
			addError ("Invalid tense \"" + parsingCode [1] + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [2]) {
		case "-": {
			break;
		}
		
		case "A": {
			use.voice = "active";
			
			break;
		}
		
		case "M": {
			use.voice = "middle";
			
			break;
		}
		
		case "P": {
			use.voice = "passive";
			
			break;
		}
		
		default: {
			addError ("Invalid voice \"" + parsingCode [2] + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [3]) {
		case "-": {
			break;
		}
		
		case "I": {
			use.mood = "indicative";
			
			break;
		}
		
		case "D": {
			use.mood = "imperative";
			
			break;
		}
		
		case "S": {
			use.mood = "subjunctive";
			
			break;
		}
		
		case "O": {
			use.mood = "optative";
			
			break;
		}
		
		case "N": {
			use.mood = "infinitive";
			
			break;
		}
		
		case "P": {
			use.mood = "participle";
			
			break;
		}
		
		default: {
			addError ("Invalid mood \"" + parsingCode [3] + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [4]) {
		case "-": {
			break;
		}
		
		case "N": {
			use.case = "nominative";
			
			break;
		}
		
		case "G": {
			use.case = "genitive";
			
			break;
		}
		
		case "D": {
			use.case = "dative";
			
			break;
		}
		
		case "A": {
			use.case = "accusative";
			
			break;
		}
		
		case "V": {
			use.case = "vocative";
			
			break;
		}
		
		default: {
			addError ("Invalid case \"" + parsingCode [4] + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [5]) {
		case "-": {
			break;
		}
		
		case "S": {
			use.number = "singular";
			
			break;
		}
		
		case "P": {
			use.number = "plural";
			
			break;
		}
		
		default: {
			addError ("Invalid number \"" + parsingCode [5] + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [6]) {
		case "-": {
			break;
		}
		
		case "M": {
			use.gender = "masculine";
			
			break;
		}
		
		case "F": {
			use.gender = "feminine";
			
			break;
		}
		
		case "N": {
			use.gender = "neuter";
			
			break;
		}
		
		default: {
			addError ("Invalid gender \"" + parsingCode [6] + "\" in form \"" + formText + "\"");
		}
	}
	
	switch (parsingCode [7]) {
		case "-": {
			break;
		}
		
		case "C": {
			use.degree = "comparative";
			
			break;
		}
		
		case "S": {
			use.degree = "superlative";
			
			break;
		}
		
		default: {
			addError ("Invalid degree \"" + parsingCode [7] + "\" in form \"" + formText + "\"");
		}
	}
	
	use.description = [
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
	
	if (use.description === "") {
		addError ("Form \"" + formText + "\" has a use with an empty description: " + JSON.stringify (use));
	}
	
	return use;
};

const sortFormUses = (a, b) => {
	const propertyKeys = Object.keys (constants.formUseProperties);
	const propertyValues = Object.values (constants.formUseProperties);
	
	for (let j = 0; j < propertyKeys.length; j++) {
		const aIndex = propertyValues [j].indexOf (a [propertyKeys [j]]);
		const bIndex = propertyValues [j].indexOf (b [propertyKeys [j]]);
		
		if (aIndex !== -1 && bIndex === -1) {
			return -1;
		}
		
		if (aIndex === -1 && bIndex !== -1) {
			return 1;
		}
		
		if (aIndex < bIndex) {
			return -1;
		}
		
		if (aIndex > bIndex) {
			return 1;
		}
	}
	
	return 0;
};

const getPrincipalParts = word => {
	let principalParts;
	
	for (let j = 0; j < word.forms.length; j++) {
		const form = word.forms [j];
		
		for (let k = 0; k < form.uses.length; k++) {
			const use = form.uses [k];
			
			if (use.partOfSpeech !== "verb") {
				continue;
			}
			
			if (principalParts === undefined) {
				principalParts = ["-", "-", "-", "-", "-", "-"];
			}
			
			if (use.person !== "1st" || use.number !== "singular" || use.mood !== "indicative") {
				continue;
			}
			
			// Forms and uses should already be sorted, so use the first use that matches the criteria
			// The active voice should also be used automatically before the middle voice, because the uses are already sorted
			
			if (principalParts [0] === "-" &&
				use.tense === "present") {
				principalParts [0] = form.text;
			}
			
			if (principalParts [1] === "-" &&
				use.tense === "future") {
				principalParts [1] = form.text;
			}
			
			if (principalParts [2] === "-" &&
				use.tense === "aorist" &&
				use.voice === "active") {
				principalParts [2] = form.text;
			}
			
			if (principalParts [3] === "-" &&
				use.tense === "perfect" &&
				use.voice === "active") {
				principalParts [3] = form.text;
			}
			
			if (principalParts [4] === "-" &&
				use.tense === "perfect" &&
				(use.voice === "middle" || use.voice === "passive")) {
				principalParts [4] = form.text;
			}
			
			if (principalParts [5] === "-" &&
				use.tense === "aorist" &&
				use.voice === "passive") {
				principalParts [5] = form.text;
			}
		}
	}
	
	return principalParts;
};

// Parse Strong's Greek Dictionary

const vocabularyNumbers = Object.keys (strongsGreekDictionary)
	.sort ((a, b) => parseInt (a.slice (1)) - parseInt (b.slice (1)));

for (let i = 0; i < vocabularyNumbers.length; i++) {
	const number = vocabularyNumbers [i];
	
	const word = {
		number: number,
		lexicalForm: strongsGreekDictionary [number].lemma?.trim (),
		transliteration: "/" + strongsGreekDictionary [number].translit + "/",
		definition: strongsGreekDictionary [number].derivation + strongsGreekDictionary [number].strongs_def,
		kjvDefinition: strongsGreekDictionary [number].kjv_def,
		forms: []
	};
	
	// Add quotes around phrases/idioms
	if (word.lexicalForm.includes (" ")) {
		word.lexicalForm = "\"" + word.lexicalForm + "\"";
	}
	
	word.simplifiedLexicalForm = utilities.simplifyGreek (word.lexicalForm);
	word.simplifiedDefinition = word.definition.toLowerCase ();
	word.simplifiedKjvDefinition = word.kjvDefinition?.toLowerCase ();
	
	if (word.transliteration === undefined) {
		addError ("Word \"" + word.lexicalForm + "\" is missing a transliteration");
	}
	
	if (word.definition === undefined) {
		addError ("Word \"" + word.lexicalForm + "\" is missing a definition");
	}
	
	if (word.kjvDefinition === undefined) {
		addError ("Word \"" + word.lexicalForm + "\" is missing a kjvDefinition");
	}
	
	data.vocabularyMap [word.lexicalForm] = word;
	data.vocabularyNumberMap [number] = word;
	data.vocabulary.push (word);
}

// Sort vocabulary

data.vocabulary.sort ((a, b) => a.lexicalForm.replaceAll (/[-"]/gu, "").localeCompare (b.lexicalForm.replaceAll (/[-"]/gu, "")));

// Parse MorphGNT data

const morphGntFiles = fs.readdirSync (constants.morphGntFolderPath);

let lines = [];

for (let i = 0; i < morphGntFiles.length; i++) {
	if (morphGntFiles [i] === "README.md") {
		continue;
	}
	
	// Exclude the last line since it's empty
	lines = lines.concat (fs.readFileSync (path.normalize (constants.morphGntFolderPath + "/" + morphGntFiles [i]), "utf8").split ("\n").slice (0, -1));
}

for (let i = 0; i < lines.length; i++) {
	const columns = lines [i].split (" ");
	
	const location = columns [0];
	const partOfSpeech = columns [1];
	const parsingCode = columns [2];
	const text = columns [3];
	// Const formText = columns [4];
	const normalizedFormText = columns [5];
	const simplifiedFormText = utilities.simplifyGreek (normalizedFormText);
	const lexicalForm = columns [6];
	
	const book = parseInt (location.slice (0, 2));
	const chapter = parseInt (location.slice (2, 4));
	const verse = parseInt (location.slice (4, 6));
	
	const bookIndex = book - 1;
	const chapterIndex = chapter - 1;
	const verseIndex = verse - 1;
	
	// Update forms
	
	const word = data.vocabularyMap [lexicalForm];
	
	const use = getFormUse (normalizedFormText, partOfSpeech, parsingCode);
	
	const form = {
		text: normalizedFormText,
		lexicalForm: lexicalForm,
		frequency: 1,
		uses: [use]
	};
	
	// If the form's lexicalForm is valid
	if (word === undefined) {
		addError ("Form \"" + normalizedFormText + "\" has an invalid lexicalForm \"" + lexicalForm + "\"");
	}
	
	else {
		// List of existing forms that match the simplifiedFormText
		const existingFormList = data.vocabularyFormsMap [simplifiedFormText];
		
		let existingForm;
		
		// If simplifiedFormText is already a key of vocabularyFormsMap
		if (existingFormList) {
			for (let j = 0; j < existingFormList.length; j++) {
				// If existingFormList [j] matches the current form
				if (existingFormList [j].text === form.text && existingFormList [j].lexicalForm === form.lexicalForm) {
					existingForm = existingFormList [j];
					
					break;
				}
			}
		}
		
		else {
			data.vocabularyFormsMap [simplifiedFormText] = [];
		}
		
		// If the form exists
		if (existingForm) {
			let existingUse;
			
			for (let j = 0; j < existingForm.uses.length; j++) {
				if (existingForm.uses [j].person === use.person &&
					existingForm.uses [j].tense === use.tense &&
					existingForm.uses [j].voice === use.voice &&
					existingForm.uses [j].mood === use.mood &&
					existingForm.uses [j].case === use.case &&
					existingForm.uses [j].number === use.number &&
					existingForm.uses [j].gender === use.gender &&
					existingForm.uses [j].degree === use.degree &&
					existingForm.uses [j].partOfSpeech === use.partOfSpeech) {
					existingUse = existingForm.uses [j];
					
					break;
				}
			}
			
			// If the use exists
			if (existingUse) {
				existingUse.frequency++;
			}
			
			// If the use doesn't exist
			else {
				existingForm.uses.push (use);
			}
			
			existingForm.frequency++;
		}
		
		// If the form doesn't exist
		else {
			data.vocabularyFormsMap [simplifiedFormText].push (form);
			data.vocabularyMap [lexicalForm].forms.push (form);
		}
	}
	
	// Update data.newTestament
	
	if (data.newTestament [bookIndex] === undefined) {
		data.newTestament [bookIndex] = [];
	}
	
	if (data.newTestament [bookIndex] [chapterIndex] === undefined) {
		data.newTestament [bookIndex] [chapterIndex] = [];
	}
	
	if (data.newTestament [bookIndex] [chapterIndex] [verseIndex] === undefined) {
		data.newTestament [bookIndex] [chapterIndex] [verseIndex] = text;
	}
	
	else {
		data.newTestament [bookIndex] [chapterIndex] [verseIndex] += " " + text;
	}
}

for (let i = 0; i < data.vocabulary.length; i++) {
	const word = data.vocabulary [i];
	
	word.frequency = 0;
	
	for (let j = 0; j < word.forms.length; j++) {
		const form = word.forms [j];
		
		// Update word frequency
		word.frequency += form.frequency;
		
		for (let k = 0; k < form.uses.length; k++) {
			const use = form.uses [k];
			
			// Update use description
			use.description += " (x" + use.frequency.toLocaleString () + ")";
		}
		
		// Sort uses
		form.uses.sort (sortFormUses);
	}
	
	word.frequency = word.frequency.toLocaleString ();
	
	// Sort forms
	word.forms.sort ((a, b) => sortFormUses (a.uses [0], b.uses [0]));
	
	// Set principalParts
	word.principalParts = getPrincipalParts (word);
}

// Output errors

for (let i = 0; i < data.errors.length; i++) {
	console.error (data.errors [i]);
}

console.log ("Error count: " + data.errors.length.toLocaleString () + "\n");

// Delete redundant data

delete data.vocabularyMap;
delete data.vocabularyNumberMap;

// Output data

const output = JSON.stringify (data, null, "\t");

console.log ("Word count: " + data.vocabulary.length.toLocaleString ());

console.log ("\nData length: " + output.length.toLocaleString ());
console.log ("Data size: " + (new Blob ([output]).size / 1000000).toLocaleString () + "MB");

const dataKeys = Object.keys (data);

for (let i = 0; i < dataKeys.length; i++) {
	console.log ("- " + dataKeys [i] + ": " + (new Blob ([JSON.stringify (data [dataKeys [i]])]).size / 1000000).toLocaleString () + "MB");
}

fs.writeFileSync (constants.outputFilePath, output);

console.log ("\nWrote data to " + constants.outputFilePath);
import fs from "fs";
import path from "path";

import constants from "./constants.js";
import utilities from "./utilities.js";

const getFormUse = (formText, partOfSpeech, parsingCode, addError) => {
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

const approximatePrincipalPart = (formText, use) => {
	const endingCategories = constants.personalEndings [use.tense === "present" || use.tense === "future" ? "primary" : "secondary"] [use.person] [use.voice];
	
	for (let i = 0; i < endingCategories.length; i++) {
		const endingGroup = endingCategories [i];
			
		for (let j = 0; j < endingGroup.endings.length; j++) {
			if (formText.endsWith (endingGroup.endings [j])) {
				return "[" + formText.slice (0, -endingGroup.endings [j].length) + endingGroup.firstSingular + "]";
			}
		}
	}
	
	return "[" + formText + "]";
};

const getPrincipalParts = (word, addError) => {
	let hasVerbUse = false;
	
	const principalPartsData = [
		{
			text: "-"
		},
		
		{
			text: "-"
		},
		
		{
			text: "-"
		},
		
		{
			text: "-"
		},
		
		{
			text: "-"
		},
		
		{
			text: "-"
		}
	];
	
	for (let j = 0; j < word.forms.length; j++) {
		const form = word.forms [j];
		
		for (let k = 0; k < form.uses.length; k++) {
			const use = form.uses [k];
			
			if (use.partOfSpeech !== "verb") {
				continue;
			}
			
			hasVerbUse = true;
			
			if (use.mood !== "indicative") {
				continue;
			}
			
			// Assign partIndex based on tense and voice of the current use
			
			let partIndex;
			
			// Present
			if (use.tense === "present") {
				partIndex = 0;
			}
			
			// Future Active/Middle
			else if (use.tense === "future" &&
				use.voice !== "passive") {
				partIndex = 1;
			}
			
			// Aorist Active/Middle
			else if (use.tense === "aorist" &&
				use.voice !== "passive") {
				partIndex = 2;
			}
			
			// Perfect Active
			else if (use.tense === "perfect" &&
				use.voice === "active") {
				partIndex = 3;
			}
			
			// Perfect Middle/Passive
			else if (use.tense === "perfect" &&
				use.voice !== "active") {
				partIndex = 4;
			}
			
			// Aorist Passive
			else if (use.tense === "aorist" &&
				use.voice === "passive") {
				partIndex = 5;
			}
			
			else {
				// If this use doesn't match any parts
				continue;
			}
			
			const currentPart = principalPartsData [partIndex];
			
			const isPartSet = currentPart.text !== "-";
			const isPartApproximated = currentPart.text [0] === "[";
			
			// Don't overwrite non-approximated parts
			if (isPartSet && !isPartApproximated) {
				continue;
			}
			
			// If this use is 1st person singular, set the part without approximating
			if (use.person === "1st" && use.number === "singular") {
				principalPartsData [partIndex] = {
					text: form.text,
					voice: use.voice
				};
				
				continue;
			}
			
			// Don't overwrite the part if the current use has a lower voice
			if ((currentPart.voice === "active" && use.voice !== "active") ||
				(currentPart.voice === "middle" && use.voice === "passive")) {
				continue;
			}
			
			// Approximate the part
			const approximatedPart = approximatePrincipalPart (form.text, use);
			
			// If this is present tense, and the form is different from the lexical form
			if (partIndex === 0 && approximatedPart !== "[" + word.lexicalForm + "]") {
				// TODO add other exceptions
				// If this is a contract verb, the lexicalForm is expected to be different
				if ((!word.lexicalForm.endsWith ("άω") &&
					!word.lexicalForm.endsWith ("έω") &&
					!word.lexicalForm.endsWith ("όω")) || approximatedPart.endsWith ("ῶ")) {
					addError ("Word \"" + word.lexicalForm + "\" has an approximated present principal part \"" + approximatedPart + "\" that is different from its lexical form");
				}
			}
			
			// If the approximatedPrincipalPart is the same as form.text
			if (approximatedPart === "[" + form.text + "]") {
				addError ("Word \"" + word.lexicalForm + "\" has an approximated principal part that is the same as a non-first person singular form, part: \"" + approximatedPart + "\"");
			}
			
			// If the principal part was already approximated
			if (isPartSet && isPartApproximated &&
				// , and differs from the new approximation
				currentPart.text !== approximatedPart) {
				addError ("Word \"" + word.lexicalForm + "\" has multiple approximations for the same principal part, index: " + partIndex + ", parts: \"" + currentPart.text + ", " + approximatedPart + "\"");
			}
			
			principalPartsData [partIndex] = {
				text: approximatedPart,
				voice: use.voice
			};
		}
	}
	
	return hasVerbUse ? principalPartsData.map (part => part.text) : undefined;
};

export default {
	getData: addError => {
		const data = {
			// Map of lexicalForm -> word
			vocabulary: {},
			newTestament: []
		};
		
		// Map of simplified form text -> list of forms
		const simplifiedFormTextMap = {};
		
		const files = fs.readdirSync (constants.morphGntFolderPath);
		
		let lines = [];
		
		for (let i = 0; i < files.length; i++) {
			if (files [i] === "README.md") {
				continue;
			}
			
			// Exclude the last line since it's empty
			lines = lines.concat (fs.readFileSync (path.normalize (constants.morphGntFolderPath + "/" + files [i]), "utf8").split ("\n").slice (0, -1));
		}
		
		for (let i = 0; i < lines.length; i++) {
			const columns = lines [i].split (" ");
			
			const location = columns [0];
			const partOfSpeech = columns [1];
			const parsingCode = columns [2];
			const text = columns [3];
			// const formText = columns [4];
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
			
			let word = data.vocabulary [lexicalForm];
			
			if (word === undefined) {
				word = {
					lexicalForm: lexicalForm,
					forms: []
				};
				
				data.vocabulary [lexicalForm] = word;
			}
			
			let use = getFormUse (normalizedFormText, partOfSpeech, parsingCode, addError);
			
			let form = {
				text: normalizedFormText,
				lexicalForm: lexicalForm,
				uses: [use]
			};
			
			// List of existing forms that match the simplifiedFormText
			const existingFormList = simplifiedFormTextMap [simplifiedFormText];
			
			let existingForm;
			
			// If simplifiedFormText is already a key of simplifiedFormTextMap
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
				simplifiedFormTextMap [simplifiedFormText] = [];
			}
			
			// If the form exists
			if (existingForm) {
				form = existingForm;
				
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
					use = existingUse;
					
					existingUse.frequency++;
				}
				
				// If the use doesn't exist
				else {
					existingForm.uses.push (use);
				}
			}
			
			// If the form doesn't exist
			else {
				simplifiedFormTextMap [simplifiedFormText].push (form);
				word.forms.push (form);
			}
			
			// Update data.newTestament
			
			if (data.newTestament [bookIndex] === undefined) {
				data.newTestament [bookIndex] = [];
			}
			
			if (data.newTestament [bookIndex] [chapterIndex] === undefined) {
				data.newTestament [bookIndex] [chapterIndex] = [];
			}
			
			if (data.newTestament [bookIndex] [chapterIndex] [verseIndex] === undefined) {
				data.newTestament [bookIndex] [chapterIndex] [verseIndex] = [];
			}
			
			data.newTestament [bookIndex] [chapterIndex] [verseIndex].push ({
				text: text,
				word: word,
				form: form,
				use: use
			});
		}
		
		const lexicalForms = Object.keys (data.vocabulary);
		
		for (let i = 0; i < lexicalForms.length; i++) {
			const word = data.vocabulary [lexicalForms [i]];
			
			// Sort uses
			for (let j = 0; j < word.forms.length; j++) {
				word.forms [j].uses.sort (sortFormUses);
			}
			
			// Sort forms
			word.forms.sort ((a, b) => sortFormUses (a.uses [0], b.uses [0]));
			
			// Set principal parts
			word.principalParts = getPrincipalParts (word, addError);
		}
		
		return data;
	}
};

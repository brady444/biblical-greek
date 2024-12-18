import fs from "node:fs";

import yaml from "js-yaml";

import constants from "./constants";
import utilities from "./utilities";

console.time("lemma-mappings");

const data = {
	// Map of lexicalForm -> word
	lexicalFormVocabularyMap: {},
};

// Map of Strong's number -> array of lexical forms
const strongsNumberMap = yaml.load(
	utilities.oxiaToTonos(fs.readFileSync(constants.strongsMappingPath, "utf8")),
);

const numbers = Object.keys(strongsNumberMap);

for (let i = 0; i < numbers.length; i++) {
	const number = numbers[i];

	const lexicalForms = strongsNumberMap[number];

	for (let j = 0; j < lexicalForms.length; j++) {
		const lexicalForm = lexicalForms[j];

		if (data.lexicalFormVocabularyMap[lexicalForm] === undefined) {
			data.lexicalFormVocabularyMap[lexicalForm] = { numbers: [] };
		}

		data.lexicalFormVocabularyMap[lexicalForm].numbers.push(`G${number}`);
	}
}

console.timeEnd("lemma-mappings");

export default {
	data,
};

import fs from "fs";

import yaml from "js-yaml";

import constants from "./constants.js";

export default {
	getData: () => {
		const data = {
			// Map of lexicalForm -> word
			vocabulary: []
		};
		
		const vocabularyNumberMap = yaml.load (fs.readFileSync (constants.strongsMappingFilePath, "utf8"));
		
		const numbers = Object.keys (vocabularyNumberMap);
		
		for (let i = 0; i < numbers.length; i++) {
			const number = numbers [i];
			
			const lexicalForms = vocabularyNumberMap [number];
			
			for (let j = 0; j < lexicalForms.length; j++) {
				const word = data.vocabulary [lexicalForms [j]];
				
				if (word === undefined) {
					data.vocabulary [lexicalForms [j]] = {
						numbers: ["G" + number]
					};
				}
				
				else {
					word.numbers.push ("G" + number);
				}
			}
		}
		
		return data;
	}
};

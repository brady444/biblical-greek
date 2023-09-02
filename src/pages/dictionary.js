/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

import { html } from "uhtml";

import constants from "/src/constants.js";
import utilities from "/src/utilities.js";

export default {
	setup: () => {
		pageData.updateCurrentVocabulary = vocabulary => {
			pageData.vocabularySections = [];
			
			let currentSection = {
				vocabulary: []
			};
			
			for (let i = 0; i < vocabulary.length; i++) {
				let letter = vocabulary [i].lexicalForm [0];
				
				if (letter === "-") {
					letter = vocabulary [i].lexicalForm [1];
				}
				
				letter = utilities.simplifyGreek (letter).toUpperCase ();
				
				if (currentSection.letter === undefined) {
					currentSection.letter = letter;
				}
				
				else if (currentSection.letter !== letter) {
					pageData.vocabularySections.push (currentSection);
					
					currentSection = {
						letter: letter,
						
						vocabulary: []
					};
				}
				
				currentSection.vocabulary.push (vocabulary [i]);
			}
			
			pageData.vocabularySections.push (currentSection);
		};
		
		pageData.search = query => {
			const vocabulary = [];
			
			const formattedQuery = query.trim ().toLowerCase ();
			const parsedQuery = utilities.simplifyGreek (utilities.englishToGreek (formattedQuery));
			
			for (let i = 0; i < constants.vocabulary.length; i++) {
				const dictionaryWord = {
					lexicalForm: constants.vocabulary [i].lexicalForm
				};
				
				if (constants.vocabulary [i].simplifiedLexicalForm.includes (parsedQuery)) {
					vocabulary.push (dictionaryWord);
				}
				
				else if (constants.vocabulary [i].simplifiedDefinition.includes (formattedQuery)) {
					dictionaryWord.subtitle = constants.vocabulary [i].definition;
					
					vocabulary.push (dictionaryWord);
				}
				
				else if (constants.vocabulary [i].simplifiedKjvDefinition?.includes (formattedQuery)) {
					dictionaryWord.subtitle = constants.vocabulary [i].kjvDefinition;
					
					vocabulary.push (dictionaryWord);
				}
			}
			
			pageData.updateCurrentVocabulary (vocabulary);
			
			update ();
		};
		
		pageData.updateCurrentVocabulary (constants.vocabulary.map (word => ({ lexicalForm: word.lexicalForm })));
	},
	
	content: () => html
		`<div class = "page-container flex-column-top grow full-width full-height">
			<div class = "medium-width flex medium-padding">
				<input id = "search-input" class = "full-width medium-font small-padding" placeholder = "Search..." oninput = "pageData.search (this.value)" />
			</div>
			
			<div class = "full-width flex-top flex-wrap">
				${ pageData.vocabularySections.map (vocabularySection => html
					`<div class = "section-group full-width flex-column small-gap large-padding">
						<p class = "medium-font">${ vocabularySection.letter }</p>
						
						<div class = "flex flex-wrap x-large-gap">
							${ vocabularySection.vocabulary.map (word => html
								`<a class = "small-font grayA" href = ${ "#/word/" + word.lexicalForm.replaceAll (" ", "_") }>${ word.lexicalForm + (word.subtitle === undefined ? "" : ": " + word.subtitle) }</a>`
							) }
						</div>
					</div>`
				) }
			</div>
		</div>`
};
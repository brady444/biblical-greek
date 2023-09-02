/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

import { html } from "uhtml";

import constants from "/src/constants.js";
import utilities from "/src/utilities.js";

export default {
	setup: () => {
		pageData.updateCurrentVocabulary = vocabulary => {
			pageData.vocabularySections = {};
			
			for (let i = 0; i < vocabulary.length; i++) {
				const wordLength = vocabulary [i].scrabbleText.length;
				
				if (pageData.vocabularySections [wordLength] === undefined) {
					pageData.vocabularySections [wordLength] = [];
				}
				
				pageData.vocabularySections [wordLength].push (vocabulary [i]);
			}
		};
		
		pageData.search = query => {
			pageData.updateCurrentVocabulary (constants.vocabulary.filter (word => utilities.simplifyGreek (word.lexicalForm).startsWith (utilities.simplifyGreek (utilities.englishToGreek (query.trim ())))));
			
			update ();
		};
		
		const scrabbleTexts = {};
		
		pageData.vocabulary = [];
		
		for (let i = 0; i < constants.vocabulary.length; i++) {
			const scrabbleText = utilities.simplifyGreek (constants.vocabulary [i].lexicalForm).toUpperCase ();
			
			if (scrabbleTexts [scrabbleText] === undefined) {
				scrabbleTexts [scrabbleText] = [];
			}
			
			scrabbleTexts [scrabbleText].push (constants.vocabulary [i].lexicalForm);
			
			for (let j = 0; j < constants.vocabulary [i].forms.length; j++) {
				const formScrabbleText = utilities.simplifyGreek (constants.vocabulary [i].forms [j].text).toUpperCase ();
				
				if (scrabbleTexts [formScrabbleText] === undefined) {
					scrabbleTexts [formScrabbleText] = [];
				}
				
				scrabbleTexts [formScrabbleText].push (constants.vocabulary [i].lexicalForm);
			}
		}
		
		pageData.vocabulary = Object.keys (scrabbleTexts).map (scrabbleText => ({
			scrabbleText: scrabbleText,
			lexicalForms: scrabbleTexts [scrabbleText]
		})).filter (word => word.scrabbleText.length > 1 && !word.scrabbleText.includes (" "));
		
		pageData.updateCurrentVocabulary (pageData.vocabulary);
	},
	
	content: () => html
		`<div class = "page-container flex-column-top grow full-width full-height">
			<div class = "medium-width flex medium-padding">
				<input class = "full-width small-padding medium-font" placeholder = "Search..." oninput = "pageData.search (this.value)" />
			</div>
			
			<div class = "full-width flex-top flex-wrap">
				${ Object.keys (pageData.vocabularySections).map (wordLength => html
					`<div class = "section-group full-width flex-column large-padding">
						<div class = "flex-column small-gap">
							<p class = "medium-font">${ wordLength + "-Letter Words (" + pageData.vocabularySections [wordLength].length + ")" }</p>
							
							<div class = "flex flex-wrap x-large-gap">
								${ pageData.vocabularySections [wordLength].map (word => html
									`<a class = "small-font grayA" href = ${ "#/word/" + word.lexicalForms [0].replaceAll (" ", "-") }>${ word.scrabbleText }</a>`
								) }
							</div>
					</div>`
				) }
			</div>
		</div>`
};
/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

import { html } from "uhtml";

import constants from "/src/constants.js";
import utilities from "/src/utilities.js";

export default {
	setup: () => {
		pageData.parse = input => {
			pageData.parsedWords = [];
			pageData.selectedOptions = [];
			
			if (input.length > 0) {
				const inputWords = input
					.trim ()
					.split (/\s+/u)
					.map (inputWord => utilities.englishToGreek (inputWord));
				
				for (let i = 0; i < inputWords.length; i++) {
					const simplifiedInputWord = utilities.simplifyGreek (inputWords [i]);
					
					let matchedForms = forms [simplifiedInputWord];
					
					if (matchedForms === undefined) {
						matchedForms = [{
							text: inputWords [i]
						}];
					}
					
					// Try to find exact matches
					// Don't try to find an exact match for inputWords that are simplified
					else if (matchedForms.length > 1 && inputWords [i] !== simplifiedInputWord) {
						const exactlyMatchedForms = [];
						
						const formattedInputWord = utilities.isolateGreek (utilities.oxiaToTonos (inputWords [i]));
						
						for (let j = 0; j < matchedForms.length; j++) {
							if (formattedInputWord === matchedForms [j].text) {
								exactlyMatchedForms.push (matchedForms [j]);
							}
						}
						
						if (exactlyMatchedForms.length > 0) {
							matchedForms = exactlyMatchedForms;
						}
					}
					
					pageData.parsedWords.push (matchedForms);
					
					pageData.selectedOptions.push ({
						form: 0,
						use: 0
					});
				}
			}
			
			update ();
		};
		
		pageData.updateProperties = propertyIndices => {
			pageData.showDescriptions = propertyIndices.includes (0);
			pageData.showKjvDefinitions = propertyIndices.includes (1);
			pageData.showLexicalForms = propertyIndices.includes (2);
			pageData.showPrincipalParts = propertyIndices.includes (3);
			
			for (let i = 0; i < pageData.selectedOptions.length; i++) {
				pageData.selectedOptions [i].use = 0;
			}
			
			update ();
		};
		
		pageData.swapForm = i => {
			pageData.selectedOptions [i].form += 1;
			
			if (pageData.selectedOptions [i].form > pageData.parsedWords [i].length - 1) {
				pageData.selectedOptions [i].form = 0;
			}
			
			pageData.selectedOptions [i].use = 0;
			
			update ();
		};
		
		pageData.swapUse = i => {
			pageData.selectedOptions [i].use += 1;
			
			if (pageData.selectedOptions [i].use > pageData.parsedWords [i] [pageData.selectedOptions [i].form].uses.length - 1) {
				pageData.selectedOptions [i].use = 0;
			}
			
			update ();
		};
		
		pageData.parsedWords = [];
		
		pageData.showDescriptions = true;
		pageData.showKjvDefinitions = true;
		pageData.showLexicalForms = true;
		pageData.showPrincipalParts = true;
		
		pageData.selectedOptions = [];
		
		const forms = {};
		
		for (let i = 0; i < constants.vocabulary.length; i++) {
			let lexicalFormIncluded = false;
			
			for (let j = 0; j < constants.vocabulary [i].forms.length; j++) {
				const simplifiedText = utilities.simplifyGreek (constants.vocabulary [i].forms [j].text);
				
				const form = {
					text: constants.vocabulary [i].forms [j].text,
					uses: constants.vocabulary [i].forms [j].uses,
					kjvDefinition: constants.vocabulary [i].kjvDefinition,
					lexicalForm: constants.vocabulary [i].lexicalForm,
					principalParts: constants.vocabulary [i].principalParts
				};
				
				if (forms [simplifiedText]) {
					forms [simplifiedText].push (form);
				}
				
				else {
					forms [simplifiedText] = [form];
				}
				
				if (form.text === constants.vocabulary [i].lexicalForm) {
					lexicalFormIncluded = true;
				}
			}
			
			if (!lexicalFormIncluded) {
				const simplifiedText = utilities.simplifyGreek (constants.vocabulary [i].lexicalForm);
				
				const form = {
					text: constants.vocabulary [i].lexicalForm,
					lexicalForm: constants.vocabulary [i].lexicalForm,
					kjvDefinition: constants.vocabulary [i].kjvDefinition
				};
				
				if (forms [simplifiedText]) {
					forms [simplifiedText].push (form);
				}
				
				else {
					forms [simplifiedText] = [form];
				}
			}
		}
	},
	
	content: () => html
		`<div class = "page-container flex-column-top grow full-width full-height medium-gap medium-padding">
			<div id = "parser-input" class = "medium-width medium-gap">
				<textarea class = "small-padding medium-font" placeholder = "Enter Greek..." oninput = "pageData.parse (this.value)" />
				
				<select multiple class = "small-padding medium-font" oninput = "pageData.updateProperties ([...this.selectedOptions].map (option => option.index))">
					<option class = "medium-font" selected>Description</option>
					<option class = "medium-font" selected>KJV Definition</option>
					<option class = "medium-font" selected>Lexical Form</option>
					<option class = "medium-font" selected>Principal Parts</option>
				</select>
			</div>
			
			<div class = "large-width flex-top flex-wrap medium-gap">
				${ pageData.parsedWords.map ((parsedWord, i) => {
					const selectedForm = parsedWord [pageData.selectedOptions [i].form];
					
					return html
					`<div class = "parser-word flex-column-top x-small-gap">
						${ parsedWord.length > 1 ? html
							`<p class = "xx-large-font parser-swappable-option" onclick = ${ () => pageData.swapForm (i) }>${ selectedForm.text }</p>` : html
							`<p class = "xx-large-font">${ selectedForm.text }</p>`
						}
						
						${ pageData.showDescriptions || pageData.showKjvDefinitions || pageData.showLexicalForms || pageData.showPrincipalParts ? html
							`<div class = "flex-column small-gap">
								${ selectedForm.uses === undefined || !pageData.showDescriptions ? null :
									selectedForm.uses.length > 1 ? html
										`<p class = "small-font grayA parser-swappable-option" onclick = ${ () => pageData.swapUse (i) }>${ selectedForm.uses [pageData.selectedOptions [i].use].description }</p>` : html
										`<p class = "small-font grayA">${ selectedForm.uses [0].description }</p>`
								}
								
								${ selectedForm.kjvDefinition === undefined || !pageData.showKjvDefinitions ? null : html
									`<p class = "small-font grayA">${ selectedForm.kjvDefinition }</p>`
								}
								
								${ selectedForm.lexicalForm === undefined || !pageData.showLexicalForms ? null : html
									`<a class = "small-font grayA" href = ${ "#/word/" + selectedForm.lexicalForm.replaceAll (" ", "-") }>${ selectedForm.lexicalForm }</a>`
								}
								
								${ selectedForm.principalParts === undefined || !pageData.showPrincipalParts ? null : html
									`<p class = "small-font grayA">${ selectedForm.principalParts.map ((part, j) => html
										`<span class = "small-font grayA" title = ${ constants.principalParts [selectedForm.principalParts.length === 6 ? j : j + 1] }>${ part }</span>${ j === selectedForm.principalParts.length - 1 ? "" : ", " }`
									) }</p>`
								}
							</div>` : null
						}
					</div>`;
				}) }
			</div>
		</div>`
};
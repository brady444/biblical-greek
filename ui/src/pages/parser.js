/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

import { html } from "uhtml";

import constants from "/src/constants.js";
import utilities from "/src/utilities.js";
import components from "/src/components.js";

export default {
	setup: () => {
		pageData.parse = input => {
			pageData.formGroups = [];
			pageData.selectedOptions = [];
			
			if (input.length > 0) {
				const inputWords = input
					.trim ()
					.split (/\s+/u)
					.map (inputWord => utilities.englishToGreek (inputWord));
				
				for (let i = 0; i < inputWords.length; i++) {
					const inputWord = inputWords [i];
					const simplifiedInputWord = utilities.simplifyGreek (inputWord);
					
					let matchedForms = constants.vocabularyFormsMap [simplifiedInputWord];
					
					if (matchedForms === undefined) {
						matchedForms = [{
							text: inputWord
						}];
					}
					
					// If multiple forms were matched, try to find exact matches
					// Don't try to find an exact match for inputWords that are simplified
					else if (matchedForms.length > 1 && inputWord !== simplifiedInputWord) {
						const exactlyMatchedForms = [];
						
						const formattedInputWord = utilities.isolateGreek (utilities.oxiaToTonos (inputWord));
						
						for (let j = 0; j < matchedForms.length; j++) {
							if (formattedInputWord === matchedForms [j].text) {
								exactlyMatchedForms.push (matchedForms [j]);
							}
						}
						
						if (exactlyMatchedForms.length > 0) {
							matchedForms = exactlyMatchedForms;
						}
					}
					
					pageData.formGroups.push (matchedForms);
					
					pageData.selectedOptions.push ({
						formIndex: 0,
						useIndex: 0
					});
				}
			}
			
			update ();
		};
		
		pageData.updateProperties = event => {
			const propertyIndices = [...event.target.selectedOptions].map (option => option.index);
			
			pageData.showDescriptions = propertyIndices.includes (0);
			pageData.showGlosses = propertyIndices.includes (1);
			pageData.showLexicalForms = propertyIndices.includes (2);
			pageData.showPrincipalParts = propertyIndices.includes (3);
			
			for (let i = 0; i < pageData.selectedOptions.length; i++) {
				pageData.selectedOptions [i].useIndex = 0;
			}
			
			update ();
		};
		
		pageData.swapForm = formGroupIndex => {
			pageData.selectedOptions [formGroupIndex].formIndex += 1;
			
			if (pageData.selectedOptions [formGroupIndex].formIndex > pageData.formGroups [formGroupIndex].length - 1) {
				pageData.selectedOptions [formGroupIndex].formIndex = 0;
			}
			
			pageData.selectedOptions [formGroupIndex].useIndex = 0;
			
			update ();
		};
		
		pageData.swapUse = formGroupIndex => {
			pageData.selectedOptions [formGroupIndex].useIndex += 1;
			
			if (pageData.selectedOptions [formGroupIndex].useIndex > pageData.formGroups [formGroupIndex] [pageData.selectedOptions [formGroupIndex].form].uses.length - 1) {
				pageData.selectedOptions [formGroupIndex].useIndex = 0;
			}
			
			update ();
		};
		
		pageData.formGroups = [];
		
		pageData.showDescriptions = true;
		pageData.showGlosses = true;
		pageData.showLexicalForms = true;
		pageData.showPrincipalParts = true;
		
		pageData.selectedOptions = [];
	},
	
	content: () => html
		`<div class = "page-container flex-column-top grow full-width full-height medium-gap medium-padding">
			<div id = "parser-input" class = "medium-width medium-gap">
				<textarea class = "small-padding medium-font" placeholder = "Enter Greek..." oninput = "pageData.parse (this.value)" />
				
				${ components.wordPropertySelector (pageData.updateProperties, pageData.showDescriptions, pageData.showGlosses, pageData.showLexicalForms, pageData.showPrincipalParts) }
			</div>
			
			<div class = "large-width flex-top flex-wrap medium-gap">
				${ pageData.formGroups.map ((formGroup, formGroupIndex) => {
					const form = formGroup [pageData.selectedOptions [formGroupIndex].formIndex];
					
					return html
						`<div class = "parsed-word flex-column-top x-small-gap">
							${ formGroup.length > 1 ? html
								`<p class = "x-large-font parser-swappable-option" onclick = ${ () => pageData.swapForm (formGroupIndex) }>${ form.text }</p>` : html
								`<p class = "x-large-font">${ form.text }</p>`
							}
							
							${ pageData.showDescriptions || pageData.showGlosses || pageData.showLexicalForms || pageData.showPrincipalParts ? html
								`<div class = "flex-column small-gap">
									${ form.uses === undefined || !pageData.showDescriptions ? null :
										form.uses.length > 1 ? html
											`<p class = "small-font grayA parser-swappable-option" onclick = ${ () => pageData.swapUse (formGroupIndex) }>${ form.uses [pageData.selectedOptions [formGroupIndex].useIndex].description }</p>` : html
											`<p class = "small-font grayA">${ form.uses [0].description }</p>`
									}
									
									${ form.word === undefined || !pageData.showGlosses ? null : html
										`<p class = "small-font grayA">${ form.word.glossesString }</p>`
									}
									
									${ form.word?.lexicalForm === undefined || !pageData.showLexicalForms ? null : html
										`<a class = "small-font grayA" href = ${ "#/word/" + form.word.lexicalForm.replaceAll (" ", "_") }>${ form.word.lexicalForm }</a>`
									}
									
									${ form.word?.principalParts === undefined || !pageData.showPrincipalParts ? null : html
										`<p class = "small-font grayA">${ form.word.principalParts.map ((part, j) => html
											`<span class = "small-font grayA" title = ${ constants.principalParts [j] }>${ part }</span>${ j === 5 ? "" : ", " }`
										) }</p>`
									}
								</div>` : null
							}
						</div>`;
				}) }
			</div>
		</div>`
};

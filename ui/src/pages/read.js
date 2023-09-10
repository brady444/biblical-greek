/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

import { html } from "uhtml";

import constants from "/src/constants.js";
import utilities from "/src/utilities.js";
import components from "/src/components.js";

export default {
	setup: path => {
		// Set up book and chapter indices
		
		pageData.updatePath = () => {
			utilities.setPath (path [0] + "/" + constants.newTestamentBooks [pageData.bookIndex].replaceAll (" ", "-") + "/" + (pageData.chapterIndex + 1));
		};
		
		pageData.updateBook = bookIndex => {
			pageData.bookIndex = bookIndex;
			pageData.chapterIndex = 0;
			
			pageData.updatePath ();
			
			update ();
		};
		
		pageData.updateChapter = chapterIndex => {
			pageData.chapterIndex = chapterIndex;
			
			pageData.updatePath ();
			
			update ();
		};
		
		pageData.bookIndex = Math.max (0, constants.newTestamentBooks.indexOf (path [1]?.replaceAll ("-", " ")));
		
		const chapter = parseInt (path [2]);
		
		pageData.chapterIndex = isNaN (chapter) ? 0 : chapter - 1;
		
		if (pageData.chapterIndex < 0 || pageData.chapterIndex > constants.newTestament [pageData.bookIndex].length - 1) {
			pageData.chapterIndex = 0;
		}
		
		pageData.updatePath ();
		
		// Set up word properties
		
		pageData.updateProperties = event => {
			const propertyIndices = [...event.target.selectedOptions].map (option => option.index);
			
			pageData.showDescriptions = propertyIndices.includes (0);
			pageData.showGlosses = propertyIndices.includes (1);
			pageData.showLexicalForms = propertyIndices.includes (2);
			pageData.showPrincipalParts = propertyIndices.includes (3);
			
			update ();
		};
		
		pageData.showDescriptions = true;
		pageData.showGlosses = true;
		pageData.showLexicalForms = false;
		pageData.showPrincipalParts = false;
	},
	
	content: () => {
		const chapterOptions = [];
		
		for (let i = 0; i < constants.newTestamentChapterCounts [pageData.bookIndex]; i++) {
			chapterOptions.push (html
				`<option class = "medium-font" ?selected = ${ pageData.chapterIndex === i }>${ i + 1 }</option>`
			);
		}
		
		const verses = [];
		
		for (let i = 0; i < constants.newTestament [pageData.bookIndex] [pageData.chapterIndex].length; i++) {
			const verse = constants.newTestament [pageData.bookIndex] [pageData.chapterIndex] [i];
			
			if (verse === null) {
				continue;
			}
			
			verses.push (html
				`<div class = "full-width flex-top-left flex-wrap small-gap">
					<p class = "small-font grayA">${ i + 1 }</p>
					
					${ verse.map (word => html
						`<div class = "parsed-word flex-column-top x-small-gap">
							<p class = "x-large-font">${ word.text }</p>
							
							${ pageData.showDescriptions || pageData.showGlosses || pageData.showLexicalForms || pageData.showPrincipalParts ? html
								`${ pageData.showDescriptions ? html
									`<p class = "small-font grayA">${ word.description }</p>` : null
								}
								
								${ pageData.showGlosses ? html
									`<p class = "small-font grayA">${ word.glossesString }</p>` : null
								}
								
								${ word.lexicalForm === undefined || !pageData.showLexicalForms ? null : html
									`<a class = "small-font grayA" href = ${ "#/word/" + word.lexicalForm.replaceAll (" ", "_") }>${ word.lexicalForm }</a>`
								}
								
								${ word.principalParts === undefined || !pageData.showPrincipalParts ? null : html
									`<p class = "small-font grayA">${ word.principalParts.map ((part, j) => html
										`<span class = "small-font grayA" title = ${ constants.principalParts [j] }>${ part }</span>${ j === 5 ? "" : ", " }`
									) }</p>`
								}
							</div>` : null
						}`
					) }
				</div>`);
		}
		
		return html
			`<div class = "page-container flex-column-top grow full-width full-height medium-gap medium-padding">
				<div id = "reader-input" class = "medium-width flex-top medium-gap">
					<select class = "full-width small-padding medium-font" oninput = "pageData.updateBook (this.selectedIndex)">
						${ constants.newTestamentBooks.map ((book, i) => html
							`<option class = "medium-font" ?selected = ${ i === pageData.bookIndex }>${ book }</option>`
						) }
					</select>
					
					<select class = "full-width small-padding medium-font" oninput = "pageData.updateChapter (this.selectedIndex)">
						${ chapterOptions }
					</select>
					
					${ components.wordPropertySelector (pageData.updateProperties, pageData.showDescriptions, pageData.showGlosses, pageData.showLexicalForms, pageData.showPrincipalParts) }
				</div>
				
				<div class = "large-width flex-top flex-wrap medium-gap">
					${ verses }
				</div>
			</div>`;
	}
};

/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

import { html } from "uhtml";

import constants from "/src/constants.js";

export default {
	setup: path => {
		pageData.word = constants.vocabularyMap [path [1].replaceAll ("_", " ")];
		
		if (pageData.word === undefined) {
			navigate ("dictionary");
			
			return false;
		}
	},
	
	content: () => html
		`<div class = "page-container flex-top grow full-width full-height xx-large-gap medium-padding">
			<div class = "word-container flex-column-left medium-gap">
				<p class = "xx-large-font">${ pageData.word.lexicalForm }</p>
				
				<p class = "small-font">${ pageData.word.number }</p>
				
				<p class = "small-font">${ pageData.word.transliteration }</p>
				
				${ pageData.word.principalParts ? html
					`<p class = "small-font">${ pageData.word.principalParts.map ((part, i) => html
						`<span class = "small-font" title = ${ constants.principalParts [i] }>${ part }</span>${ i === 5 ? "" : ", " }`
					) }</p>` : null
				}
				
				<p class = "small-font">${ pageData.word.definition }</p>
				
				${ pageData.word.kjvDefinition ? html
					`<p class = "small-font">KJV: ${ pageData.word.kjvDefinition }</p>` : null
				}
				
				<p class = "small-font">Frequency: ${ pageData.word.frequency }</p>
			</div>
			
			${ pageData.word.forms.length > 0 ? html
				`<div class = "word-container flex-column-left large-gap">
					${ pageData.word.forms.map (form => html
						`<div class = "flex-column-left x-small-gap">
							<p class = "small-font">${ form.text }</p>
							
							${ form.uses.map (use => html
								`<p class = "small-font grayA">${ use.description }</p>`
							) }
						</div>`
					) }
				</div>` : null
			}
		</div>`
};
/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

import { html } from "uhtml";

import constants from "/src/constants.js";

export default {
	setup: () => {
		pageData.updateBook = bookIndex => {
			pageData.currentBookIndex = bookIndex;
			pageData.currentChapterIndex = 0;
			
			update ();
		};
		
		pageData.updateChapter = chapterIndex => {
			pageData.currentChapterIndex = chapterIndex;
			
			update ();
		};
		
		pageData.currentBookIndex = 0;
		pageData.currentChapterIndex = 0;
	},
	
	content: () => {
		const chapterOptions = [];
		
		for (let i = 0; i < constants.newTestamentChapterCounts [pageData.currentBookIndex]; i++) {
			chapterOptions.push (html
				`<option class = "medium-font" ?selected = ${ pageData.currentChapterIndex === i }>${ i + 1 }</option>`
			);
		}
		
		return html
			`<div class = "page-container flex-column-top grow full-width full-height medium-gap medium-padding">
				<div class = "medium-width flex-top medium-gap">
					<select class = "full-width small-padding medium-font" oninput = "pageData.updateBook (this.selectedIndex)">
						${ constants.newTestamentBooks.map (book => html
							`<option class = "medium-font">${ book }</option>`
						) }
					</select>
					
					<select class = "full-width small-padding medium-font" oninput = "pageData.updateChapter (this.selectedIndex)">
						${ chapterOptions }
					</select>
				</div>
				
				<div class = "large-width flex-top flex-wrap medium-gap">
					${ constants.newTestament [pageData.currentBookIndex] [pageData.currentChapterIndex].map ((verse, i) => html
						`<div class = "full-width flex-top-left flex-wrap small-gap">
							<p class = "xx-large-font grayA">${ i + 1 }</p>
							
							${ verse.map (word => html
								`<p class = "xx-large-font">${ word }</p>`
							) }
						</div>`
					) }
				</div>
			</div>`;
	}
};
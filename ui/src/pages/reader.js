/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */

import { html } from "uhtml";

import constants from "/src/constants.js";
import utilities from "/src/utilities.js";

export default {
	setup: path => {
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
		
		pageData.bookIndex = Math.max (0, constants.newTestamentBooks.indexOf (path [1].replaceAll ("-", " ")));
		
		const chapter = parseInt (path [2]);
		
		pageData.chapterIndex = isNaN (chapter) ? 0 : chapter - 1;
		
		if (pageData.chapterIndex < 0 || pageData.chapterIndex > constants.newTestament [pageData.bookIndex].length - 1) {
			pageData.chapterIndex = 0;
		}
		
		pageData.updatePath ();
	},
	
	content: () => {
		const chapterOptions = [];
		
		for (let i = 0; i < constants.newTestamentChapterCounts [pageData.bookIndex]; i++) {
			chapterOptions.push (html
				`<option class = "medium-font" ?selected = ${ pageData.chapterIndex === i }>${ i + 1 }</option>`
			);
		}
		
		return html
			`<div class = "page-container flex-column-top grow full-width full-height medium-gap medium-padding">
				<div class = "medium-width flex-top medium-gap">
					<select class = "full-width small-padding medium-font" oninput = "pageData.updateBook (this.selectedIndex)">
						${ constants.newTestamentBooks.map ((book, i) => html
							`<option class = "medium-font" ?selected = ${ i === pageData.bookIndex }>${ book }</option>`
						) }
					</select>
					
					<select class = "full-width small-padding medium-font" oninput = "pageData.updateChapter (this.selectedIndex)">
						${ chapterOptions }
					</select>
				</div>
				
				<div class = "large-width flex-top flex-wrap medium-gap">
					${ constants.newTestament [pageData.bookIndex] [pageData.chapterIndex].map ((verse, i) => html
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
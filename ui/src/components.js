/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable implicit-arrow-linebreak */

import { html } from "uhtml";

export default {
	wordPropertySelector: oninput => html
		`<select multiple class = "small-padding medium-font" oninput = ${ oninput }>
			<option class = "medium-font" selected>Description</option>
			<option class = "medium-font" selected>Gloss</option>
			<option class = "medium-font" selected>Lexical Form</option>
			<option class = "medium-font" selected>Principal Parts</option>
		</select>`
};

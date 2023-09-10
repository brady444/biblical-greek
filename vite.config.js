/* eslint-disable camelcase */

import { splitVendorChunkPlugin } from "vite";
import eslint from "vite-plugin-eslint";
import stylelint from "vite-plugin-stylelint";
import replace from "vite-plugin-filter-replace";
import { watch } from "vite-plugin-watch";

export default {
	root: "ui",
	
	build: {
		target: "esnext",
		outDir: "../docs",
		emptyOutDir: true,
		minify: "terser",
		
		terserOptions: {
			compress: {
				arguments: true,
				ecma: "latest",
				passes: 2,
				toplevel: true
			},
			
			mangle: {
				properties: {
					builtins: true,
					
					// Don't mangle any properties that start with "/src/pages" (used for pages object), a capital letter (paradigm names), or a greek letter (paradigm names)
					regex: /^(?![A-Z]|\/src\/pages|[α𝛂𝛼𝜶𝝰𝞪Α𝚨𝛢𝜜𝝖𝞐ἀἈἄἌᾄᾌἂἊᾂᾊἆἎᾆᾎᾀᾈἁἉἅἍᾅᾍἃἋᾃᾋἇἏᾇᾏᾁᾉάάΆΆᾴὰᾺᾲᾰᾸᾶᾷᾱᾹᾳᾼβϐ𝛃𝛽𝜷𝝱𝞫Β𝚩𝛣𝜝𝝗𝞑ᵝᵦγℽ𝛄𝛾𝜸𝝲𝞬Γℾ𝚪𝛤𝜞𝝘𝞒ᵞᵧᴦδ𝛅𝛿𝜹𝝳𝞭Δ𝚫𝛥𝜟𝝙𝞓ᵟεϵ𝛆𝛜𝜀𝜖𝜺𝝐𝝴𝞊𝞮𝟄Ε𝚬𝛦𝜠𝝚𝞔ἐἘἔἜἒἚἑἙἕἝἓἛέέΈΈὲῈϝ𝟋Ϝ𝟊ͷͶϛϚζ𝛇𝜁𝜻𝝵𝞯Ζ𝚭𝛧𝜡𝝛𝞕ͱͰη𝛈𝜂𝜼𝝶𝞰Η𝚮𝛨𝜢𝝜𝞖ἠἨἤἬᾔᾜἢἪᾒᾚἦἮᾖᾞᾐᾘἡἩἥἭᾕᾝἣἫᾓᾛἧἯᾗᾟᾑᾙήήΉΉῄὴῊῂῆῇῃῌθϑ𝛉𝛝𝜃𝜗𝜽𝝑𝝷𝞋𝞱𝟅Θϴ𝚯𝚹𝛩𝛳𝜣𝜭𝝝𝝧𝞗𝞡ᶿιιͺ𝛊𝜄𝜾𝝸𝞲Ι𝚰𝛪𝜤𝝞𝞘ἰἸἴἼἲἺἶἾἱἹἵἽἳἻἷἿίίΊΊὶῚῐῘῖϊΪΐΐῒῗῑῙϳͿκϰ𝛋𝛞𝜅𝜘𝜿𝝒𝝹𝞌𝞳𝟆Κ𝚱𝛫𝜥𝝟𝞙ϗϏλ𝛌𝜆𝝀𝝺𝞴Λ𝚲𝛬𝜦𝝠𝞚ᴧμµ𝛍𝜇𝝁𝝻𝞵Μ𝚳𝛭𝜧𝝡𝞛㎂㎌㎍㎕㎛㎲㎶㎼ν𝛎𝜈𝝂𝝼𝞶Ν𝚴𝛮𝜨𝝢𝞜ξ𝛏𝜉𝝃𝝽𝞷Ξ𝚵𝛯𝜩𝝣𝞝ο𝛐𝜊𝝄𝝾𝞸Ο𝚶𝛰𝜪𝝤𝞞ὀὈὄὌὂὊὁὉὅὍὃὋόόΌΌὸῸπϖℼ𝛑𝛡𝜋𝜛𝝅𝝕𝝿𝞏𝞹𝟉Πℿ𝚷𝛱𝜫𝝥𝞟ᴨϻϺϟϞϙϘρϱ𝛒𝛠𝜌𝜚𝝆𝝔𝞀𝞎𝞺𝟈Ρ𝚸𝛲𝜬𝝦𝞠ᵨῤῥῬᴩϼσϲ𝛓𝛔𝜍𝜎𝝇𝝈𝞁𝞂𝞻𝞼ΣϹ𝚺𝛴𝜮𝝨𝞢ςͼϾͻϽͽϿτ𝛕𝜏𝝉𝞃𝞽Τ𝚻𝛵𝜯𝝩𝞣υ𝛖𝜐𝝊𝞄𝞾Υϒ𝚼𝛶𝜰𝝪𝞤ὐὔὒὖὑὙὕὝὓὛὗὟύύΎΎϓὺῪῠῨῦϋΫϔΰΰῢῧῡῩφϕ𝛗𝛟𝜑𝜙𝝋𝝓𝞅𝞍𝞿𝟇Φ𝚽𝛷𝜱𝝫𝞥ᵠᵩχ𝛘𝜒𝝌𝞆𝟀Χ𝚾𝛸𝜲𝝬𝞦ᵡᵪψ𝛙𝜓𝝍𝞇𝟁Ψ𝚿𝛹𝜳𝝭𝞧ᴪω𝛚𝜔𝝎𝞈𝟂ΩΩꭥ𝛀𝛺𝜴𝝮𝞨ὠὨὤὬᾤᾬὢὪᾢᾪὦὮᾦᾮᾠᾨὡὩὥὭᾥᾭὣὫᾣᾫὧὯᾧᾯᾡᾩώώΏΏῴὼῺῲῶῷῳῼꭥϡϠͳͲϸϷ´ΆΈΉΊΎΌΏάέήίόύώ])/gu,
					
					// Don't mangle any properties in this array
					reserved: [
						"__proto__",
						"addEventListener",
						"addedNode",
						"append",
						"body",
						"call",
						"childList",
						"childNodes",
						"constructor",
						"content",
						"createDocumentFragment",
						"createElement",
						"createElementNS",
						"createTextNode",
						"createTreeWalker",
						"credentials",
						"crossOrigin",
						"data",
						"dataset",
						"default",
						"deleteContents",
						"filter",
						"firstChild",
						"for",
						"get",
						"getAttribute",
						"has",
						"hasAttribute",
						"href",
						"importNode",
						"includes",
						"index",
						"indexOf",
						"innerHTML",
						"insertBefore",
						"integrity",
						"isArray",
						"join",
						"lastChild",
						"length",
						"map",
						"name",
						"nextNode",
						"nextSibling",
						"node",
						"nodeType",
						"normalize",
						"parentNode",
						"path",
						"prototype",
						"push",
						"reduceRight",
						"referrerPolicy",
						"removeAttribute",
						"removeAttributeNode",
						"removeChild",
						"removeEventListener",
						"replace",
						"replaceAll",
						"replaceChild",
						"replaceChildren",
						"selectedOptions",
						"set",
						"setAttribute",
						"setAttributeNodeNS",
						"setEndAfter",
						"setStartAfter",
						"slice",
						"splice",
						"split",
						"stack",
						"subtree",
						"supports",
						"tagName",
						"target",
						"test",
						"textContent",
						"toLocaleString",
						"toLowerCase",
						"toLowerCase",
						"toUpperCase",
						"trim",
						"trimEnd",
						"type",
						"value",
						"valueOf",
						"values"
					]
				},
				
				toplevel: true
			}
		}
	},
	
	server: {
		host: true
	},
	
	json: {
		stringify: true
	},
	
	// Workaround to make Vite watch for changes in the parser directory, so that vite-watch can auto-run the parser on changes
	envDir: "../parser",
	
	plugins: [
		splitVendorChunkPlugin (),
		eslint (),
		stylelint (),
		
		replace.default ([
			{
				filter: /.js$/u,
				
				replace: {
					from: "\t",
					to: ""
				}
			}
		]),
		
		watch ({
			pattern: "../parser/**/*",
			command: "bun parser",
			timeout: 0,
			onInit: false
		})
	]
};

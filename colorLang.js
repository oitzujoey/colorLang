
var colorPaletteAlpha = [
	[240, 163, 255],    // A
	[0, 117, 220],      // B
	[153, 63, 0],       // C
	[76, 0, 92],        // D
	[25, 25, 25],       // E
	[0, 92, 49],        // F
	[43, 206, 72],      // G
	[255, 204, 153],    // H
	[128, 128, 128],    // I
	[148, 255, 181],    // J
	[143, 124, 0],      // K
	[157, 204, 0],      // L
	[194, 0, 136],      // M
	[0, 51, 128],       // N
	[255, 164, 5],      // O
	[255, 168, 187],    // P
	[66, 102, 0],       // Q
	[255, 0, 16],       // R
	[94, 241, 242],     // S
	[0, 153, 143],      // T
	[224, 255, 102],    // U
	[116, 10, 255],     // V
	[153, 0, 0],        // W
	[255, 255, 128],    // X
	[255, 255, 0],      // Y
	[255, 80, 0]        // Z
];

var colorPaletteNumeric = [
	[0, 0, 0],          // 0
	[153, 63, 0],       // 1
	[255, 0, 0],        // 2
	[255, 164, 5],      // 3
	[255, 255, 0],      // 4
	[0, 255, 0],        // 5
	[0, 117, 220],      // 6
	[0, 0, 0],          // 7
	[0, 0, 0],          // 8
	[0, 0, 0]           // 9
];

var colorPalette = [];
var colorPaletteCompliment = [];
var colorPaletteDark = [];
var colorPaletteLight = [];

var top = 0x80 - 0x20;

for (var i = 0, n, r, g, b; i < colorPaletteAlpha.length; i++) {
	
	// n = i / top;
	
	// r = 127 * i / top;
	// g = 127 * ((3 * i) % top) / top ;
	// b = 127 * ((3 * 3 * i) % top) / top;
	
	r = colorPaletteAlpha[i][0];
	g = colorPaletteAlpha[i][1];
	b = colorPaletteAlpha[i][2];
	
	// colorPaletteDark.push('rgb(' + 128*r + ', ' + 128*g + ', ' + 128*b + ')');
	// colorPaletteLight.push('rgb(' + 256*r + ', ' + 256*g + ', ' + 256*b + ')');
	
	colorPalette.push(
		'rgb(' +
		r +
		', ' +
		g +
		', ' +
		b +
		')'
	);
	colorPaletteCompliment.push(
		'rgb(' +
		(255 - r) +
		', ' +
		(255 - g) +
		', ' +
		(255 - b) +
		')'
	);
}

function textNodesUnder(node){
	var all = [];
	for (node=node.firstChild;node;node=node.nextSibling){
		if ((node.nodeType==Node.TEXT_NODE) &&
			(node.parentElement.tagName !== 'STYLE') &&
			(node.parentElement.tagName !== 'SCRIPT')// &&
			// Span is to prevent reevaluation of a page.
			/* (node.parentElement.tagName !== 'SPAN')*/)
			all.push(node);
		else all = all.concat(textNodesUnder(node));
	}
	return all;
}

// Copied code.
// function lightOrDark(color) {

// 	// Variables for red, green, blue values
// 	var r, g, b, hsp;
	
// 	// Check the format of the color, HEX or RGB?
// 	if (color.match(/^rgb/)) {

// 		// If RGB --> store the red, green, blue values in separate variables
// 		color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
		
// 		r = color[1];
// 		g = color[2];
// 		b = color[3];
// 	} 
// 	else {
		
// 		// If hex --> Convert it to RGB: http://gist.github.com/983661
// 		color = +("0x" + color.slice(1).replace( 
// 		color.length < 5 && /./g, '$&$&'));

// 		r = color >> 16;
// 		g = color >> 8 & 255;
// 		b = color & 255;
// 	}
	
// 	// HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
// 	hsp = Math.sqrt(
// 	0.299 * (r * r) +
// 	0.587 * (g * g) +
// 	0.114 * (b * b)
// 	);

// 	// Using the HSP value, determine whether the color is light or dark
// 	if (hsp>127.5) {

// 		return 'light';
// 	} 
// 	else {

// 		return 'dark';
// 	}
// }

// function getContrastYIQ(hexcolor){
//     hexcolor = hexcolor.replace("#", "");
//     var r = parseInt(hexcolor.substr(0,2),16);
//     var g = parseInt(hexcolor.substr(2,2),16);
//     var b = parseInt(hexcolor.substr(4,2),16);
//     var yiq = ((r*299)+(g*587)+(b*114))/1000;
//     return (yiq >= 128) ? 'black' : 'white';
// }

function colorizeString(string, killLetters) {
	var colorizedString = "";
	var span;
	var character;
	var value;
	var brightness;
	
	// Todo: Ignore any string that is only whitespace.
	if (string === '') {
		return string;
	}
	
	// colorizedString += '<b>'
	
	for (var i = 0, length = string.length; i < length; i++) {
		span = false;
		
		character = string.charAt(i);
		value = character.toLowerCase().charCodeAt(0);
		if ((value > 0x60) && (value < 0x7B)) {
			span = true;
		}
		
		if (span === true) {
			colorizedString += '<span style="color: ';
			if (killLetters) {
				colorizedString += colorPalette[(value - 0x61) % colorPalette.length];
			}
			else {
				brightness = colorPaletteAlpha[(value - 0x61) % colorPaletteAlpha.length][0];
				brightness += colorPaletteAlpha[(value - 0x61) % colorPaletteAlpha.length][1];
				brightness += colorPaletteAlpha[(value - 0x61) % colorPaletteAlpha.length][2];
				brightness /= 3;
				
				if (brightness < 128) {
					colorizedString += 'white';
				}
				else {
					colorizedString += 'black';
				}
				// colorizedString += colorPaletteCompliment[(value - 0x61) % colorPaletteCompliment.length];
			}
			colorizedString += '; background-color: ';
			colorizedString += colorPalette[(value - 0x61) % colorPalette.length];
			colorizedString += ';">' + character + '</span>';
		}
		else {
			colorizedString += character;
		}
	}
	// colorizedString += '</b>'
	
	return colorizedString;
}

var nodes = textNodesUnder(document.body);
for (var i in nodes) {
	replacementNode = document.createElement('span');
	replacementNode.innerHTML = colorizeString(nodes[i].textContent, false)
	nodes[i].replaceWith(replacementNode)
}

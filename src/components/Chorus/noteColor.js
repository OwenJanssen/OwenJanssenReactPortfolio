const toColor = (noteNumber) => {
	noteNumber >>>= 0;
	var b = (noteNumber < 64) ? ((noteNumber-64)*4 & 0xFF) : 0xFF
	var g = (noteNumber < 64) ? 0 : (((noteNumber-64)*4*255) & 0xFF00) >>> 8
	var r = (noteNumber < 64) ? 0 : (((noteNumber-64)*4*255*255^2) & 0xFF0000) >>> 16
	return "rgba(" + [r, g, b, '100'].join(",") + ")";
}

export const noteColor = (instrument, beat) => {
	const beatForInstrument = beat[1].filter((val) => val[0] === instrument)[0];
	const note_ = beatForInstrument[1];
	return toColor(note_);
}
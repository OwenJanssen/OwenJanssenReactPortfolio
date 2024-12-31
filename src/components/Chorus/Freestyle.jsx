import { useState, useEffect, useRef } from 'react';
import MIDISounds from 'midi-sounds-react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

export const Freestyle = () => {
	var octave = 5;
	const midiSounds = useRef(undefined);
	const selectedInstrument = useRef(4);
	const envelopes = useRef([]);
    const [count, setCount] = useState(0);

	const instrumentsMap = {
		"Piano": 4,
		"Acoustic guitar": 258,
		"Electric guitar": 295,
		"Electric bass": 387,
		"Trumpet": 619,
		"Trombone": 628,
		"Bamboo flute": 816
	};

	const drumsMap = {
		"Bass drum": 3,
		"Hand clap": 22,
		"Hi-hat": 35,
		"Rimshot": 11,
		"Snare drum": 27
	};

	const keyToNote = {
		"q": 0,
		"w": 1,
		"e": 2,
		"r": 3,
		"t": 4,
		"y": 5,
		"u": 6,
		"i": 7,
		"o": 8,
		"p": 9,
		"[": 10,
		"]": 11
	}


	const handleKeyDown = (event) => {
		if (!midiSounds.current) { return };

		if (event.key === "+" || event.key === "=") {
			if (octave < 11) {
				octave++;
			}
		}

		else if (event.key === "-" || event.key === "_") {
			if (octave > 0) {
				octave--;
			}
		}

		const n = Math.min(keyToNote[event.key] + 12 * octave, 127);

	    if (Object.keys(keyToNote).includes(event.key)) {
			envelopes.current[n]=midiSounds.current.player.queueWaveTable(midiSounds.current.audioContext
				, midiSounds.current.equalizer.input
				, window[midiSounds.current.player.loader.instrumentInfo(selectedInstrument.current).variable]
				, 0, n, 0.25, 2/9);
		}
	};

    const handleKeyUp = (event) => {
		const n = keyToNote[event.key] + 12 * octave;

		if (Object.keys(keyToNote).includes(event.key)) {
			if(envelopes.current){
				if(envelopes.current[n]){
					envelopes.current[n].cancel();
					envelopes.current[n]=null;
				}
			}
		}
    }

	const handleChange = (event) => {
		selectedInstrument.current = (event.target.value);
        setCount(count => count+1)
	}

	window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp)

	return (
		<div>
			<div className="soloSelector">
				<FormControl style={{width: "200px"}}>
					<InputLabel id="instrument-label" style={{width: "fit-content"}}>Solo Instrument</InputLabel>
						<Select
							labelId="instrument-label"
							id="demo-simple-select"
							value={selectedInstrument.current}
							label="Solo Instrument"
							onChange={handleChange}
						>
							{Object.keys(instrumentsMap).map((x) =>
								<MenuItem value={instrumentsMap[x]} key={instrumentsMap[x]}>{x}</MenuItem>
							)}
							
						</Select>
				</FormControl>
			</div>

			<MIDISounds ref={(ref) => {if (ref !== null && ref !== undefined)  { midiSounds.current=(ref) }}} drums={Object.values(drumsMap)} instruments={Object.values(instrumentsMap)} />
		</div>
	)
}

export default Freestyle;
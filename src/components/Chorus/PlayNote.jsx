import React, { useState } from 'react';
import MIDISounds from 'midi-sounds-react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { Button } from '@mui/material';
import { useDbData, useDbUpdate } from '/src/utilities/firebase';
import LoopProgressIndicator from './LoopProgressIndicator';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import StopIcon from '@mui/icons-material/Stop';
import { noteColor } from './noteColor';
	
export const PlayNote = ({ bpm, note, octave, setOctave, loop, setLoop, notesPerMeasure, isPlayed, setIsPlayed, id, selectedInstrument, setSelectedInstrument }) => {
	const defaultColor = "#EEEEEE";
	const [instruments, setInstruments] = useState(["Electric guitar", "Electric bass"])
	const [drums, setDrums] = useState(["Bass drum", "Hand clap", "Hi-hat", "Rimshot", "Snare drum"])

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

	const handleDrumsChange = (event, newDrums) => {
		setDrums(newDrums);
	};

	const handleInstrumentsChange = (event, newInstruments) => {
		setInstruments(newInstruments);
	};

	const [midiSounds, setMidiSounds] = useState(undefined);
	const [update, result] = useDbUpdate(`/chorus/sessions/${id}`);

	const startLoop = () => {
		if (midiSounds) {
			setIsPlayed(true);
			midiSounds.startPlayLoop(loop, bpm, 1/notesPerMeasure, midiSounds.beatIndex);
		}
	}

	const pauseLoop = () => {
		setIsPlayed(false);
		midiSounds.stopPlayLoop();
	}

	const stopLoop = () => {
		setIsPlayed(false);
		midiSounds.beatIndex = 0;
		midiSounds.stopPlayLoop();
	}

	const updateDrumLoop = (i, drum) => {
		var loopCopy = [...loop];
		if (loopCopy[i][0].length > 0 && loopCopy[i][0].includes(drum)) {
			loopCopy[i][0] = loopCopy[i][0].filter((x) => x !== drum);
		} else {
			loopCopy[i][0] = [...loopCopy[i][0], drum];
		}
		setLoop(loopCopy);
		updateLoopToDb(loopCopy);
	}

	const includesInstrument = (instrumentArray, instrument) => {
		return instrumentArray.filter((val) => val[0] === instrument).length > 0;
	}

	const updateInstrumentLoop = (i, instrument) => {
		var loopCopy = [...loop];
		if (loopCopy[i][1].length > 0 && includesInstrument(loopCopy[i][1], instrument)) {
			loopCopy[i][1] = loopCopy[i][1].filter((x) => x[0] !== instrument);
		} else {
			console.log("NOTE: " + note + " OCTAVE: " + octave + " REAL NOTE: " + (note+12*octave))
			loopCopy[i][1] = [...loopCopy[i][1], [instrument, [note + (12 * octave)], 1 / notesPerMeasure]];
		}
		setLoop(loopCopy);
		//console.log(printBeats(loopCopy))
		updateLoopToDb(loopCopy);
	}

	const isDrumSelected = (i, drum) => {
		return loop[i][0].length > 0 && loop[i][0].includes(drum);
	}

	const isInstrumentSelected = (i, instrument) => {
		return loop[i][1].length > 0 && includesInstrument(loop[i][1], instrument)
	}

	const updateLoopToDb = (loopArr) => {
		update(
			{"loop": JSON.stringify(loopArr),
			 "bpm": JSON.stringify(bpm)}
		)
	}

	const [beatIndex, setBeatIndex] = useState(0);

	return <div style={{ marginTop: "10px", display: "flex", flexDirection: "column"}}>
		<div className='flex-row' style={{alignSelf: "center", marginBottom: "50px"}}>
			<ToggleButtonGroup value={drums} onChange={handleDrumsChange} style={{marginRight: "20px"}} color="success">
				{Object.keys(drumsMap).map(drum => <ToggleButton value={drum} key={drum}>{drum}</ToggleButton>)}
			</ToggleButtonGroup>
			
			<ToggleButtonGroup value={instruments} onChange={handleInstrumentsChange} color="primary">
				{Object.keys(instrumentsMap).map(instrument => <ToggleButton value={instrument} key={instrument}>{instrument}</ToggleButton>)}
			</ToggleButtonGroup>			
		</div>

		<LoopProgressIndicator midiSounds = {midiSounds} isPlayed={isPlayed} beatIndex={beatIndex} setBeatIndex={setBeatIndex} height={28 * (drums.length + instruments.length)}/>

		<div style={{display: "flex", flexDirection: "row", height: "100%", position: "relative", 
					 bottom: (28 * (drums.length + instruments.length) + 12), 
					 marginBottom: -(28 * (drums.length + instruments.length) + 12)}}>
			<div className="instrument-labels-column">
				{drums.map((drum, idx) => {
					return <div key={idx}>
						{drum}:
					</div>
				})}

				{instruments.map((instrument, idx) => {
					return <div key={idx}>
						{instrument}:
					</div>
				})}
			</div>

			<div className="instrument-loops-column">
				{drums.map((drum, idx) => 
					<div className="row" key={idx}>
						{loop.map((_, i) =>
							<button id={`beat-button-${drum.replace(" ", "-").toLowerCase()}-${i}`} className="beat-button" 
									data-cy={isDrumSelected(i, drumsMap[drum]) ? "selected-beat" : "unselected-beat"}
									style={{ backgroundColor: isDrumSelected(i, drumsMap[drum]) ? "black" : defaultColor }}
									key={i} onClick={() => updateDrumLoop(i, drumsMap[drum])}/>)}
					</div>
				)}

				{instruments.map((instrument, idx) =>
					<div className="row" key={idx}>
						{loop.map((beat, i) => 
							<button className="beat-button" id={`beat-button-${instrument.replace(" ", "-").toLowerCase()}-${i}`}
									data-cy={isInstrumentSelected(i, instrumentsMap[instrument]) ? "selected-beat" : "unselected-beat"}
									style={{ backgroundColor: isInstrumentSelected(i, instrumentsMap[instrument]) ? noteColor(instrumentsMap[instrument], beat) : defaultColor }}
									key={i} onClick={() => updateInstrumentLoop(i, instrumentsMap[instrument])}/>)}
					</div>
				)}
			</div>

			<div className="instrument-labels-column"/>
		</div>

		<div className="play-controls">
			{isPlayed ? <Button variant={"contained"}
				color="success"
				data-cy="stop-btn"
				onClick={pauseLoop}
				startIcon={<PauseCircleOutlineIcon />}
				style={{width: "105px"}}>
				Pause
			</Button> : 
			<Button variant={"outlined"}
				color="success"
				data-cy="play-btn"
				onClick={startLoop}
				startIcon={<PlayCircleOutlineIcon />}
				style={{width: "105px"}}>
				Play
			</Button>}
			<Button variant={beatIndex > 0 ? "contained" : "outlined"}
				color="success"
				data-cy="play-btn"
				onClick={stopLoop}
				startIcon={<StopIcon />}
				style={{width: "105px"}}>
				Stop
			</Button>
		</div>

		<MIDISounds ref={(ref) => (setMidiSounds(ref))} drums={Object.values(drumsMap)} instruments={Object.values(instrumentsMap)} />

		<div data-cy={isPlayed ? "status-playing" : "status-stop"}></div>
	</div>
};

export default PlayNote;
// distinct notes - make a button for each of these 
// conversion chart: https://miro.medium.com/proxy/1*CDXHKG0-4QO9Y-DCTAcqPg.png
import React, { useState } from 'react';
import './NoteSelectorBar.css'
import { ButtonGroup, Button } from '@mui/material';
import { DisabledByDefaultRounded } from '@mui/icons-material';

export const notes = (new Array(12)).fill(undefined).map((_, i) => i);
const note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

const NoteButton = ({note, noteName, setNote, selectedNote, disabled}) => {
    const selected = (note === selectedNote);
    
    return (
        <Button 
            data-testid='note-button'
            data-cy={note + (selected ? "-selected" : "-unselected")}
            role={note + (selected ? "-selected" : "-unselected")}
            style={selected ? {backgroundColor: "darkseagreen"} : {}} 
            onClick={() => setNote(note)} disabled={disabled}>
            {noteName}
        </Button>
    )
}

const handleOctiveChange = (direction, setOctave, note, setNote) => {
    setOctave((o) => {
        if (direction) {
            if (o+1 === 10 && note > 7) {
                setNote(7);
            }
            return Math.min(o+1, 10);
        } else {
            return Math.max(o-1, 0);
        }
    })
}

const OctaveButton = ({setOctave, direction, note, setNote}) => {
    return (
        <Button className="noteButton" onClick={() => handleOctiveChange(direction, setOctave, note, setNote)} data-testid={direction ? 'octave-plus-button' : 'octave-minus-button'}>
            {direction ? "+" : "-"}
        </Button>
    )
}

export const NoteSelectorBar = ({note, setNote, octave, setOctave}) => {
    return <div>
        <ButtonGroup variant="outlined" color="success" aria-label="outlined button group" className="flex-row note-container" style={{marginRight: "5px"}}>
            <OctaveButton setOctave={setOctave} direction={1} note={note} setNote={setNote} />
            <OctaveButton setOctave={setOctave} direction={0}/>
            <Button disableRipple>Octave: {octave}</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="success" aria-label="outlined button group" className="flex-row note-container">
            {note_names.map((note_name, idx) => 
                <NoteButton note={idx} noteName={note_name} setNote={setNote} selectedNote={note} key={idx}
                            disabled={octave === 10 && (note_name==="G#" || note_name==="A" || note_name==="A#" || note_name==="B")}/>
            )}
        </ButtonGroup>
    </div>
}
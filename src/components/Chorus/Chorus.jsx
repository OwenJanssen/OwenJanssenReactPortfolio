import './Chorus.css';
import PlayNote from './PlayNote';
import BpmSelector from './BpmSelector';
import Piano from './Piano';
import { NoteSelectorBar } from './NoteSelectorBar.jsx'
import { useState, useEffect } from 'react';
import { emptyBeatArray, neverGonnaGiveYouUp } from "./loops.js"
import { Button, IconButton, Tooltip, CircularProgress, Chip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDbData, useDbUpdate } from '/src/utilities/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import Freestyle from './Freestyle';

const goToHomepage = () => {
  window.location.href = "/chorus";
}

export const ChorusContent = ({ id }) => {
  const [bpm, setBpm] = useState(120);
  const [note, setNote] = useState(0);
  const [octave, setOctave] = useState(5);
  const [measures] = useState(4);
  const [notesPerMeasure] = useState(16);
  const [data, error] = useDbData(`/chorus/sessions/${id}`);
  const [isPlayed, setIsPlayed] = useState(false);
  const [loop, setLoop] = useState(emptyBeatArray(measures, notesPerMeasure));
  const [selectedInstrument, setSelectedInstrument] = useState(0);
  const [update, result] = useDbUpdate(`/chorus/sessions/${id}`);

  useEffect(() => {
    // Update the document title using the browser API
    if (data != undefined) {
      setLoop(JSON.parse(data.loop))
      setBpm(JSON.parse(data.bpm))
    }
  }, [data]);

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <CircularProgress color="success" />;

  const updateLoopToDb = (loopArr, bpmVal) => {
    update(
      {
        "loop": JSON.stringify(loopArr),
        "bpm": bpmVal
      }
    )
  }

  return <div className="page-container chorus">
    <div className='KeyListener'>
      <div className='flex-col'>
        <Chip label={`Code: ${id}`} color="success" id="code-chip" />
        <div className='flex-row' style={{ width: "50%", justifyContent: "space-evenly", marginTop: "10px", marginBottom: "10px" }}>
          <div style={{ flex: 1 }}>
            <BpmSelector bpm={bpm} setBpm={setBpm} id={id} />
          </div>
          <div style={{ flex: 1 }}>
            <Button variant="outlined"
              color="success"
              onClick={() => {
                setLoop([...neverGonnaGiveYouUp]);
                setBpm(111);
                updateLoopToDb([...neverGonnaGiveYouUp], 111);
              }}
              style={{ width: "fit-content", height: "100%" }}
              data-cy={"load-example-1"}>
              Load Example 1
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <Tooltip title={"Delete Track"}>
              <IconButton variant="outlined" onClick={() => {
                setLoop(emptyBeatArray(measures, notesPerMeasure))
                setBpm(120);
                updateLoopToDb(emptyBeatArray(measures, notesPerMeasure), 120);
              }} data-cy={"Delete"}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={"instructions-text"}>
          First select the instruments you would like to play.{"\n"}
          Next select the note you would like to play using the octave and notes at the bottom.{"\n"}
          Then click on the beat you would like it to be played on in the row for your desired instrument.{"\n"}
          You can also select a solo instrument and use your "qwerty" row of your keyboard to play.{"\n"}
          Share your code with friends to make a Chorus together!{"\n"}
        </div>
        <PlayNote bpm={bpm} note={note} octave={octave} setOctave={setOctave}
          loop={loop} setLoop={setLoop} notesPerMeasure={notesPerMeasure}
          isPlayed={isPlayed} setIsPlayed={setIsPlayed} id={id} selectedInstrument={selectedInstrument} setSelectedInstrument={setSelectedInstrument} />
        <NoteSelectorBar note={note} setNote={setNote} octave={octave} setOctave={setOctave}></NoteSelectorBar>
        <Freestyle selectedInstrument={selectedInstrument} setSelectedInstrument={setSelectedInstrument} />
      </div>

    </div>
  </div>;
};

export const Chorus = () => {
  const { id } = useParams();

  return <ChorusContent id={id} />;
};

export default Chorus;

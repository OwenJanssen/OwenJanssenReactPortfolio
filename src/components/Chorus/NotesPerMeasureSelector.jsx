import { TextField } from '@mui/material';

export const NotesPerMeasureSelector = ({notesPerMeasure, setNotesPerMeasure}) => {
    const max = 16;
    const min = 1;

    const onNotesPerMeasureChange = (event) => {
        if (Number(event.target.value) > max) {
            setNotesPerMeasure(max);
        }
        else if (Number(event.target.value) < min) {
            setNotesPerMeasure(min);
        }
        else {
            setNotesPerMeasure(event.target.value);
        }
    }

    return <TextField
            id="outlined-number"
            label="Notes Per Measure"
            type="number"
            InputProps={{ inputProps: { min: min, max: max, step: "1" } }}
            variant="outlined"
            onChange={onNotesPerMeasureChange}
            value={notesPerMeasure}
        />;
}

export default NotesPerMeasureSelector;
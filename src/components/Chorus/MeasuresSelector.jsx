import { TextField } from '@mui/material';

export const MeasuresSelector = ({measures, setMeasures}) => {
    const max = 16;
    const min = 1;

    const onMeasuresChange = (event) => {
        if (Number(event.target.value) > max) {
            setMeasures(max);
        }
        else if (Number(event.target.value) < min) {
            setMeasures(min);
        }
        else {
            setMeasures(event.target.value);
        }
    }

    return <TextField
            id="outlined-number"
            label="Measures"
            type="number"
            InputProps={{ inputProps: { min: min, max: max, step: "1" } }}
            variant="outlined"
            onChange={onMeasuresChange}
            value={measures}
        />;
}

export default MeasuresSelector;
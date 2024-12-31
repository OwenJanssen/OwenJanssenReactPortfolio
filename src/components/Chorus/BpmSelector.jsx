import { TextField } from '@mui/material';
import { useDbUpdate } from '../../utilities/firebase';

export const BpmSelector = ({bpm, setBpm, id}) => {
    const max = 999;
    const min = 1;
    const [update, result] = useDbUpdate(`/chorus/sessions/${id}`);

    const updateBpmToDb = (bpmVal) => {
		update(
			{
                "bpm": bpmVal
            }
		)
	}

    const onBpmChange = (event) => {
        if (Number(event.target.value) > max) {
            setBpm(max);
            updateBpmToDb(max);
        }
        else if (Number(event.target.value) < min) {
            setBpm(min);
            updateBpmToDb(min);
        }
        else {
            setBpm(event.target.value);
            updateBpmToDb(event.target.value);
        }
    }

    const getBpm = () => {
        return bpm;
    }

    return <TextField
            id="outlined-number"
            data-cy="bpm-input"
            label="BPM"
            type="number"
            InputProps={{ inputProps: { min: min, max: max, step: "1" } }}
            variant="outlined"
            onChange={onBpmChange}
            value={bpm}
        />;
}

export default BpmSelector
import React, { useState } from 'react';
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

const sliderProps = {
    min: 1.0,
    max: 5.0,
    step: 0.5,
    marks: {1.0: 1, 2.0: 2, 3.0: 3, 4.0: 4, 5.0: 5}
}

const StudentSlider = () => {
    const [value, setValue] = useState(2.5);
    return <div>
        <Slider
            value={value}
            onChange={val => setValue(val)}
            {...sliderProps}
        />
    </div>
}

export default StudentSlider;
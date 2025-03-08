import React, { useState } from 'react';
import { Balloon } from './StateManagement';

export function UseStateExample(): React.ReactElement {
    const [length, setLength] = useState<number>(1);
    const [size, setSize] = useState<number>(1);
    const [color, setColor] = useState<string>('#FF0000');

    function onPop() {
        alert("Your ballon popped!");
        setLength(1);
        setSize(1);
    }

    return <Balloon length={length}
        setLength={setLength}
        size={size}
        setSize={setSize}
        color={color}
        setColor={setColor}
        onPop={onPop}/>;
}
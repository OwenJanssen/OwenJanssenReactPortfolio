import React, { useEffect, useState } from 'react';

const Countdown = ({trigger, countMax}) : React.ReactElement => {
    const [count, setCount] = useState(3);

    const styles = [
        {color: "green"},
        {color: "blue"},
        {color: "red"},
    ];

    useEffect(() => {
        setCount(countMax);
        const intervalId = setInterval(() => setCount(c => c--), 1000);
        return () => clearInterval(intervalId);
    }, [trigger]);

    return (
        <div className="countdown-number">
            {(count > 0) && <div style={styles[count-1]}>
                {count}
            </div>}
        </div>
    )
}

export default Countdown
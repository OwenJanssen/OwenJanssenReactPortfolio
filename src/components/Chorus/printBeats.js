export const printBeats = (beats) => {
    return "[" + 
        beats.map(b => 
            "[" + 
                "[" + 
                    b[0].join(',') +
                "]" +
                "," + 
                "[" +
                    (b[1].length > 0 ? `${b[1].map(i => `[${i[0]},[${i[1][0]}],${i[2]}]`).join(',')}` :  ``) +
                "]" + 
            "]")
        .join(',') +
    "]"
};
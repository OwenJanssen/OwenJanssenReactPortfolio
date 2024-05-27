import React from "react";

export const Header = (props: { visibleLetters: string, hiddenLetters: string }) => {
    return <div className={"header"}>
        <div className={"visible-letters"}>{props.visibleLetters}</div>
        <div className={"hidden-letters"} style={{visibility: "hidden"}}>{ props.hiddenLetters }</div>
    </div>;
}
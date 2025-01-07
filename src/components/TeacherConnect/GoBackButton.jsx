import { routeInfo } from "./teacherConnectData";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = ()=>{
    const [hint,setShowHint] = useState(false)
   
    const nav = useNavigate();
    const length = routeInfo.stack.length;
    function handleMouseOver(){
        setShowHint(true)
    };

    function handleMouseLeave(){
        setShowHint(false)
    };

    function handleClick(){
        //pop from stack 
        let goTo = routeInfo.stack.pop()?.route ?? "/teacher-connect";
        console.log("go back to", goTo)
        nav(goTo);
    };
    
    // console.log(routeInfo.prev)
    return <div className="go-back-btn" 
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
    >
        Back
        <div className={`tip ${hint? "tip-active":"tip-hidden"}`}>
            {routeInfo.getLastRoute() }
        </div>
    </div>
}

export default GoBackButton;
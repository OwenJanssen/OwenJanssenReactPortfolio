// import { useNavigate } from "react-router-dom";
import history from "history/browser";
import { routeInfo } from "./teacherConnectData";

export function SaveHistory(navigateFn,route){
    //this function is for jumping to outer-bound pages, which 
    //means we are not going back 
    navigateFn(route);
    routeInfo.stack.push(routeInfo.curr);
}
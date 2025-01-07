import history from "history/browser";

const ErrorFallBack = ()=>{

   setTimeout(()=>{
    history.push("/");
    location.reload();
   },1000) 
   return <div>Something went wrong, taking you back to homepage...</div>
}

export default ErrorFallBack;
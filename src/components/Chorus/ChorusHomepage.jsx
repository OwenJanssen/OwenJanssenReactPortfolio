import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const ChorusHomepage = () => {
  const [joinId, setJoinId] = useState("");

  const goToSession = (joinId_) => {
    if(joinId_){
      window.location.href = "/chorus/session/" + joinId_;
    }
  }

  const goToNewSession = (joinId_) => {
    // make a database entry
    goToSession(joinId_);
  }

  const updateJoinId = (event) => {
    setJoinId(event.target.value);
  }

  return <div className="page-container chorus-homepage">
    <div className="container">
      <div class="white-background">
        <div className="cover-div">
          <img src={"https://i.postimg.cc/ydNsScv5/chorus-icon.png"} alt="chorus icon" />
        </div>

        <div className="enter-code-form">
          <form className="join-with-code">
            <div className="join-with-code-field">
              <div className={"join-text"} for="fname">Join With Code:</div>
              <TextField
                  hiddenLabel
                  id="code"
                  variant="outlined"
                  value={joinId}
                  color="success"
                  size="small"
                  onChange={updateJoinId}
              />
            </div>
            <div className="join-with-code-btn" style={{ marginTop: "10px" }}>
              <Button variant="contained" color="success" id="test" onClick={()=>goToSession(joinId)}>JOIN</Button>
            </div>
          </form>
        </div>

        <div className={"join-text"}>-- OR --</div>

        <div className='new-session-button' style={{ marginTop: "10px" }}>
          <Button variant="outlined" color="success" onClick={() => {
            goToNewSession(Math.floor(1000 + Math.random() * 9000));
          }}>New Session</Button>
        </div>
      </div>
    </div>
  </div>;
}





export default ChorusHomepage;
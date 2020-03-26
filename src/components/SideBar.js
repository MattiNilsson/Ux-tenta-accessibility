import React, {useState, useContext, useEffect, useRef} from "react";
import styled from "styled-components";
import { Redirect } from 'react-router-dom';

import {SideBarContext} from "./SideBarContext";

const Wrapper = styled.aside`
position: absolute;
left: ${props => props.isHidden === false ? "0" : "-220px"};
width: 200px;
height: ${window.innerHeight + "px"};
background-color: #262626;
top: 50px;
transition: 0.3s all ease-out;
-webkit-box-shadow: 5px 1px 5px 0px rgba(0,0,0,0.36);
-moz-box-shadow: 5px 1px 5px 0px rgba(0,0,0,0.36);
box-shadow: 5px 1px 5px 0px rgba(0,0,0,0.36);
z-index: -5;

.listOfOptions{
  position: absolute;
  left: 10px;
  display:flex;
  flex-direction: column;
}
button{
  position: relative;
  width: 180px;
  margin-top: 10px;
  height: 40px;
  display:flex;
  border: none;
  background-color: #262626;
  outline: none;
}
button > span{
  pointer-events: none;
  position: relative;
  top: 5px;
  color:white;
  z-index: 3;
}
button > h3{
  pointer-events: none;
  position: relative;
  top: -7px;
  left: 10px;
  color:white;
  z-index: 3;
}
.underline{
  pointer-events: none;
  position: absolute;
  left:0;
  bottom: 0;
  height: 40px;
  width: 0px;
  border-bottom: 2px solid #f55b14;
  background-color: rgba(245, 91, 20, 0);
  transition: 0.3s ease-out all;
}
button:focus > .underline{
  width: 180px;
  background-color: rgba(245, 91, 20, .1);
}
button:hover > .underline{
  background-color: rgba(245, 91, 20, .1);
  width: 180px;
}
.underAll{
  position: absolute;
  bottom: 0;
  background-color: blue;
  width: 200px;
  height: 2px;
}

`

function SideBar(props){
  const [redirectTo, setRedirect] = useState("");
  const {sidebarHidden, setSidebar} = useContext(SideBarContext);
  const focusRef = useRef(null);

  function onClickTest(e){
    setSidebar(!sidebarHidden);
    setRedirect(e.target.value);
  }

  let redirect
  if(redirectTo){
    redirect = (<Redirect to={redirectTo} />);
  }

  useEffect(() => {
    focusRef.current.focus();
  }, [sidebarHidden])

  return(
    <Wrapper aria-label="Sidebar" isHidden={sidebarHidden}>
      {redirect}
      <div className="listOfOptions">
        <button ref={focusRef} aria-label="Game" onClick={(e) => onClickTest(e)} value="/game" disabled={sidebarHidden}>
          <span className="material-icons" unselectable="on">videogame_asset</span>
          <h3 unselectable="on">Game</h3>
          <div className="underline" unselectable="on"></div>
        </button>

        <button aria-label="Stats" onClick={(e) => onClickTest(e)} value="/stats" disabled={sidebarHidden}>
          <span className="material-icons">bar_chart</span>
          <h3>Stats</h3>
          <div className="underline"></div>
        </button>

        <button aria-label="Info" onClick={(e) => onClickTest(e)} value="/info" disabled={sidebarHidden}>
          <span className="material-icons">help_outline</span>
          <h3>About this app</h3>
          <div className="underline"></div>
        </button>
      </div>
      <div className="underAll"></div>
    </Wrapper>
  )
}

export default SideBar;
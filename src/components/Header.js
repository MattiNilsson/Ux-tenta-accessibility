import React, {useContext, useRef, useEffect} from "react";
import styled from "styled-components";

import SideBar from "./SideBar";
import {SideBarContext} from "./SideBarContext";

const Wrapper = styled.header`
position: absolute;
top: 0;
width: ${window.innerWidth + "px"};
height: 50px;
background-color: #262626;
-webkit-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.39);
-moz-box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.39);
box-shadow: 0px 4px 5px 0px rgba(0,0,0,0.39);
z-index: 5;

.hamburgerMenuButton{
  position: absolute;
  left: 10px;
  top: 3.5px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 100px;
  background-color: #404040;
  transition: .2s ease-out all;
  outline: none;
  cursor: pointer;
}
.hamburgerMenuButton:focus{
  background-color: #f55b14;
}
.hamburgerMenuButton:hover{
  background-color: #f55b14;
}
.hamburgerMenuButton > span{
  position: absolute;
  top: 8px;
  left: 8px;
  color:white;
}
h2{
  position: absolute;
  left: 100px;
  margin-top: 7px;
  color: white;
}
footer{
  position: absolute;
  bottom: 0;
  width: ${window.innerWidth + "px"};
  height: 2px;
  background: rgb(245,91,20);
  background: linear-gradient(80deg, rgba(245,91,20,1) 0%, rgba(245,91,20,1) 15%, rgba(255,252,0,1) 100%);
}
`

function Header(props){
  const {sidebarHidden, setSidebar} = useContext(SideBarContext);
  const clickRef = useRef(null)

  function onClickSidebar(){
    setSidebar(!sidebarHidden);
  }

  useEffect(() => {
    document.addEventListener('click', (e) => clickedInside(e))
    return () => {
      document.removeEventListener('click', (e) => clickedInside(e))
    };
  }, [])

  const clickedInside = (e) => {
    console.log("HELLO")
    if (clickRef.current){
      if (!clickRef.current.contains(e.target)) {
        setSidebar(true);
      } 
    }
  }

  console.log("header render")
  return(
    <Wrapper ref={clickRef} aria-label="header">
      <button aria-label={sidebarHidden ? "Open Sidebar" : "Close Sidebar"} className="hamburgerMenuButton" onClick={onClickSidebar}>
        <span className="material-icons">{sidebarHidden ? "list" : "close"}</span>
      </button>
      <h2>Quiz App 2.0</h2>
      <SideBar/>
      <footer></footer>
    </Wrapper>
  )
}

export default Header;
import React from "react";
import styled from "styled-components";

function Info(props){
  const Wrapper = styled.main`
  display:flex; 
  align-items: center;
  justify-content:center;
  .overall{
    position: absolute;
    top: 100px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 600px;
    background-color: #262626;
    border-radius: 0px 30px 0px 0px;
    -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.36);
-moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.36);
box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.36);
  }
  .overall:focus{
    outline: 1px solid #f55b14;
  }
  p{
    width: 500px;
    text-align: left;
    letter-spacing: 1px;
    font-size: 18px;
    line-height: 1.5;
  }
  .bottomBorder{
    position: absolute;
    bottom: 0;
    width: 600px;
    height: 2px;
    background: rgb(245,91,20);
    background: linear-gradient(80deg, rgba(245,91,20,1) 0%, rgba(245,91,20,1) 15%, rgba(255,252,0,1) 100%);
  }
  `
  return(
    <Wrapper>
      <div className="overall" tabIndex="0">
        <h1>About this app.</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>- Lorem Ipsum .inc</p>
        <div className="bottomBorder"></div>
      </div>
    </Wrapper>
  );
}

export default Info;
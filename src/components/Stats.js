import React, { useState } from "react";
import styled from "styled-components";

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
    width: 300px;
    background-color: #262626;
    border-radius: 0px 30px 0px 0px;
    -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.36);
-moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.36);
box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.36);
  }
  .overall:focus{
    outline: 1px solid #f55b14;
  }
  h2{
    width: 250px;
    text-align: left;
    letter-spacing: 1px;
    font-size: 18px;
    line-height: 1.5;
  }
  .bottomBorder{
    position: absolute;
    bottom: 0;
    width: 300px;
    height: 2px;
    background: rgb(245,91,20);
    background: linear-gradient(80deg, rgba(245,91,20,1) 0%, rgba(245,91,20,1) 15%, rgba(255,252,0,1) 100%);
  }
  `

function Stats(props){

  let saveData = null;

  if(localStorage.getItem("saveData")){
    saveData = JSON.parse(localStorage.getItem("saveData"));
  }

  if(saveData){
    return(
      <Wrapper>
        <div tabIndex="0" className="overall">
          <h2>GAMES PLAYED</h2>
          <h2>{saveData.gamesPlayed}</h2>
          <h2>CORRECT ANSWERS</h2>
          <h2>{saveData.correctAnswers}</h2>
          <h2>INCORRECT ANSWERS</h2>
          <h2>{saveData.incorrectAnswers}</h2>
          <h2>CORRECT PRESENTAGE</h2>
          <h2 
            aria-label={Math.round(saveData.correctAnswers / (saveData.correctAnswers + saveData.incorrectAnswers) * 100) + "percent"}>
              {Math.round(saveData.correctAnswers / (saveData.correctAnswers + saveData.incorrectAnswers) * 100) + "%"}
          </h2>
          <div className="bottomBorder"></div>
        </div>
      </Wrapper>
    )
  }

  return(
    <Wrapper>
      <div tabIndex="0" className="overall">
        <h2>GAMES PLAYED</h2>
        <h2>0</h2>
        <h2>CORRECT ANSWERS</h2>
        <h2>0</h2>
        <h2>INCORRECT ANSWERS</h2>
        <h2>0</h2>
        <h2>CORRECT PRESENTAGE</h2>
        <h2>none</h2>
        <div className="bottomBorder"></div>
      </div>
    </Wrapper>
  );
}

export default Stats;
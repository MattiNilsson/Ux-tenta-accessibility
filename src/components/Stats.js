import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

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
    width: 500px;
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
    width: 450px;
    text-align: left;
    letter-spacing: 1px;
    font-size: 18px;
    line-height: 1.5;
  }
  .bottomBorder{
    position: absolute;
    bottom: 0;
    width: 500px;
    height: 2px;
    background: rgb(245,91,20);
    background: linear-gradient(80deg, rgba(245,91,20,1) 0%, rgba(245,91,20,1) 15%, rgba(255,252,0,1) 100%);
  }
  .left{
    text-align: right;
    position: relative;
    top: -50px;
    font-size: 30px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .line{
    position: relative;
    top: -50px;
    width: 450px;
    background-color: white;
    height: 1px;
  }
  .icon{
    position: relative;
    color: white;
    font-size: 40px;
    top: -60px;
    left: -200px;
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
        <Helmet>
          <title>Quiz : Stats</title>
        </Helmet>
        <div tabIndex="0" className="overall">
          <h1>Stats</h1>
          <span className="material-icons icon">bar_chart</span>
          <h2>GAMES PLAYED:</h2>
          <h2 className="left" aria-label={saveData.gamesPlayed + ","}>{saveData.gamesPlayed}</h2>
          <div className="line"></div>
          <h2>CORRECT ANSWERS:</h2>
          <h2 className="left" aria-label={saveData.correctAnswers + ","}>{saveData.correctAnswers}</h2>
          <div className="line"></div>
          <h2>INCORRECT ANSWERS:</h2>
          <h2 className="left" aria-label={saveData.incorrectAnswers + ","}>{saveData.incorrectAnswers}</h2>
          <div className="line"></div>
          <h2>CORRECT PRESENTAGE:</h2>
          <h2 
            className="left"
            aria-label={Math.round(saveData.correctAnswers / (saveData.correctAnswers + saveData.incorrectAnswers) * 100) + "percent"}>
              {Math.round(saveData.correctAnswers / (saveData.correctAnswers + saveData.incorrectAnswers) * 100) + "%"}
          </h2>
          <div className="line"></div>
          <div className="bottomBorder"></div>
        </div>
      </Wrapper>
    )
  }

  return(
    <Wrapper>
      <div tabIndex="0" className="overall">
        <h1>Stats</h1>
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
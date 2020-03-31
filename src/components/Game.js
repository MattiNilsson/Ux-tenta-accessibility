import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import AriaModal from "react-aria-modal";
import { Redirect } from 'react-router-dom';
import he from "he";

import { Helmet } from "react-helmet";

import LoadingSpinner from "./LoadingSpinner";


const Wrapper = styled.main`
margin-top: 100px;
position:relative;
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;

.startBtn{
  position: relative;
  width: 300px;
  height: 50px;
  border: 0px;
  border-bottom: 2px solid lightgray;
  background-color: rgba(0,0,0,0);
  color:white;
  font-size: 20px;
  outline: none;
}
.startUnderline{
  position: absolute;
  bottom: 0;
  left: 0;
  width:300px;
  height: 0;
  background-color: rgba(245, 91, 20, 0);
  transition: all 0.2s ease-out;
}
.startBtn:hover{
  border-bottom: 2px solid #f55b14;
}
.startBtn:hover > .startUnderline{
  height: 50px;
  background-color: rgba(245, 91, 20, .1);
  border-radius: 10px 10px 0px 0px;
}
.startBtn:focus{
  border-bottom: 2px solid #f55b14;
}
.startBtn:focus > .startUnderline{
  height: 50px;
  background-color: rgba(245, 91, 20, .1);
  border-radius: 10px 10px 0px 0px;
}

.overQuestion{
  display:flex;
  direction: row;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  max-height: 500px;
  flex-wrap: wrap;
}
.question{
  max-width: 800px;
  letter-spacing: 1px;
  line-height: 1.5;
}
.question:focus, .whatQuestion:focus , .modalH1:focus, .modalH2:focus{
  outline: none;
  text-decoration: underline;
}

.answer{
  position: relative;
  width: 380px;
  margin: 5px;
  height: 100px;
  background-color: rgba(0,0,0,0);
  border: none;
  outline: none;
  letter-spacing: 2px;
}
.underline{
  position:absolute;
  left: 0;
  bottom: 0;
  pointer-events: none;
  height: 100px;
  width: 0px;
  border-bottom: 2px solid #f55b14;
  background-color: rgba(245, 91, 20, 0);
  transition: 0.3s ease-out all;
}
button:focus > .underline{
  width: 380px;
  background-color: rgba(245, 91, 20, .1);
}
.underUnderline{
  position:absolute;
  left: 0;
  bottom: 0;
  pointer-events: none;
  height: 50px;
  width: 380px;
  border-bottom: 2px solid lightgray;
  transition: 0.3s ease-out all;
  z-index: -1;
}
button:hover > .underline{
  width: 380px;
  background-color: rgba(245, 91, 20, .1);
}

.overAllModal{
  position: relative;
  width: 600px;
  height: 300px;
  background-color: #262626;
  border-radius: 0px 50px 0px 0px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.buttonWrapper{
  position: absolute;
  bottom: 20px;
  width: 400px;
  display:flex;
  justify-content: space-between;
}
.modalButton{
  position: relative;
  display:flex;
  justify-content:center;
  align-items:center;
  border: none;
  width: 150px;
  height: 30px;
  color:white;
  background-color: rgba(0,0,0,0);
  font-size: 20px;
  outline: none;
}
.modalUnderline{
  position:absolute;
  left: 0;
  bottom: 0;
  pointer-events: none;
  height: 30px;
  width: 0px;
  border-bottom: 2px solid #f55b14;
  background-color: rgba(245, 91, 20, 0);
  transition: 0.3s ease-out all;
}
.modalButton:hover > .modalUnderline{
  width: 150px;
  background-color: rgba(245, 91, 20, .1);
}
.modalButton:focus > .modalUnderline{
  width: 150px;
  background-color: rgba(245, 91, 20, .1);
}
.modalFlex{
  display:flex;
  align-items: space-around;
  justify-content: space-around;
  width: 150px;
  pointer-events: none;
}
.modalFlex > h3{
  margin: 0;
  letter-spacing: 1px;
}
.underlineStyle{
  position: absolute;
  bottom: 0;
  width: 600px;
  height: 2px;
  background: rgb(245,91,20);
  background: linear-gradient(80deg, rgba(245,91,20,1) 0%, rgba(245,91,20,1) 15%, rgba(255,252,0,1) 100%);
}

.loadFlex{
  margin-top: 50px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.modalH1, .modalH2{
  letter-spacing: 1px;
}


.selection{
  position: fixed;
  bottom: 30px;
  width: 500px;
  height: 50px;
  display:flex;
  justify-content: center;
  align-items: center;
}
.superBtn{
  width: 40px;
  height: 40px;
  margin-left: 2px;
  margin-right: 2px;
  border: solid 2px #f55b14;
  border-radius: 50px;
  background-color: rgba(0,0,0,0);
  color: #f55b14;
}
.superBtn:hover, .superBtn:focus{
  border-color: white;
  color: white;
  outline: none;
}
.superBtn > span{
  font-size: 40px;
  position: relative;
  left: -8px;
  top: -3px;
}
.superBtnMini{
  margin-left: 4px;
  margin-right: 4px;
  width: 30px;
  height: 30px;
  border: solid 2px #f55b14;
  border-radius: 50px;
  background-color: rgba(0,0,0,0);
  color: #f55b14;
}
.superBtnMiniPlus{
  margin-left: 4px;
  margin-right: 4px;
  width: 30px;
  height: 30px;
  border: solid 2px white;
  border-radius: 50px;
  background-color: rgba(0,0,0,0);
  color: white;
}
.superBtnMini > span, .superBtnMiniPlus > span {
  position: relative;
  left: -5px;
}
.superBtnMini:hover, .superBtnMini:focus, .superBtnMiniPlus:hover, .superBtnMiniPlus:focus{
  color: white;
  border-color: white;
  outline: none;
}

.finishBtn{
  position: fixed;
  bottom: 100px;
}

.picked > .underUnderline{
  width: 380px;
  border-bottom: 5px solid #f55b14;
}

`

function Game(props){
  const [questions, setQuestions] = useState([]);
  const [thisQuestion, setThisQuestion] = useState([]);
  const [indexState, setIndex] = useState(0);
  const [activateModal, setModal] = useState(false);
  const [correctAnswers, setCorrect] = useState(0);
  const [redirectTo, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);
  const [correct, setCorrectArr] = useState([]);
  const [userAnswer, setUserAnswer] = useState([null,null,null,null,null,null,null,null,null,null]);
  const [focusButton, setButton] = useState(0);

  const titleRef = useRef(null);
  const buttonsRef = useRef([]);
  const finishRef = useRef(null);

  if(!localStorage.getItem("saveData")){
    localStorage.setItem("saveData", JSON.stringify({gamesPlayed : 0, correctAnswers : 0, incorrectAnswers : 0}))
  }

  function GetQuestions(e){
    e.preventDefault();
    setLoading(true);
    axios.get("https://opentdb.com/api.php?amount=10")
    .then((response) => {
      setLoading(false);
      setIndex(0);
      setQuestions(response.data.results);
      showQuestion(response.data.results[indexState]);
      let correctArr = [];
      for(let i = 0; i < response.data.results.length; i++){
        correctArr.push(response.data.results[i].correct_answer);
      }
      setCorrectArr(correctArr);
      if(localStorage.getItem("saveData")){
        let newSaveData = JSON.parse(localStorage.getItem("saveData"));
        newSaveData.gamesPlayed++;
        localStorage.setItem("saveData", JSON.stringify(newSaveData));
      }
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }

  function showQuestion(obj, start){
    let answers = [obj.correct_answer];
    let randomAnswers = [];
    let amount;
    for(let i = 0; i < obj.incorrect_answers.length; i++){
      answers.push(obj.incorrect_answers[i]);
      amount = answers.length;
    }
    for(let i = 0; i < amount; i++){
      let randomNumber = Math.floor(Math.random() * Math.floor(answers.length));
      randomAnswers[i] = answers[randomNumber];
      answers.splice(randomNumber, 1);
    }
    setThisQuestion(randomAnswers);
  }

  function OnAnswer(e, rightAnswer){
    e.preventDefault();
    setButton(0);

    let userAnswerNew = userAnswer;
    userAnswerNew[indexState] = rightAnswer;
    setUserAnswer(userAnswerNew);

    if(indexState != 9){
      setIndex(indexState + 1);
      showQuestion(questions[indexState + 1]);
    }else{
      setIndex(0);
      showQuestion(questions[0]);
    }
  }

  useEffect(() => {
    if(questions.length > 0){
      buttonsRef.current[focusButton].focus();
    }
  }, [focusButton])
  
  useEffect(() => {
    if(questions.length > 0 && indexState < 10){
      titleRef.current.focus();
    }
    let finished = true;
    if(userAnswer.length === 10){
      for(let i = 0; i < 10; i++){
        if(userAnswer[i] === null){
          finished = false;
        }
      }
      if(finished === true){
        finishRef.current.focus();
      }
    }
  }, [indexState, questions, userAnswer])

  function arrowKeys(e){
    if(thisQuestion.length === 4){
      if(!e.shiftKey && e.keyCode === 9 && focusButton < 3){
        setButton(focusButton + 1);
      }else if(e.shiftKey && e.keyCode === 9 && focusButton > 0){
        setButton(focusButton - 1);
      }

      if(e.keyCode === 37 && focusButton > 0){
        setButton(focusButton - 1)
      }
      if(e.keyCode === 38 && focusButton > 1){
        setButton(focusButton - 2)
      }
      if(e.keyCode === 39 && focusButton < 3){
        setButton(focusButton + 1)
      }
      if(e.keyCode === 40 && focusButton < 2){
        setButton(focusButton + 2)
      }
    }else if(thisQuestion.length === 2){
      if(!e.shiftKey && e.keyCode === 9 && focusButton < 1){
        setButton(focusButton + 1);
      }else if(e.shiftKey && e.keyCode === 9 && focusButton > 0){
        setButton(focusButton - 1);
      }

      if(e.keyCode === 37 && focusButton > 0){
        setButton(focusButton - 1)
      }
      if(e.keyCode === 39 && focusButton < 1){
        setButton(focusButton + 1)
      }
    }
  }

  function nextOrPrev(e, str){
    if(str === "next" && indexState < 9){
      setIndex(indexState + 1);
      showQuestion(questions[indexState + 1]);
    }
    if(str === "prev" && indexState > 0){
      setIndex(indexState - 1);
      showQuestion(questions[indexState - 1]);
    }
  }

  function finished(){
    let amountCorrect = 0;
    for(let i = 0; i < userAnswer.length; i++){
      if(userAnswer[i] === correct[i]){
        amountCorrect++;
      }
    }
    if(localStorage.getItem("saveData")){
      let newSaveData = JSON.parse(localStorage.getItem("saveData"));
      newSaveData.correctAnswers += amountCorrect;
      newSaveData.incorrectAnswers += (10 - amountCorrect);
      localStorage.setItem("saveData", JSON.stringify(newSaveData));
    }

    setCorrect(amountCorrect);
    setModal(true);
  }
  
  function modalButtons(e){
    setModal(false);
    if(e){
      setRedirect(e.target.value);
    }
  }
  function restartGame(){
    setUserAnswer([null,null,null,null,null,null,null,null,null,null]);
    setCorrectArr([])
    setCorrect(0);
    setQuestions([]);
    setModal(false);
    setIndex(0);
  }

  let redirect;
  if(redirectTo){
    redirect = (<Redirect to={redirectTo} />);
  }

  if(loading){
    return(
      <Wrapper><div className="loadFlex"><LoadingSpinner variant={"dots"}/></div></Wrapper>
    )
  }

  let finishButton;
  if(userAnswer.length === 10){
    finishButton = (
    <button ref={finishRef} className="finishBtn startBtn" onClick={finished}>Finish
      <div className="startUnderline"></div>
    </button>
    );
    for(let i = 0; i < 10; i++){
      if(userAnswer[i] === null){
        finishButton = <div ref={finishRef}></div>;
      }
    }
  }

  function menuNav(id){
    setIndex(id);
    showQuestion(questions[id]);
  }

  if(questions.length > 0){
      const modal = activateModal ? (
      <AriaModal
        className="modal"
        titleText="dialog"
        initialFocus="#focus"
        role="dialog"
        underlayStyle={{ paddingTop: '3em' }}
      >
        <Wrapper>
          <Helmet>
            <title>Quiz : Game Modal</title>
          </Helmet>
          <div className="overAllModal">
            <h1 className="modalH1" style={{marginTop: "0px"}} id="focus" tabIndex="0" aria-label="Game Finished">Game Finished!</h1>
            <h2 className="modalH2" tabIndex="0" aria-label={"scored " + correctAnswers + "out of ten"}>score : {correctAnswers + " / 10"}</h2>
            <div className="buttonWrapper">
              <button className="modalButton" onClick={(e) => modalButtons(e)} value="/stats">
                <div className="modalFlex">
                  <span className="material-icons">bar_chart</span>
                  <h3>Stats</h3>
                </div>
                <div className="modalUnderline"></div>
              </button>
              <button className="modalButton" onClick={restartGame} value="/game">
                <div className="modalFlex">
                  <span className="material-icons">autorenew</span>
                  <h3>Restart</h3>
                </div>
                <div className="modalUnderline"></div>
              </button>
            </div>
            <div className="underlineStyle"></div>
          </div>
        </Wrapper>
      </AriaModal>
      )
      : false;
    
    return(
      <Wrapper>
        {redirect}
        <Helmet>
          <title>Quiz : Question {"" + (indexState + 1)}</title>
        </Helmet>
        <h3
          className="whatQuestion"
          ref={titleRef}
          tabIndex="0" 
          aria-label={"question " + (indexState + 1)}
        >{"question #" + (indexState + 1)}
        </h3>
        <h2 
          className="question" 
          tabIndex="0" 
          aria-label={he.decode(questions[indexState].question)}
        >{ he.decode(questions[indexState].question) }
        </h2>
        <form className="overQuestion">
          {thisQuestion.map((index, id) => {
            return (
            <button id={id} 
              onKeyDown={(e) => arrowKeys(e)}
              ref={el => buttonsRef.current[id] = el} 
              onClick={(e) => OnAnswer(e, index)} 
              tabIndex="0" 
              aria-label={he.decode(index)} 
              className={userAnswer[indexState] === index ? "answer picked" : "answer"}
              key={index}
            >
              <h2>{he.decode(index)}</h2>
              <div className="underline"></div>
              <div className="underUnderline"></div>
            </button>
            )
          })}
        </form>
        <nav className="selection" role="presentation">
          {finishButton}
          <button className="superBtn prevBtn" aria-label="previous question" onClick={(e) => nextOrPrev(e,"prev")}><span className="material-icons">chevron_left</span></button>
          {questions.map((index, id) => {
            return(
              <button key={id} aria-label={"go to question " + (id + 1)} onClick={() => menuNav(id)} className={id === (indexState) ? "superBtnMiniPlus" : "superBtnMini"}>
                {userAnswer[id] ? <span className="material-icons">done</span> : <div></div>}
              </button>
            )
          })}
          <button className="superBtn nextBtn" aria-label="next question" onClick={(e) => nextOrPrev(e, "next")}><span className="material-icons">chevron_right</span></button>
        </nav>
        {modal}
      </Wrapper>
    )
  }

  return(
    <Wrapper>
      <Helmet>
          <title>Quiz : Start Game</title>
      </Helmet>
      <h1>Game</h1>
      <form>
        <button className="startBtn" type="submit" onClick={(e) => GetQuestions(e)}>Start!
          <div className="startUnderline"></div>
        </button>
      </form>
    </Wrapper>
  );
}

export default Game;
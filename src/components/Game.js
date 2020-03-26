import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import AriaModal from "react-aria-modal";
import { Redirect } from 'react-router-dom';
import he from "he";


const Wrapper = styled.main`
margin-top: 50px;
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
  max-height: 400px;
  flex-wrap: wrap;
}
.question{
  max-width: 800px;
}
.answer{
  position: relative;
  width: 380px;
  margin: 5px;
  height: 50px;
  background-color: rgba(0,0,0,0);
  border: none;
  outline: none;
}
.underline{
  position:absolute;
  left: 0;
  bottom: 0;
  pointer-events: none;
  height: 50px;
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
.underlineStyle{
  position: absolute;
  bottom: 0;
  width: 600px;
  height: 2px;
  background: rgb(245,91,20);
  background: linear-gradient(80deg, rgba(245,91,20,1) 0%, rgba(245,91,20,1) 15%, rgba(255,252,0,1) 100%);
}
`

function Game(props){
  const [questions, setQuestions] = useState([]);
  const [thisQuestion, setThisQuestion] = useState([]);
  const [indexState, setIndex] = useState(0);
  const [activateModal, setModal] = useState(false);
  const [correctAnswers, setCorrect] = useState(0);
  const [redirectTo, setRedirect] = useState("");
  const titleRef = useRef(null);

  if(!localStorage.getItem("saveData")){
    localStorage.setItem("saveData", JSON.stringify({gamesPlayed : 0, correctAnswers : 0, incorrectAnswers : 0}))
  }

  let redirect;
  if(redirectTo){
    redirect = (<Redirect to={redirectTo} />);
  }

  function GetQuestions(e){
    e.preventDefault();
    axios.get("https://opentdb.com/api.php?amount=10")
    .then((response) => {
      setIndex(0);
      setQuestions(response.data.results);
      showQuestion(response.data.results[indexState]);
      if(localStorage.getItem("saveData")){
        let newSaveData = JSON.parse(localStorage.getItem("saveData"));
        newSaveData.gamesPlayed++;
        localStorage.setItem("saveData", JSON.stringify(newSaveData));
      }
    })
    .catch((error) => {
      console.log(error);
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
      console.log(randomNumber);
      randomAnswers[i] = answers[randomNumber];
      answers.splice(randomNumber, 1);
    }
    setThisQuestion(randomAnswers);
  }

  function OnAnswer(e, rightAnswer){
    e.preventDefault();
    if(rightAnswer === questions[indexState].correct_answer){
      if(localStorage.getItem("saveData")){
        let newSaveData = JSON.parse(localStorage.getItem("saveData"));
        newSaveData.correctAnswers++;
        localStorage.setItem("saveData", JSON.stringify(newSaveData));
        setCorrect(correctAnswers + 1);
      }
    }else{
      if(localStorage.getItem("saveData")){
        let newSaveData = JSON.parse(localStorage.getItem("saveData"));
        newSaveData.incorrectAnswers++;
        localStorage.setItem("saveData", JSON.stringify(newSaveData));
      }
    }
    if(indexState === 9 && activateModal === false){
      console.log("u did it!")
      setModal(true);
      return;
    }
    showQuestion(questions[indexState + 1]);
    setIndex(indexState + 1);
  }

  useEffect(() => {
    if(questions.length > 0 && indexState < 9){
      titleRef.current.focus();
    }
  }, [indexState, questions])

  function modalButtons(e){
    console.log("hello")
    setModal(false);
    if(e){
      setRedirect(e.target.value);
    }
  }

  function restartGame(){
    setCorrect(0);
    setQuestions([]);
    setModal(false);
    setIndex(0);
  }
  console.log(redirectTo);

  if(questions.length > 0){
      const modal = activateModal ? (
      <AriaModal
        className="modal"
        titleText="demo one"
        initialFocus="#focus"
        underlayStyle={{ paddingTop: '3em' }}
      >
        <Wrapper>
          {redirect}
          <div className="overAllModal">
            <h1 style={{marginTop: "0px"}} id="focus" tabIndex="0" aria-label="Game Finished">Game Finished!</h1>
            <h2 tabIndex="0" aria-label={"scored " + correctAnswers + "out of ten"}>score : {correctAnswers + " / 10"}</h2>
            <div className="buttonWrapper">
              <button className="modalButton" onClick={(e) => modalButtons(e)} value="/stats">
                <span className="material-icons">bar_chart</span>
                Stats
                <div className="modalUnderline"></div>
              </button>
              <button className="modalButton" onClick={restartGame} value="/game">
                <span className="material-icons">autorenew</span>
                Restart
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
        <h3
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
          {thisQuestion.map((index) => {
            return (
            <button onClick={(e) => OnAnswer(e, index)} tabIndex="0" aria-label={index} className="answer" key={index}>
              <h3>{he.decode(index)}</h3>
              <div className="underline"></div>
              <div className="underUnderline"></div>
            </button>
            )
          })}
        </form>
        {modal}
      </Wrapper>
    )
  }

  return(
    <Wrapper>
      {redirect}
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
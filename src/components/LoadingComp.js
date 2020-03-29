import React from "react";
import styled, {keyframes} from "styled-components";

const smallToBig = keyframes`
  from{
    transform: scale(1);
    background-color: #f55b14;
    opacity: 0;
  }
  10%{
    opacity: 1;
    transform: scale(1.6);
    background-color: #f55b14;
  }
  30%{
    background-color: #f55b14;
  }
  80%{
    opacity: .1;
  }
  to{
    transform: scale(1);
    opacity: .1;
  }
`

const Wrapper = styled.div`
  .orb{
    height: 10px;
    width: 10px;
    border-radius: 15px;
    opacity: 0;
    animation: ${smallToBig} .8s linear infinite;
    animation-delay: ${props => props.delay + "s"};
    -webkit-box-shadow: 0px 0px 5px 0px rgba(245,91,20,1);
-moz-box-shadow: 0px 0px 5px 0px rgba(245,91,20,1);
box-shadow: 0px 0px 5px 0px rgba(245,91,20,1);
  }


`

function LoadingComp(props){
  return(
    <Wrapper delay={props.delay}>
      <div className="orb"></div>
    </Wrapper>
  )
}

export default LoadingComp;
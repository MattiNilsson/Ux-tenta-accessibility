import React from "react";
import styled, {keyframes} from "styled-components";

const smallToBig = keyframes`
  from{
    height: 0px;
    opacity: 0;
  }
  20%{
    height: 40px;
    opacity: 1;
  }
  to{
    height: 0px;
    opacity: 0;
  }
`

const Wrapper = styled.div`
  .line{
    margin-left: 2px;
    margin-right: 2px;
    height: 30px;
    width: 5px;
    opacity: 0;
    background-color: #f55b14;
    animation: ${smallToBig} 1s linear infinite;
    animation-delay: ${props => props.delay + "s"};
  }


`

function LoadingLines(props){
  return(
    <Wrapper delay={props.delay}>
      <div className="line"></div>
    </Wrapper>
  )
}

export default LoadingLines;
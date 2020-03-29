import React from "react";
import styled from "styled-components";

import LoadingComp from "./LoadingComp";
import LoadingLines from "./LoadingLines";

const Wrapper = styled.div`
margin-top: 100px;
position: relative;

.center{

}

.top{
  position: absolute;
  top: -30px;
}

.topLeft{
  position: absolute;
  left: -30px;
}

.left{
  position: absolute;
  left: -22px;
  top: -22px;
}

.bottomLeft{
  position: absolute;
  left: -22px;
  top: 22px;
}

.bottom{
  position: absolute;
  top: 30px;
}

.bottomRight{
  position: absolute;
  left: 22px;
  top: 22px;
}

.right{
  position: absolute;
  left: 30px;
}

.topRight{
  position: absolute;
  top: -22px;
  left: 22px;
}

.linesFlex{
  height: 40px;
  display:flex;
  justify-content: center;
  align-items: center;
}

`


function LoadingSpinner(props){
  if(props.variant === "lines"){
    return(
      <Wrapper>
        <div className="linesFlex">
          <LoadingLines delay={0} />
          <LoadingLines delay={0.1} />
          <LoadingLines delay={0.2} />
          <LoadingLines delay={0.3} />
          <LoadingLines delay={0.4} />
          <LoadingLines delay={0.5} />
          <LoadingLines delay={0.4} />
          <LoadingLines delay={0.3} />
          <LoadingLines delay={0.2} />
          <LoadingLines delay={0.1} />
          <LoadingLines delay={0} />
        </div>
      </Wrapper>
    )
  }

  if(props.variant === "dots"){
    return(
      <Wrapper>
        <div className="top">
          <LoadingComp delay={0.1}/>
        </div>
  
        <div className="left">
          <LoadingComp delay={0.2}/>
        </div>
  
        <div className="topLeft">
          <LoadingComp delay={0.3}/>
        </div>
  
        <div className="bottomLeft">
          <LoadingComp delay={0.4}/>
        </div>
  
        <div className="bottom">
          <LoadingComp delay={0.5}/>
        </div>
  
        <div className="bottomRight">
          <LoadingComp delay={0.6}/>
        </div>
  
        <div className="right">
          <LoadingComp delay={0.7}/>
        </div>
  
        <div className="topRight">
          <LoadingComp delay={0.8}/>
        </div>
      </Wrapper>
    )
  }
}

export default LoadingSpinner;
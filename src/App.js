import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import styled from "styled-components";
import logo from './logo.svg';
import './App.css';

import Header from "./components/Header";
import Game from "./components/Game";
import Stats from "./components/Stats"
import Info from "./components/Info";

import {SideBarContext} from "./components/SideBarContext";

function App() {
  const [sidebarHidden, setSidebar] = useState(true);

  return (
    <div className="App">  
      <Router>
        <SideBarContext.Provider value={{sidebarHidden, setSidebar}}>
          <Header />
        </SideBarContext.Provider>
        <Route exact path="/">
          <Redirect to="/game" />
        </Route>
        <Route path="/game" component={Game} />
        <Route path="/stats" component={Stats} />
        <Route path="/info" component={Info} />
      </Router>

    </div>
  );
}

export default App;

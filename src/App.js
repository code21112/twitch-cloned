import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import Live from './components/Live/Live';
import GameStreams from './components/GameStreams/GameStreams';
import Result from './components/Result/Result';
import Error from './components/Error/Error';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (

    <Router
    // forceRefresh={true}
    >

      <div className="App">
        <Header />
        <Sidebar />
        <Switch>
          {/* <Route exact path="/" component={Games} /> */}
          <Route exact path="/" component={Games} />
          <Route exact path="/TopStreams" component={TopStreams} />
          <Route exact path="/Live/:slug" component={Live} />
          <Route exact path="/Game/:slug" component={GameStreams} />
          <Route exact path="/Result/:slug" component={Result} />
          <Route exact path="/Error" component={Error} />
          <Route exact path="/Result" component={Error} />

        </Switch>
      </div>
    </Router >


  );
}

export default App;

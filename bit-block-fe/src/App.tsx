import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from './features/home/HomePage';
import BlocksPage from './features/blocks/BlocksPage';
import BlockPage from './features/block/BlockPage';


const App = () => {

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <HomePage />
            </React.Fragment>
          )}
        />
        <Route
          exact
          path="/blocks"
          render={() => <BlocksPage />}
        />
        <Route
          exact
          path="/block/:hash"
          render={() => <BlockPage />}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

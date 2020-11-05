// 75%
import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

import useInterval from "../hooks/use-interval.hook";
import { GameProvider, GameContext } from "./GameContext";


function App() {
  const { numCookies, setNumCookies, purchasedItems, setPurchasedItems, calculateCookiesPerSecond } = useContext(GameContext);

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);
  
  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;

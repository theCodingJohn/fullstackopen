import React from "react";
import ReactDOM from "react-dom";
import counterReducer from "./reducer/unicafeReducer";
import { createStore } from "redux";

const store = createStore(counterReducer);

const App = () => {
  const addGood = () => store.dispatch({ type: "GOOD" });
  const addNeutral = () => store.dispatch({ type: "OK" });
  const addBad = () => store.dispatch({ type: "BAD" });
  const reset = () => store.dispatch({ type: "ZERO" });

  return (
    <div>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
      <button onClick={reset}>zero</button>
      <div>
        good <strong>{store.getState().good}</strong>
      </div>
      <div>
        neutral <strong>{store.getState().ok}</strong>
      </div>
      <div>
        bad <strong>{store.getState().bad}</strong>
      </div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);

import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ name, action }) => {
  return <button onClick={action}>{name}</button>;
};

const Statistics = ({ stats: { good, bad, neutral } }) => {
  const totalFeedback = good + neutral + bad;
  const average = (good - bad) / totalFeedback;
  const positive = (good / totalFeedback) * 100;

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={totalFeedback} />
          <Statistic text="average" value={average} />
          <Statistic text="positive" value={positive} />
        </tbody>
      </table>
    </>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
  };

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" value={good} action={addGood} />
      <Button name="neutral" value={neutral} action={addNeutral} />
      <Button name="bad" value={bad} action={addBad} />
      {good > 0 || bad > 0 || neutral > 0 ? (
        <Statistics stats={stats} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

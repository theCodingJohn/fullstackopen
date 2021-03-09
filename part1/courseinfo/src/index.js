import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ content }) => {
  return (
    <>
      <Part part={content.part1.name} exercises={content.part1.exercises} />
      <Part part={content.part2.name} exercises={content.part2.exercises} />
      <Part part={content.part3.name} exercises={content.part3.exercises} />
    </>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ exercises }) => {
  return (
    <p>
      Number of exercises{" "}
      {exercises.part1.exercises +
        exercises.part2.exercises +
        exercises.part3.exercises}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content content={{ part1, part2, part3 }} />
      <Total exercises={{ part1, part2, part3 }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

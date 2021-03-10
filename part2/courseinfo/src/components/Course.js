import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((element) => (
        <Part
          key={element.id}
          part={element.name}
          exercises={element.exercises}
        />
      ))}
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

const Total = ({ course }) => {
  const sum = course.parts.reduce((accu, curr) => accu + curr.exercises, 0);

  return <p>total of {sum} exercises</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;

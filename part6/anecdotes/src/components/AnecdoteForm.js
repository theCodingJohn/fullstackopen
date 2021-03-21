import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = async (e) => {
    e.preventDefault();

    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = "";

    props.createAnecdote(anecdote);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default connect(null, { createAnecdote })(AnecdoteForm);

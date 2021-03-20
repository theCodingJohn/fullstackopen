import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes }) =>
    anecdotes.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const filter = useSelector(({ filter }) => filter);
  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.includes(filter)
  );

  const vote = (id, content) => {
    dispatch(addVote(id));

    dispatch(showNotification(`you voted "${content}"`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

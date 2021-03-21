export const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data: data,
  };
};

export const addVote = (id) => {
  return {
    type: "VOTE_ANECDOTE",
    data: { id },
  };
};

export const initializeAnecdotes = (data) => {
  return {
    type: "INIT_ANECDOTE",
    data,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTE":
      return action.data;
    case "VOTE_ANECDOTE": {
      const id = action.data.id;
      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    }
    case "NEW_ANECDOTE":
      return state.concat(action.data);
    default:
      return state;
  }
};

export default reducer;

import anecdoteService from "../services/anecdote";
import noteService from "../services/anecdote";

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0,
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await noteService.createNew(asObject(anecdote));
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: "VOTE_ANECDOTE",
      data: votedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await noteService.getAll();
    dispatch({
      type: "INIT_ANECDOTE",
      data: anecdotes,
    });
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

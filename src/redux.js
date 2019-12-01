export const createStore = reducer => {
  let state = reducer(undefined, {}); //get initial state
  let listeners = [];

  return {
    getState: () => state,
    dispatch: action => {
      state = reducer(state, action);
      listeners.forEach(listener => {
        listener(state);
      });
      return action;
    },
    subscribe: listener => {
      listeners.push(listener);
      const unsubscribe = () => {
        listeners = listeners.filter(ln => ln !== listener);
      };
      return unsubscribe;
    }
  };
};

export const combineReducers = reducers => {
  return (state = {}, action) => {
    let reducerNames = Object.keys(reducers);
    let nextState = {};
    reducerNames.forEach(rn => {
      nextState[rn] = reducers[rn](state[rn], action);
    });
    return nextState;
  };
};


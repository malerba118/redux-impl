import { createStore } from "./redux";

import "./styles.css";

let store = createStore((prevState = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return prevState + 1;
    case "DECREMENT":
      return prevState - 1;
    default:
      return prevState;
  }
});

export default store;

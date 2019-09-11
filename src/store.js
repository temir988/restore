import { createStore } from "redux";

import reducer from "./reducers";

const store = createStore(reducer);

// monkey patching (bad idea)
const originalDispatch = store.dispatch;
store.dispatch = (action) => {

  if (typeof action === "string") {
    return originalDispatch({
      type: action
    });
  }

  return originalDispatch(action);
}


store.dispatch('hello_world');

export default store;

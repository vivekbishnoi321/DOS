import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import friendsReducer from "./redux";

function configureStore() {
  const store = createStore(
    friendsReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}

export default configureStore;

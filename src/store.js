import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  title: () => 'hello',
});

const store = createStore(rootReducer);

export default store;
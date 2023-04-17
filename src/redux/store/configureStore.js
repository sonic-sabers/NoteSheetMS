import {createStore, combineReducers} from 'redux';
import countReducer from '../reducer/countReducers';
const rootReducer = combineReducers({count: countReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;

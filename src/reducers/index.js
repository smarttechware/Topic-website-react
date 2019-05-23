import { combineReducers } from 'redux-immutable';
import { sessionImmutableReducer as session } from 'redux-react-session';

import router from './routerReducer';

const rootReducer = combineReducers({
  session,
  router
});

export default rootReducer;

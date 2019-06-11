import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';

export const signUp = user =>
  () =>
    sessionApi.signUp({ user }).then((user) => {
      sessionService.saveUser(user);
    }).catch((err) => { throw err; });

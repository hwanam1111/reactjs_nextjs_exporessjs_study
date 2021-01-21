import { all, fork } from 'redux-saga/effects'; // fork -> 비동기, call -> 동기

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}

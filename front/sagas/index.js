import { all, fork } from 'redux-saga/effects'; // fork -> 비동기, call -> 동기
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}

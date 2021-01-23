import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  POST_LIKED_REQUEST, POST_LIKED_SUCCESS, POST_LIKED_FAILURE,
  POST_UNLIKED_REQUEST, POST_UNLIKED_SUCCESS, POST_UNLIKED_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
} from '../reducers/post';

import {
  ADD_POST_TO_ME, REMOVE_POST_OF_ME,
} from '../reducers/user';

function loadPostAPI() {
  return axios.get('/posts/load_posts');
}

function* loadPost() {
  try {
    const result = yield call(loadPostAPI);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post/add_post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        data: result.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function postLikedAPI(data) {
  return axios.patch(`/post/${data.postId}/liked`);
}

function* postLiked(action) {
  try {
    const result = yield call(postLikedAPI, action.data);
    yield put({
      type: POST_LIKED_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: POST_LIKED_FAILURE,
      error: err.response.data,
    });
  }
}

function postUnLikedAPI(data) {
  return axios.delete(`/post/${data.postId}/liked`);
}

function* postUnLiked(action) {
  try {
    const result = yield call(postUnLikedAPI, action.data);
    yield put({
      type: POST_UNLIKED_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: POST_UNLIKED_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });

    yield put({
      type: REMOVE_POST_OF_ME,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchPostLike() {
  yield takeLatest(POST_LIKED_REQUEST, postLiked);
}

function* watchPostUnLike() {
  yield takeLatest(POST_UNLIKED_REQUEST, postUnLiked);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchPostLike),
    fork(watchPostUnLike),
    fork(watchRemovePost),
  ]);
}

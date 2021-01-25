import { all, fork, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  LOAD_SPECIFY_POST_REQUEST, LOAD_SPECIFY_POST_SUCCESS, LOAD_SPECIFY_POST_FAILURE,
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  POST_LIKED_REQUEST, POST_LIKED_SUCCESS, POST_LIKED_FAILURE,
  POST_UNLIKED_REQUEST, POST_UNLIKED_SUCCESS, POST_UNLIKED_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE,
} from '../reducers/post';

import {
  ADD_POST_TO_ME, REMOVE_POST_OF_ME,
} from '../reducers/user';

function loadPostAPI(data) {
  return axios.get(`/posts/load_posts?lastId=${data || 0}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.lastId);
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

function loadSpecityPostAPI(data) {
  return axios.get(`/post/load_specify_post/${data}`);
}

function* loadSpecityPost(action) {
  try {
    const result = yield call(loadSpecityPostAPI, action.data);
    yield put({
      type: LOAD_SPECIFY_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SPECIFY_POST_FAILURE,
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

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function retweetAPI(data) {
  return axios.post(`/post/retweet/${data}`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: RETWEET_FAILURE,
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

function* watchLoadSpecityPost() {
  yield takeLatest(LOAD_SPECIFY_POST_REQUEST, loadSpecityPost);
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

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchLoadSpecityPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchPostLike),
    fork(watchPostUnLike),
    fork(watchUploadImages),
    fork(watchRetweet),
    fork(watchRemovePost),
  ]);
}

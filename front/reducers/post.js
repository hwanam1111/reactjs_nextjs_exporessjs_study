import produce from 'immer';

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  loadPostLoading: false,
  loadPostComplete: false,
  loadPostError: null,
  addPostLoading: false,
  addPostComplete: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentComplete: false,
  addCommentError: null,
  postLikedLoading: false,
  postLikedComplete: false,
  postLikedError: null,
  postUnLikedLoading: false,
  postUnLikedComplete: false,
  postUnLikedError: null,
  removePostLoading: false,
  removePostComplete: false,
  removePostError: null,
};

// export const generateDummyPost = (number) => Array(number).fill().map(() => ({
//   id: Math.random() * 10000000 + 0,
//   User: {
//     id: shortId.generate(),
//     nickname: faker.name.findName(),
//   },
//   content: faker.lorem.paragraph(),
//   Images: [{
//     src: faker.image.image(),
//   }],
//   Comments: [{
//     User: {
//       id: shortId.generate(),
//       nickname: faker.name.findName(),
//     },
//     content: faker.lorem.sentence(),
//   }],
// }));

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const POST_LIKED_REQUEST = 'POST_LIKED_REQUEST';
export const POST_LIKED_SUCCESS = 'POST_LIKED_SUCCESS';
export const POST_LIKED_FAILURE = 'POST_LIKED_FAILURE';

export const POST_UNLIKED_REQUEST = 'POST_UNLIKED_REQUEST';
export const POST_UNLIKED_SUCCESS = 'POST_UNLIKED_SUCCESS';
export const POST_UNLIKED_FAILURE = 'POST_UNLIKED_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const postLikedRequestAction = (data) => ({
  type: POST_LIKED_REQUEST,
  data,
});

export const postUnLikedRequestAction = (data) => ({
  type: POST_UNLIKED_REQUEST,
  data,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

// 이전 상태를 액션을 통해 다음 상태로 만들어 내는 함수 (불변성 꼭 지켜야 함.)
const postReduce = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostComplete = false;
      draft.loadPostError = null;

      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostLoading = false;
      draft.loadPostComplete = true;
      draft.loadPostError = null;
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.hasMorePost = draft.mainPosts.length < 50;

      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostComplete = false;
      draft.loadPostError = action.error;

      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostComplete = false;
      draft.addPostError = null;

      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostComplete = true;
      draft.addPostError = null;
      draft.mainPosts.unshift(action.data.data);

      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostComplete = false;
      draft.addPostError = action.error;

      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentComplete = false;
      draft.addCommentError = null;

      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentComplete = true;
      draft.addCommentError = null;

      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentComplete = false;
      draft.addCommentError = action.error;

      break;
    case POST_LIKED_REQUEST:
      draft.postLikedLoading = true;
      draft.postLikedComplete = false;
      draft.postLikedError = null;

      break;
    case POST_LIKED_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.PostLikers.push({ id: action.data.UserId });
      draft.postLikedLoading = false;
      draft.postLikedComplete = true;
      draft.postLikedError = null;

      break;
    }
    case POST_LIKED_FAILURE:
      draft.postLikedLoading = false;
      draft.postLikedComplete = false;
      draft.postLikedError = action.error;

      break;
    case POST_UNLIKED_REQUEST:
      draft.postUnLikedLoading = true;
      draft.postUnLikedComplete = false;
      draft.postUnLikedError = null;

      break;
    case POST_UNLIKED_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.PostLikers = post.PostLikers.filter((v) => v.id !== action.data.UserId);
      draft.postUnLikedLoading = false;
      draft.postUnLikedComplete = true;
      draft.postUnLikedError = null;

      break;
    }
    case POST_UNLIKED_FAILURE:
      draft.postUnLikedLoading = false;
      draft.postUnLikedComplete = false;
      draft.postUnLikedError = action.error;

      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostComplete = false;
      draft.removePostError = null;

      break;
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
      draft.removePostLoading = false;
      draft.removePostComplete = true;
      draft.removePostError = null;

      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostComplete = false;
      draft.removePostError = action.error;

      break;
    default:
      break;
  }
});

export default postReduce;

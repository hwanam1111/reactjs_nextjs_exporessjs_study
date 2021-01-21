webpackHotUpdate_N_E("pages/index",{

/***/ "./reducers/post.js":
/*!**************************!*\
  !*** ./reducers/post.js ***!
  \**************************/
/*! exports provided: initialState, dummyPost, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, addPostRequestAction, addCommentRequestAction, removePostRequestAction, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initialState\", function() { return initialState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"dummyPost\", function() { return dummyPost; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOAD_POST_REQUEST\", function() { return LOAD_POST_REQUEST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOAD_POST_SUCCESS\", function() { return LOAD_POST_SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOAD_POST_FAILURE\", function() { return LOAD_POST_FAILURE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_POST_REQUEST\", function() { return ADD_POST_REQUEST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_POST_SUCCESS\", function() { return ADD_POST_SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_POST_FAILURE\", function() { return ADD_POST_FAILURE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_COMMENT_REQUEST\", function() { return ADD_COMMENT_REQUEST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_COMMENT_SUCCESS\", function() { return ADD_COMMENT_SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ADD_COMMENT_FAILURE\", function() { return ADD_COMMENT_FAILURE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_POST_REQUEST\", function() { return REMOVE_POST_REQUEST; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_POST_SUCCESS\", function() { return REMOVE_POST_SUCCESS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"REMOVE_POST_FAILURE\", function() { return REMOVE_POST_FAILURE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addPostRequestAction\", function() { return addPostRequestAction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addCommentRequestAction\", function() { return addCommentRequestAction; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removePostRequestAction\", function() { return removePostRequestAction; });\n/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immer */ \"./node_modules/immer/dist/immer.esm.js\");\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shortid */ \"./node_modules/shortid/index.js\");\n/* harmony import */ var shortid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(shortid__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! faker */ \"./node_modules/faker/index.js\");\n/* harmony import */ var faker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(faker__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar initialState = {\n  mainPosts: [],\n  imagePaths: [],\n  hasMoreHPost: true,\n  loadPostLoading: false,\n  loadPostComplete: false,\n  loadPostError: null,\n  addPostLoading: false,\n  addPostComplete: false,\n  addPostError: null,\n  addCommentLoading: false,\n  addCommentComplete: false,\n  addCommentError: null,\n  removePostLoading: false,\n  removePostComplete: false,\n  removePostError: null\n};\nvar dummyPost = function dummyPost(number) {\n  return Array(20).fill().map(function () {\n    return {\n      id: Math.random() * 10000000 + 0,\n      User: {\n        id: shortid__WEBPACK_IMPORTED_MODULE_1___default.a.generate(),\n        nickname: faker__WEBPACK_IMPORTED_MODULE_2___default.a.name.findName()\n      },\n      content: faker__WEBPACK_IMPORTED_MODULE_2___default.a.lorem.paragraph(),\n      Images: [{\n        src: faker__WEBPACK_IMPORTED_MODULE_2___default.a.image.image()\n      }],\n      Comments: [{\n        User: {\n          id: shortid__WEBPACK_IMPORTED_MODULE_1___default.a.generate(),\n          nickname: faker__WEBPACK_IMPORTED_MODULE_2___default.a.name.findName()\n        },\n        content: faker__WEBPACK_IMPORTED_MODULE_2___default.a.lorem.sentence()\n      }]\n    };\n  });\n};\nvar LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';\nvar LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';\nvar LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';\nvar ADD_POST_REQUEST = 'ADD_POST_REQUEST';\nvar ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';\nvar ADD_POST_FAILURE = 'ADD_POST_FAILURE';\nvar ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';\nvar ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';\nvar ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';\nvar REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';\nvar REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';\nvar REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';\nvar addPostRequestAction = function addPostRequestAction(data) {\n  return {\n    type: ADD_POST_REQUEST,\n    data: data\n  };\n};\nvar addCommentRequestAction = function addCommentRequestAction(data) {\n  return {\n    type: ADD_COMMENT_REQUEST,\n    data: data\n  };\n};\nvar removePostRequestAction = function removePostRequestAction(data) {\n  return {\n    type: REMOVE_POST_REQUEST,\n    data: data\n  };\n};\n\nvar dummyPostData = function dummyPostData(data) {\n  return {\n    id: data.id,\n    content: data.content.content,\n    User: {\n      id: 1,\n      nickname: data.content.nickname\n    },\n    Images: [],\n    Comments: []\n  };\n}; // 이전 상태를 액션을 통해 다음 상태로 만들어 내는 함수 (불변성 꼭 지켜야 함.)\n\n\nvar postReduce = function postReduce() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;\n  var action = arguments.length > 1 ? arguments[1] : undefined;\n  return Object(immer__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(state, function (draft) {\n    switch (action.type) {\n      case LOAD_POST_REQUEST:\n        draft.loadPostLoading = true;\n        draft.loadPostComplete = false;\n        draft.loadPostError = null;\n        break;\n\n      case LOAD_POST_SUCCESS:\n        draft.loadPostLoading = false;\n        draft.loadPostComplete = true;\n        draft.loadPostError = null;\n        draft.mainPosts = action.data.concat(draft.mainPosts);\n        break;\n\n      case LOAD_POST_FAILURE:\n        draft.loadPostLoading = false;\n        draft.loadPostComplete = false;\n        draft.loadPostError = action.error;\n        break;\n\n      case ADD_POST_REQUEST:\n        draft.addPostLoading = true;\n        draft.addPostComplete = false;\n        draft.addPostError = null;\n        break;\n\n      case ADD_POST_SUCCESS:\n        // draft.mainPosts = [dummyPostData(action.data), ...state.mainPosts];\n        draft.mainPosts.unshift(dummyPostData(action.data));\n        draft.addPostLoading = false;\n        draft.addPostComplete = true;\n        draft.addPostError = null;\n        break;\n\n      case ADD_POST_FAILURE:\n        draft.addPostLoading = false;\n        draft.addPostComplete = false;\n        draft.addPostError = action.error;\n        break;\n\n      case ADD_COMMENT_REQUEST:\n        draft.addCommentLoading = true;\n        draft.addCommentComplete = false;\n        draft.addCommentError = null;\n        break;\n\n      case ADD_COMMENT_SUCCESS:\n        {\n          var post = draft.mainPosts.find(function (v) {\n            return v.id === action.data.postId;\n          });\n          post.Comments.unshift({\n            User: {\n              nickname: 'Immer 닉네임'\n            },\n            content: action.data.content\n          });\n          draft.addCommentLoading = false;\n          draft.addCommentComplete = true;\n          draft.addCommentError = null;\n          break;\n        }\n\n      case ADD_COMMENT_FAILURE:\n        draft.addCommentLoading = false;\n        draft.addCommentComplete = false;\n        draft.addCommentError = action.error;\n        break;\n\n      case REMOVE_POST_REQUEST:\n        draft.removePostLoading = true;\n        draft.removePostComplete = false;\n        draft.removePostError = null;\n        break;\n\n      case REMOVE_POST_SUCCESS:\n        draft.mainPosts = draft.mainPosts.filter(function (v) {\n          return v.id !== action.data;\n        });\n        draft.removePostLoading = false;\n        draft.removePostComplete = true;\n        draft.removePostError = null;\n        break;\n\n      case REMOVE_POST_FAILURE:\n        draft.removePostLoading = false;\n        draft.removePostComplete = false;\n        draft.removePostError = action.error;\n        break;\n\n      default:\n        break;\n    }\n  });\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (postReduce);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcmVkdWNlcnMvcG9zdC5qcz9hN2UzIl0sIm5hbWVzIjpbImluaXRpYWxTdGF0ZSIsIm1haW5Qb3N0cyIsImltYWdlUGF0aHMiLCJoYXNNb3JlSFBvc3QiLCJsb2FkUG9zdExvYWRpbmciLCJsb2FkUG9zdENvbXBsZXRlIiwibG9hZFBvc3RFcnJvciIsImFkZFBvc3RMb2FkaW5nIiwiYWRkUG9zdENvbXBsZXRlIiwiYWRkUG9zdEVycm9yIiwiYWRkQ29tbWVudExvYWRpbmciLCJhZGRDb21tZW50Q29tcGxldGUiLCJhZGRDb21tZW50RXJyb3IiLCJyZW1vdmVQb3N0TG9hZGluZyIsInJlbW92ZVBvc3RDb21wbGV0ZSIsInJlbW92ZVBvc3RFcnJvciIsImR1bW15UG9zdCIsIm51bWJlciIsIkFycmF5IiwiZmlsbCIsIm1hcCIsImlkIiwiTWF0aCIsInJhbmRvbSIsIlVzZXIiLCJzaG9ydElkIiwiZ2VuZXJhdGUiLCJuaWNrbmFtZSIsImZha2VyIiwibmFtZSIsImZpbmROYW1lIiwiY29udGVudCIsImxvcmVtIiwicGFyYWdyYXBoIiwiSW1hZ2VzIiwic3JjIiwiaW1hZ2UiLCJDb21tZW50cyIsInNlbnRlbmNlIiwiTE9BRF9QT1NUX1JFUVVFU1QiLCJMT0FEX1BPU1RfU1VDQ0VTUyIsIkxPQURfUE9TVF9GQUlMVVJFIiwiQUREX1BPU1RfUkVRVUVTVCIsIkFERF9QT1NUX1NVQ0NFU1MiLCJBRERfUE9TVF9GQUlMVVJFIiwiQUREX0NPTU1FTlRfUkVRVUVTVCIsIkFERF9DT01NRU5UX1NVQ0NFU1MiLCJBRERfQ09NTUVOVF9GQUlMVVJFIiwiUkVNT1ZFX1BPU1RfUkVRVUVTVCIsIlJFTU9WRV9QT1NUX1NVQ0NFU1MiLCJSRU1PVkVfUE9TVF9GQUlMVVJFIiwiYWRkUG9zdFJlcXVlc3RBY3Rpb24iLCJkYXRhIiwidHlwZSIsImFkZENvbW1lbnRSZXF1ZXN0QWN0aW9uIiwicmVtb3ZlUG9zdFJlcXVlc3RBY3Rpb24iLCJkdW1teVBvc3REYXRhIiwicG9zdFJlZHVjZSIsInN0YXRlIiwiYWN0aW9uIiwicHJvZHVjZSIsImRyYWZ0IiwiY29uY2F0IiwiZXJyb3IiLCJ1bnNoaWZ0IiwicG9zdCIsImZpbmQiLCJ2IiwicG9zdElkIiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRU8sSUFBTUEsWUFBWSxHQUFHO0FBQzFCQyxXQUFTLEVBQUUsRUFEZTtBQUUxQkMsWUFBVSxFQUFFLEVBRmM7QUFHMUJDLGNBQVksRUFBRSxJQUhZO0FBSTFCQyxpQkFBZSxFQUFFLEtBSlM7QUFLMUJDLGtCQUFnQixFQUFFLEtBTFE7QUFNMUJDLGVBQWEsRUFBRSxJQU5XO0FBTzFCQyxnQkFBYyxFQUFFLEtBUFU7QUFRMUJDLGlCQUFlLEVBQUUsS0FSUztBQVMxQkMsY0FBWSxFQUFFLElBVFk7QUFVMUJDLG1CQUFpQixFQUFFLEtBVk87QUFXMUJDLG9CQUFrQixFQUFFLEtBWE07QUFZMUJDLGlCQUFlLEVBQUUsSUFaUztBQWExQkMsbUJBQWlCLEVBQUUsS0FiTztBQWMxQkMsb0JBQWtCLEVBQUUsS0FkTTtBQWUxQkMsaUJBQWUsRUFBRTtBQWZTLENBQXJCO0FBa0JBLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLE1BQUQ7QUFBQSxTQUFZQyxLQUFLLENBQUMsRUFBRCxDQUFMLENBQVVDLElBQVYsR0FBaUJDLEdBQWpCLENBQXFCO0FBQUEsV0FBTztBQUMvREMsUUFBRSxFQUFFQyxJQUFJLENBQUNDLE1BQUwsS0FBZ0IsUUFBaEIsR0FBMkIsQ0FEZ0M7QUFFL0RDLFVBQUksRUFBRTtBQUNKSCxVQUFFLEVBQUVJLDhDQUFPLENBQUNDLFFBQVIsRUFEQTtBQUVKQyxnQkFBUSxFQUFFQyw0Q0FBSyxDQUFDQyxJQUFOLENB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QUFOLEdBQTBCLEtBQTFCO0FBQ0FnRCxhQUFLLENBQUMvQyxrQkFBTixHQUEyQixJQUEzQjtBQUNBK0MsYUFBSyxDQUFDOUMsZUFBTixHQUF3QixJQUF4QjtBQUVBOztBQUNGLFdBQUttQyxtQkFBTDtBQUNFVyxhQUFLLENBQUNoRCxpQkFBTixHQUEwQixLQUExQjtBQUNBZ0QsYUFBSyxDQUFDL0Msa0JBQU4sR0FBMkIsS0FBM0I7QUFDQStDLGFBQUssQ0FBQzlDLGVBQU4sR0FBd0I0QyxNQUFNLENBQUNJLEtBQS9CO0FBRUE7O0FBQ0Y7QUFDRTtBQXpGSjtBQTJGRCxHQTVGMkQsQ0FBekM7QUFBQSxDQUFuQjs7QUE4RmVOLHlFQUFmIiwiZmlsZSI6Ii4vcmVkdWNlcnMvcG9zdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJztcbmltcG9ydCBzaG9ydElkIGZyb20gJ3Nob3J0aWQnO1xuaW1wb3J0IGZha2VyIGZyb20gJ2Zha2VyJztcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcbiAgbWFpblBvc3RzOiBbXSxcbiAgaW1hZ2VQYXRoczogW10sXG4gIGhhc01vcmVIUG9zdDogdHJ1ZSxcbiAgbG9hZFBvc3RMb2FkaW5nOiBmYWxzZSxcbiAgbG9hZFBvc3RDb21wbGV0ZTogZmFsc2UsXG4gIGxvYWRQb3N0RXJyb3I6IG51bGwsXG4gIGFkZFBvc3RMb2FkaW5nOiBmYWxzZSxcbiAgYWRkUG9zdENvbXBsZXRlOiBmYWxzZSxcbiAgYWRkUG9zdEVycm9yOiBudWxsLFxuICBhZGRDb21tZW50TG9hZGluZzogZmFsc2UsXG4gIGFkZENvbW1lbnRDb21wbGV0ZTogZmFsc2UsXG4gIGFkZENvbW1lbnRFcnJvcjogbnVsbCxcbiAgcmVtb3ZlUG9zdExvYWRpbmc6IGZhbHNlLFxuICByZW1vdmVQb3N0Q29tcGxldGU6IGZhbHNlLFxuICByZW1vdmVQb3N0RXJyb3I6IG51bGwsXG59O1xuXG5leHBvcnQgY29uc3QgZHVtbXlQb3N0ID0gKG51bWJlcikgPT4gQXJyYXkoMjApLmZpbGwoKS5tYXAoKCkgPT4gKHtcbiAgaWQ6IE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMCArIDAsXG4gIFVzZXI6IHtcbiAgICBpZDogc2hvcnRJZC5nZW5lcmF0ZSgpLFxuICAgIG5pY2tuYW1lOiBmYWtlci5uYW1lLmZpbmROYW1lKCksXG4gIH0sXG4gIGNvbnRlbnQ6IGZha2VyLmxvcmVtLnBhcmFncmFwaCgpLFxuICBJbWFnZXM6IFt7XG4gICAgc3JjOiBmYWtlci5pbWFnZS5pbWFnZSgpLFxuICB9XSxcbiAgQ29tbWVudHM6IFt7XG4gICAgVXNlcjoge1xuICAgICAgaWQ6IHNob3J0SWQuZ2VuZXJhdGUoKSxcbiAgICAgIG5pY2tuYW1lOiBmYWtlci5uYW1lLmZpbmROYW1lKCksXG4gICAgfSxcbiAgICBjb250ZW50OiBmYWtlci5sb3JlbS5zZW50ZW5jZSgpLFxuICB9XSxcbn0pKTtcblxuZXhwb3J0IGNvbnN0IExPQURfUE9TVF9SRVFVRVNUID0gJ0xPQURfUE9TVF9SRVFVRVNUJztcbmV4cG9ydCBjb25zdCBMT0FEX1BPU1RfU1VDQ0VTUyA9ICdMT0FEX1BPU1RfU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgTE9BRF9QT1NUX0ZBSUxVUkUgPSAnTE9BRF9QT1NUX0ZBSUxVUkUnO1xuXG5leHBvcnQgY29uc3QgQUREX1BPU1RfUkVRVUVTVCA9ICdBRERfUE9TVF9SRVFVRVNUJztcbmV4cG9ydCBjb25zdCBBRERfUE9TVF9TVUNDRVNTID0gJ0FERF9QT1NUX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IEFERF9QT1NUX0ZBSUxVUkUgPSAnQUREX1BPU1RfRkFJTFVSRSc7XG5cbmV4cG9ydCBjb25zdCBBRERfQ09NTUVOVF9SRVFVRVNUID0gJ0FERF9DT01NRU5UX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IEFERF9DT01NRU5UX1NVQ0NFU1MgPSAnQUREX0NPTU1FTlRfU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgQUREX0NPTU1FTlRfRkFJTFVSRSA9ICdBRERfQ09NTUVOVF9GQUlMVVJFJztcblxuZXhwb3J0IGNvbnN0IFJFTU9WRV9QT1NUX1JFUVVFU1QgPSAnUkVNT1ZFX1BPU1RfUkVRVUVTVCc7XG5leHBvcnQgY29uc3QgUkVNT1ZFX1BPU1RfU1VDQ0VTUyA9ICdSRU1PVkVfUE9TVF9TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBSRU1PVkVfUE9TVF9GQUlMVVJFID0gJ1JFTU9WRV9QT1NUX0ZBSUxVUkUnO1xuXG5leHBvcnQgY29uc3QgYWRkUG9zdFJlcXVlc3RBY3Rpb24gPSAoZGF0YSkgPT4gKHtcbiAgdHlwZTogQUREX1BPU1RfUkVRVUVTVCxcbiAgZGF0YSxcbn0pO1xuXG5leHBvcnQgY29uc3QgYWRkQ29tbWVudFJlcXVlc3RBY3Rpb24gPSAoZGF0YSkgPT4gKHtcbiAgdHlwZTogQUREX0NPTU1FTlRfUkVRVUVTVCxcbiAgZGF0YSxcbn0pO1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlUG9zdFJlcXVlc3RBY3Rpb24gPSAoZGF0YSkgPT4gKHtcbiAgdHlwZTogUkVNT1ZFX1BPU1RfUkVRVUVTVCxcbiAgZGF0YSxcbn0pO1xuXG5jb25zdCBkdW1teVBvc3REYXRhID0gKGRhdGEpID0+ICh7XG4gIGlkOiBkYXRhLmlkLFxuICBjb250ZW50OiBkYXRhLmNvbnRlbnQuY29udGVudCxcbiAgVXNlcjoge1xuICAgIGlkOiAxLFxuICAgIG5pY2tuYW1lOiBkYXRhLmNvbnRlbnQubmlja25hbWUsXG4gIH0sXG4gIEltYWdlczogW10sXG4gIENvbW1lbnRzOiBbXSxcbn0pO1xuXG4vLyDsnbTsoIQg7IOB7YOc66W8IOyVoeyFmOydhCDthrXtlbQg64uk7J2MIOyDge2DnOuhnCDrp4zrk6TslrQg64K064qUIO2VqOyImCAo67aI67OA7ISxIOq8rSDsp4DsvJzslbwg7ZWoLilcbmNvbnN0IHBvc3RSZWR1Y2UgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4gcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIExPQURfUE9TVF9SRVFVRVNUOlxuICAgICAgZHJhZnQubG9hZFBvc3RMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGRyYWZ0LmxvYWRQb3N0Q29tcGxldGUgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LmxvYWRQb3N0RXJyb3IgPSBudWxsO1xuXG4gICAgICBicmVhaztcbiAgICBjYXNlIExPQURfUE9TVF9TVUNDRVNTOlxuICAgICAgZHJhZnQubG9hZFBvc3RMb2FkaW5nID0gZmFsc2U7XG4gICAgICBkcmFmdC5sb2FkUG9zdENvbXBsZXRlID0gdHJ1ZTtcbiAgICAgIGRyYWZ0LmxvYWRQb3N0RXJyb3IgPSBudWxsO1xuICAgICAgZHJhZnQubWFpblBvc3RzID0gYWN0aW9uLmRhdGEuY29uY2F0KGRyYWZ0Lm1haW5Qb3N0cyk7XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgTE9BRF9QT1NUX0ZBSUxVUkU6XG4gICAgICBkcmFmdC5sb2FkUG9zdExvYWRpbmcgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LmxvYWRQb3N0Q29tcGxldGUgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LmxvYWRQb3N0RXJyb3IgPSBhY3Rpb24uZXJyb3I7XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQUREX1BPU1RfUkVRVUVTVDpcbiAgICAgIGRyYWZ0LmFkZFBvc3RMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGRyYWZ0LmFkZFBvc3RDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgZHJhZnQuYWRkUG9zdEVycm9yID0gbnVsbDtcblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBRERfUE9TVF9TVUNDRVNTOlxuICAgICAgLy8gZHJhZnQubWFpblBvc3RzID0gW2R1bW15UG9zdERhdGEoYWN0aW9uLmRhdGEpLCAuLi5zdGF0ZS5tYWluUG9zdHNdO1xuICAgICAgZHJhZnQubWFpblBvc3RzLnVuc2hpZnQoZHVtbXlQb3N0RGF0YShhY3Rpb24uZGF0YSkpO1xuICAgICAgZHJhZnQuYWRkUG9zdExvYWRpbmcgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LmFkZFBvc3RDb21wbGV0ZSA9IHRydWU7XG4gICAgICBkcmFmdC5hZGRQb3N0RXJyb3IgPSBudWxsO1xuXG4gICAgICBicmVhaztcbiAgICBjYXNlIEFERF9QT1NUX0ZBSUxVUkU6XG4gICAgICBkcmFmdC5hZGRQb3N0TG9hZGluZyA9IGZhbHNlO1xuICAgICAgZHJhZnQuYWRkUG9zdENvbXBsZXRlID0gZmFsc2U7XG4gICAgICBkcmFmdC5hZGRQb3N0RXJyb3IgPSBhY3Rpb24uZXJyb3I7XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQUREX0NPTU1FTlRfUkVRVUVTVDpcbiAgICAgIGRyYWZ0LmFkZENvbW1lbnRMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIGRyYWZ0LmFkZENvbW1lbnRDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgZHJhZnQuYWRkQ29tbWVudEVycm9yID0gbnVsbDtcblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBRERfQ09NTUVOVF9TVUNDRVNTOiB7XG4gICAgICBjb25zdCBwb3N0ID0gZHJhZnQubWFpblBvc3RzLmZpbmQoKHYpID0+IHYuaWQgPT09IGFjdGlvbi5kYXRhLnBvc3RJZCk7XG4gICAgICBwb3N0LkNvbW1lbnRzLnVuc2hpZnQoXG4gICAgICAgIHtcbiAgICAgICAgICBVc2VyOiB7XG4gICAgICAgICAgICBuaWNrbmFtZTogJ0ltbWVyIOuLieuEpOyehCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb250ZW50OiBhY3Rpb24uZGF0YS5jb250ZW50LFxuICAgICAgICB9LFxuICAgICAgKTtcblxuICAgICAgZHJhZnQuYWRkQ29tbWVudExvYWRpbmcgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LmFkZENvbW1lbnRDb21wbGV0ZSA9IHRydWU7XG4gICAgICBkcmFmdC5hZGRDb21tZW50RXJyb3IgPSBudWxsO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBBRERfQ09NTUVOVF9GQUlMVVJFOlxuICAgICAgZHJhZnQuYWRkQ29tbWVudExvYWRpbmcgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LmFkZENvbW1lbnRDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgZHJhZnQuYWRkQ29tbWVudEVycm9yID0gYWN0aW9uLmVycm9yO1xuXG4gICAgICBicmVhaztcbiAgICBjYXNlIFJFTU9WRV9QT1NUX1JFUVVFU1Q6XG4gICAgICBkcmFmdC5yZW1vdmVQb3N0TG9hZGluZyA9IHRydWU7XG4gICAgICBkcmFmdC5yZW1vdmVQb3N0Q29tcGxldGUgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LnJlbW92ZVBvc3RFcnJvciA9IG51bGw7XG5cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgUkVNT1ZFX1BPU1RfU1VDQ0VTUzpcbiAgICAgIGRyYWZ0Lm1haW5Qb3N0cyA9IGRyYWZ0Lm1haW5Qb3N0cy5maWx0ZXIoKHYpID0+IHYuaWQgIT09IGFjdGlvbi5kYXRhKTtcbiAgICAgIGRyYWZ0LnJlbW92ZVBvc3RMb2FkaW5nID0gZmFsc2U7XG4gICAgICBkcmFmdC5yZW1vdmVQb3N0Q29tcGxldGUgPSB0cnVlO1xuICAgICAgZHJhZnQucmVtb3ZlUG9zdEVycm9yID0gbnVsbDtcblxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBSRU1PVkVfUE9TVF9GQUlMVVJFOlxuICAgICAgZHJhZnQucmVtb3ZlUG9zdExvYWRpbmcgPSBmYWxzZTtcbiAgICAgIGRyYWZ0LnJlbW92ZVBvc3RDb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgZHJhZnQucmVtb3ZlUG9zdEVycm9yID0gYWN0aW9uLmVycm9yO1xuXG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBwb3N0UmVkdWNlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./reducers/post.js\n");

/***/ })

})
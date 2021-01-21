import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import useInput from '../hooks/useinput';

import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const meId = useSelector((state) => state.user.me?.id);
  const { addCommentLoading, addCommentComplete } = useSelector((state) => state.post);

  useEffect(() => {
    if (addCommentComplete) {
      setCommentText('');
    }
  }, [setCommentText, addCommentComplete]);

  const dispatch = useDispatch();
  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        postId: post.id,
        userId: meId,
      },
    });
  }, [commentText, meId]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} row={4} />
        <Button htmlType="submit" loading={addCommentLoading}>작성</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;

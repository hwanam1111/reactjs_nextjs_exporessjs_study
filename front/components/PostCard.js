import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import styled from 'styled-components';

import { REMOVE_POST_REQUEST } from '../reducers/post';

import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import CommentForm from './CommentForm';
import FollowButton from './FollowButton';

const CardItemListWrapper = styled.div`
  margin-bottom: 10px;
  &:last-child {
    marign-bottom: 0;
  }
`;

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const meId = me?.id; // optional chaining 연산자

  const [liked, setLiked] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prevData) => !prevData);
  }, []);

  const dispatch = useDispatch();
  const onClickDeleteBtn = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const [commentFormOpend, setCommentFormOpend] = useState(false);
  const onToggleCommentOpen = useCallback(() => {
    setCommentFormOpend((prevData) => !prevData);
  }, []);

  return (
    <CardItemListWrapper>
      <Card
        cover={post.Images.length !== 0 && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? <HeartTwoTone twoToneColor="#eb2f96" key="header" onClick={onToggleLike} /> : <HeartOutlined key="header" onClick={onToggleLike} />,
          <MessageOutlined key="comment" onClick={onToggleCommentOpen} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {
                  meId && meId === post.User.id
                    ? (
                      <>
                        <Button htmlType="button">수정</Button>
                        <Button htmlType="button" loading={removePostLoading} onClick={onClickDeleteBtn}>삭제</Button>
                      </>
                    )
                    : (
                      <>
                        <Button htmlType="button">신고</Button>
                      </>
                    )
                }
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={
          (meId && meId !== post.User.id) && <FollowButton post={post} />
        }
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {
        commentFormOpend && (
          <>
            <CommentForm post={post} />
            { post.Comments !== undefined && (
              <List
                header={`${post.Comments.length}개의 댓글`}
                itemLayout="horizontal"
                dataSource={post.Comments}
                renderItem={(item) => (
                  <li>
                    <Comment
                      author={item.User.nickname}
                      avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                      content={item.content}
                    />
                  </li>
                )}
              />
            )}
          </>
        )
      }
    </CardItemListWrapper>
  );
};

// 최대한 자세하게
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;

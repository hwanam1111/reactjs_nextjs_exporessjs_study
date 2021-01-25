import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import styled from 'styled-components';

import { POST_LIKED_REQUEST, POST_UNLIKED_REQUEST, RETWEET_REQUEST, REMOVE_POST_REQUEST } from '../reducers/post';

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
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const meId = me?.id; // optional chaining 연산자
  const { removePostLoading } = useSelector((state) => state.post);

  const onClickLike = useCallback(() => {
    if (me && meId) {
      dispatch({
        type: POST_LIKED_REQUEST,
        data: {
          postId: post.id,
        },
      });
    } else {
      alert('로그인 후 좋아요가 가능합니다.');
    }
  }, []);

  const onClickUnLike = useCallback(() => {
    if (me && meId) {
      dispatch({
        type: POST_UNLIKED_REQUEST,
        data: {
          postId: post.id,
        },
      });
    } else {
      alert('로그인 후 좋아요가 가능합니다.');
    }
  }, []);

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

  const onRetweet = useCallback(() => {
    if (!meId) {
      return alert('로그인이 필요합니다.');
    }

    if (meId === post.User.id) {
      return alert('내 게시글은 리트윗 할 수 없습니다.');
    }

    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, []);

  const liked = post.PostLikers.find((v) => v.id === meId);

  return (
    <CardItemListWrapper>
      <Card
        cover={post.Images.length !== 0 && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? <HeartTwoTone twoToneColor="#eb2f96" key="header" onClick={onClickUnLike} /> : <HeartOutlined key="header" onClick={onClickLike} />,
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
        title={post.RetweetId ? `${post.User.nickname}님이 리트윗 했습니다.` : null}
        extra={
          (meId && meId !== post.User.id) && <FollowButton post={post} />
        }
      >
        {post.RetweetId
          ? (
            <Card
              cover={
                post.RetweetId.Images.length !== 0 && <PostImages images={post.RetweetId.Images} />
              }
            >
              <Card.Meta
                avatar={<Avatar>{post.RetweetId.User.nickname[0]}</Avatar>}
                title={post.RetweetId.User.nickname}
                description={<PostCardContent postData={post.RetweetId.content} />}
              />
            </Card>
          )
          : (
            <Card.Meta
              avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          )}
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
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    PostLikers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;

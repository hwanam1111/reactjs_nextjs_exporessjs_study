import React, { useCallback } from 'react';
import { Card, Button } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);

  const onClickLogoutHandler = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <div>
      <Card
        actions={[
          <div key="twit">게시글<br />{me.Posts.length}</div>,
          <div key="followings">팔로잉<br />{me.Followings.length}</div>,
          <div key="follwer">팔로워<br />{me.Followers.length}</div>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
        <Button onClick={onClickLogoutHandler} loading={logoutLoading}>로그아웃</Button>
      </Card>
    </div>
  );
};

export default UserProfile;

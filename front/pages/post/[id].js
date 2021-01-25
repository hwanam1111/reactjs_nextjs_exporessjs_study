import React from 'react';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import Head from 'next/head';

import wrapper from '../../store/configureStore';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_SPECIFY_POST_REQUEST } from '../../reducers/post';

import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname} 님의 글</title>
      </Head>
      <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch({
    type: LOAD_SPECIFY_POST_REQUEST,
    data: context.query.id,
  });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import { SIGN_UP_RESET_COMPLETE } from '../reducers/user';
import { LOAD_POST_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me, signupComplete } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      const { scrollY } = window;
      const { clientHeight, scrollHeight } = document.documentElement;

      if (scrollY + clientHeight > scrollHeight - 300) {
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost]);

  useEffect(() => {
    if (signupComplete) {
      dispatch({
        type: SIGN_UP_RESET_COMPLETE,
      });
    }
  }, []);

  return (
    <AppLayout>
      { me && <PostForm /> }
      {
        mainPosts.map((post) => <PostCard key={post.id} post={post} />)
      }
    </AppLayout>
  );
};

export default Home;

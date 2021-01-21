import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useinput';
import AppLayout from '../components/AppLayout';

import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: #ff0000;
`;

const Signup = () => {
  const [email, onChangeUserEmail] = useInput('');
  const [nickname, onChangeUserNickname] = useInput('');
  const [password, onChangeUserPassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const onChangeUserPasswordCheck = useCallback((evt) => {
    setPasswordCheck(evt.target.value);
    setPasswordCheckError(evt.target.value !== password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(true);

  const onChangeTerm = useCallback((evt) => {
    setTerm(evt.target.checked);
    setTermError(!evt.target.checked);
  }, []);

  const dispatch = useDispatch();
  const { signupLoading } = useSelector((state) => state.user);
  const onSubmitHandler = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordCheckError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        nickname,
        password,
      },
    });
  }, [email, nickname, password, passwordCheck, term]);

  return (
    <AppLayout>
      <Head>
        <title>회원가입</title>
      </Head>
      <Form onFinish={onSubmitHandler}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <Input type="email" name="user-email" value={email} onChange={onChangeUserEmail} />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <Input type="text" name="user-nickname" value={nickname} onChange={onChangeUserNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <Input type="password" name="user-password" value={password} onChange={onChangeUserPassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <Input type="password" name="user-password-check" value={passwordCheck} onChange={onChangeUserPasswordCheck} />
          {passwordCheckError && <ErrorMessage>비밀번호가 틀립니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
          {termError && <ErrorMessage>약관에 동의해야 해요</ErrorMessage>}
        </div>
        <div>
          <Button type="primary" htmlType="submit" loading={signupLoading}>회원가입</Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;

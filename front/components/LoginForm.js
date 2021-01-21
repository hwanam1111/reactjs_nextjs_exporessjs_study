import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import useInput from '../hooks/useinput';

import { loginRequestAction } from '../reducers/user';

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const LoginForm = () => {
  const { loginLoading } = useSelector((state) => state.user);

  const [email, onChangeEmailHandler] = useInput('');
  const [password, onChangePasswordHandler] = useInput('');

  const dispatch = useDispatch();
  const onSubmitFormHandler = useCallback(() => {
    const dummyUserData = {
      nickname: email,
      id: 1,
      Posts: [
        {
          id: 1,
        },
      ],
      Followings: [{ nickname: '가가가' }, { nickname: '나나나' }, { nickname: '다다다' }],
      Followers: [{ nickname: '라라라' }, { nickname: '마마마' }, { nickname: '바바바' }, { nickname: '사사사' }],
    };

    dispatch(loginRequestAction({ email, password, dummyUserData }));
  }, [email, password]);

  return (
    <div>
      <FormWrapper onFinish={onSubmitFormHandler}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input
            type="text"
            name="user-email"
            value={email}
            onChange={onChangeEmailHandler}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            type="password"
            name="user-password"
            value={password}
            onChange={onChangePasswordHandler}
          />
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
          <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </ButtonWrapper>
      </FormWrapper>
    </div>
  );
};

export default LoginForm;

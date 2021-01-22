import React, { useEffect, useCallback } from 'react';
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
  const { loginLoading, loginError } = useSelector((state) => state.user);

  const [email, onChangeEmailHandler] = useInput('');
  const [password, onChangePasswordHandler] = useInput('');

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  const dispatch = useDispatch();
  const onSubmitFormHandler = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
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

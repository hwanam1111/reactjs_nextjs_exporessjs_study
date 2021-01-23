import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useinput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const NicknameEditFormStyle = useMemo(() => ({
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #d9d9d9',
  }));

  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const dispatch = useDispatch();
  const onChangeNicknameSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form style={NicknameEditFormStyle}>
      <Input.Search addonBefore="닉네임" enterButton="수정" onChange={onChangeNickname} onSearch={onChangeNicknameSubmit} value={nickname} />
    </Form>
  );
};

export default NicknameEditForm;

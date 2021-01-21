import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

const NicknameEditForm = () => {
  const NicknameEditFormStyle = useMemo(() => ({
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #d9d9d9',
  }));

  return (
    <Form style={NicknameEditFormStyle}>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NicknameEditForm;

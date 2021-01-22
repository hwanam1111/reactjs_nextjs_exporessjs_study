import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useinput';
import { addPostRequestAction } from '../reducers/post';

const FormWrapper = styled(Form)`
  margin: 20px;
`;

const ImageWrraper = styled.div`
  display: inline-block;
`;

const Image = styled.img`
  width: 200px;
`;

const PostForm = () => {
  const { imagePaths, addPostLoading, addPostComplete } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostComplete) {
      setText('');
    }
  }, [addPostComplete, setText]);

  const imageInput = useRef(null);
  const onClickImageUploadBtn = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const dispatch = useDispatch();
  const onSubmitPostForm = useCallback(() => {
    dispatch(addPostRequestAction({ content: text }));
  }, [text]);

  return (
    <FormWrapper encType="multipart/form-data" onFinish={onSubmitPostForm}>
      <Input.TextArea value={text} onChange={onChangeText} placeholder="게시글을 입력해주세요" />
      <div>
        <input type="file" ref={imageInput} multiple hidden />
        <Button htmlType="button" onClick={onClickImageUploadBtn}>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" loading={addPostLoading}>작성하기</Button>
      </div>
      <div>
        {
          imagePaths.map((v) => (
            <ImageWrraper key={v}>
              <Image src={v} alt="이미지" title="이미지" />
              <div>
                <Button>제거</Button>
              </div>
            </ImageWrraper>
          ))
        }
      </div>
    </FormWrapper>
  );
};

export default PostForm;

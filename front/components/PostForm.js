import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useinput';
import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post';

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
  const dispatch = useDispatch();

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

  const onChangeImage = useCallback((evt) => {
    const imageFormData = new FormData();
    [].forEach.call(evt.target.files, (f) => {
      imageFormData.append('image', f);
    });

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback((imageIndex) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: imageIndex,
    });
  }, []);

  const onSubmitPostForm = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 입력해주세요.');
    }

    const formData = new FormData();

    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);

    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  return (
    <FormWrapper encType="multipart/form-data" onFinish={onSubmitPostForm}>
      <Input.TextArea value={text} onChange={onChangeText} placeholder="게시글을 입력해주세요" />
      <div>
        <input type="file" name="image" ref={imageInput} multiple hidden onChange={onChangeImage} />
        <Button htmlType="button" onClick={onClickImageUploadBtn}>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" loading={addPostLoading}>작성하기</Button>
      </div>
      <div>
        {
          imagePaths.map((v, i) => (
            <ImageWrraper key={v}>
              <Image src={`http://localhost:3065/${v}`} alt="이미지" title="이미지" />
              <div>
                <Button onClick={onRemoveImage(i)}>제거</Button>
              </div>
            </ImageWrraper>
          ))
        }
      </div>
    </FormWrapper>
  );
};

export default PostForm;

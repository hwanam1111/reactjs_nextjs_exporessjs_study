import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

import ImageZoom from './ImageZoom';

const PostImagesCoverWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const ImageMoreViewWrapper = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
`;

const PostImages = ({ images }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const onImageZoom = useCallback(() => {
    setShowImageZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImageZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role="presentation" src={images[0].src} alt="이미지" onClick={onImageZoom} />
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  if (images.length === 2) {
    return (
      <>
        <PostImagesCoverWrapper>
          <img role="presentation" width="49.9%" src={images[0].src} alt="이미지" onClick={onImageZoom} />
          <img role="presentation" width="49.9%" src={images[1].src} alt="이미지" onClick={onImageZoom} />
        </PostImagesCoverWrapper>
        {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }

  return (
    <>
      <PostImagesCoverWrapper>
        <img role="presentation" width="49.9%" src={images[0].src} alt="이미지" onClick={onImageZoom} />
        <ImageMoreViewWrapper
          role="presentation"
          onClick={onImageZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더 보기
        </ImageMoreViewWrapper>
      </PostImagesCoverWrapper>
      {showImageZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;

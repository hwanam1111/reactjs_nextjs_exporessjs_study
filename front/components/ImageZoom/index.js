import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import { Global, Overlay, Header, SlickWrapper, ImageWrapper } from './styles';

const ImageZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1 className="title">상세 이미지</h1>
        <button type="button" className="close-btn" onClick={onClose}>X</button>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            arrows={false}
            infinite
            slidesToShow={1}
            slidesToScroll={1}
          >
            {
              images.map((v) => (
                <ImageWrapper key={v.src}>
                  <img className="image" src={`http://localhost:3065/${v.src}`} alt="이미지 확대" />
                </ImageWrapper>
              ))
            }
          </Slick>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImageZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageZoom;

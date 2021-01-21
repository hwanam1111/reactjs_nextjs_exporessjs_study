import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Header = styled.header`
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #fff;

  & .title {
    margin: 0;
    font-size: 17px;
    color: #333; 
  }

  & .close-btn {
    background: none;
    border: 0;
    position: absolute;
    z-index: 20;
    top: 0;
    right: 10px;
    color: #000;
    font-size: 22px;
    outline: 0;
  }
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 50px);
`;

export const ImageWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & .image {
    margin: 0 auto;
    max-height: 500px;
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';
// 모든페이지에서 공통인 부분
const Common = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>Nodebird</title>
    </Head>
    <Component />
  </>
);

Common.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Common);

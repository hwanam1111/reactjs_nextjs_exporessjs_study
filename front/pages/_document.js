import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from  'styled-components';

export default class MyDocument extends Document {
  static async getInitalProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
      const initalProps = await Document.getInitialProps(ctx);
      return {
        ...initalProps,
        styles: (
          <>
            {initalProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.error(error);
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2019%2Ces2018%2Ces2017%2Ces2016%2Ces2015"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

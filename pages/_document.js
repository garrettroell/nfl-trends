// pages/_document.js

import { extendTheme, ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

const theme = extendTheme();

export default class Document extends NextDocument {
  render() {
    return (
      <>
        <Head />
        <Html lang="en">
          <body>
            {/* 👇 Here's the script */}
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main />
            <NextScript />
          </body>
        </Html>
      </>
    );
  }
}

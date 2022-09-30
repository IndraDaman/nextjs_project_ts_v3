import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/layout";
import type { AppProps } from "next/app";
import { customTheme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
 
export default MyApp;

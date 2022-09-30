import { Box, Flex, HStack } from '@chakra-ui/react';
import {HomePageContent} from '../components/home';
import { Sidebar } from '../components/layout';
import { clientLoginServerSideProps } from '../middleware';

function HomePage() {

  return( <Box>
    <HStack float={"left"} width={"20%"}> <Sidebar /></HStack>
    <HStack float={"right"} width={"80%"}><HomePageContent /></HStack>
    </Box>
  )
}

export default HomePage;
export async function getServerSideProps(context: any) {
  const { cookies }=context.req;
  const isLogin = clientLoginServerSideProps(cookies);
  if (!isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { cookies },
  };
}
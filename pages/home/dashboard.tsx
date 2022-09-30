import {DashboardPageContent, HomePageContent} from '../../components/home';
import { clientLoginAuthorization, clientLoginServerSideProps } from '../../middleware';

function DashboardPage() {

  return <DashboardPageContent />;
}

export default DashboardPage;
export async function getServerSideProps(context: any) {
  const { cookies }=context.req;
  const isLogin = clientLoginServerSideProps(cookies);
  if (!isLogin) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }else{
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { cookies },
  };
}
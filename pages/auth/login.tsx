import {LoginForm} from '../../components/auth';
import { clientLoginServerSideProps } from '../../middleware';

function LoginPage() {
    return <LoginForm />;
}

export default LoginPage

export async function getServerSideProps(context: any) {
    const { cookies }=context.req;
    const isLogin = clientLoginServerSideProps(cookies);
    if (isLogin) {
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
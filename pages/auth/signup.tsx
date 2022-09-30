import {SignupForm} from '../../components/auth';
import { clientLoginServerSideProps } from '../../middleware';

function SignupPage() {
    return <SignupForm />;
}

export default SignupPage
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
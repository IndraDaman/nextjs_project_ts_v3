import {ForgotPasswordForm} from '../../components/auth';
import { clientLoginServerSideProps } from '../../middleware';

function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}

export default ForgotPasswordPage
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
import { UserTable } from "../../components/users";
import {
  getApiBoard,
  getApiUserRole,
  getApiUsers,
  getApiWorkspace,
  RoleDetail,
} from "../../helpers";
import {
  clientLoginServerSideProps,
  getClientCookieName,
  jwtResponse,
  loginUserDetail,
} from "../../middleware";
// import { InferGetServerSidePropsType } from ' '

// type Data = { ... }

// export const getServerSideProps = async () => {
//   const data: Data = /* ... */

//   return {
//     props: {
//       data,
//     },
//   }
// }
function UsersPage(_props: any) {
  return (
    <UserTable
      userList={_props.data}
      userRole={_props.userRole}
      workspace={_props.workspace.Data}
      board={_props.board.Data}
    />
  );
}

export default UsersPage;
export async function getServerSideProps(context: any) {
  const { cookies } = context.req;
  const isLogin = clientLoginServerSideProps(cookies);
  const userDetail=loginUserDetail(jwtResponse(cookies));
  if (!isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }else if(userDetail.Role!=RoleDetail.Admin)
  {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const cookieName = getClientCookieName();
  const data: any = await getApiUsers(cookies[cookieName]);
  const userRole: any = await getApiUserRole(cookies[cookieName]);
  const workspace: any = await getApiWorkspace(cookies[cookieName]);
  const board: any = await getApiBoard(cookies[cookieName]);
  return {
    props: { cookies, data, userRole, workspace, board },
  };
}

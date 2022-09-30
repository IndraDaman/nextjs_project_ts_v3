import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import {
  StatusCode,
  StatusCodeLabel,
  createBoard,
  usersDetail,
  usersDetailWithWorkspaceBoard,
} from "../../../helpers";
import {
  getCurrentDateTime,
  jwtResponse,
  loginAuthorization,
  loginUserDetail,
  unauthorizedAccess,
} from "../../../middleware";
import { ApiResponse, UserRes, BoardReq, BoardRes, UserWithAssignRes } from "../../../models";
type DataList = ApiResponse<UserWithAssignRes[]>;
type Data = ApiResponse<UserWithAssignRes>;
let loginUser: UserRes;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const authToken = req.headers.authorization;
  const { cookies } = req;
  const jwt = jwtResponse(cookies);
  if (!loginAuthorization(authToken)) {
    return res.status(StatusCode.Bad_request).json(unauthorizedAccess());
  }
  loginUser = loginUserDetail(authToken);
  switch (req.method as any) {
    case "GET":
      await get(req, res);
      break;
    case "POST":
      await post(req, res);
      break;
    case "PUT":
      put(req, res);
      break;
    case "DELETE":
      deleted(req, res);
      break;
    default:
      return res
        .status(StatusCode.Method_Not_Allowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}
async function get(req: NextApiRequest, res: NextApiResponse<DataList>) {
  const userList = await usersDetailWithWorkspaceBoard();
  if (userList && userList.length > 0) {
    const responseApi: DataList = {
      TransactionStatus: {
        IsSuccess: true,
        Error: {
          Code: StatusCode.OK,
          Type: StatusCodeLabel.get(StatusCode.OK),
          Description: "User List",
        },
      },
      Data: userList,
    };
    res.status(StatusCode.OK).json(responseApi);
  } else {
    const responseApi: DataList = {
      TransactionStatus: {
        IsSuccess: false,
        Error: {
          Code: StatusCode.Not_found,
          Type: StatusCodeLabel.get(StatusCode.Not_found),
          Description: "Data Not found.",
        },
      },
      Data: userList,
    };
    res.status(StatusCode.Not_found).json(responseApi);
  }
}
// async function post(req: NextApiRequest, res: NextApiResponse<Data>) {
//   const {
//     BoardTitle,
//     BackgroundId,
//     BackgroundName,
//     Visibility,
//     WorkspaceId,
//     WorkspaceName,
//     TemplateId,
//     TemplateName,
//   } = req.body;
//   if (!BoardTitle || BoardTitle == "") {
//     const responseApi: Data = {
//       TransactionStatus: {
//         IsSuccess: false,
//         Error: {
//           Code: StatusCode.Bad_request,
//           Type: StatusCodeLabel.get(StatusCode.Bad_request),
//           Description: "Board title is required.",
//         },
//       },
//       Data: null,
//     };
//     return res.status(StatusCode.Bad_request).json(responseApi);
//   }
//   let apiResponseData: BoardRes = {
//     id: "",
//     BoardTitle: BoardTitle ? BoardTitle : "",
//     BackgroundId: BackgroundId,
//     Visibility: Visibility,
//     WorkspaceId: WorkspaceId,
//     TemplateId: TemplateId,
//     UserId: loginUser.id,
//     CreatedOn: getCurrentDateTime(),
//     UpdatedOn: getCurrentDateTime(),
//   };

//   const apiData: BoardReq = {
//     BoardTitle: BoardTitle ? BoardTitle : "",
//     BackgroundId: BackgroundId,
//     Visibility: Visibility,
//     WorkspaceId: WorkspaceId,
//     TemplateId: TemplateId,
//     UserId: loginUser.id,
//     CreatedOn: getCurrentDateTime(),
//     UpdatedOn: getCurrentDateTime(),
//   };
//   const result = await createBoard(apiData);
//   if (result && result.id) {
//     apiResponseData.id = result.id;
//     const responseApi: ApiResponse<UserRes> = {
//       TransactionStatus: {
//         IsSuccess: true,
//         Error: {
//           Code: StatusCode.Created,
//           Type: StatusCodeLabel.get(StatusCode.Created),
//           Description: "Created Board!.",
//         },
//       },
//       Data: null,
//     };
//     res.status(StatusCode.Created).json(responseApi);
//   }
// }
function post(req: NextApiRequest, res: NextApiResponse<any>) {
  return res
    .status(StatusCode.Method_Not_Allowed)
    .end(`Method ${req.method} Not Allowed`);
}
function put(req: NextApiRequest, res: NextApiResponse<any>) {
    return res
      .status(StatusCode.Method_Not_Allowed)
      .end(`Method ${req.method} Not Allowed`);
  }
function deleted(req: NextApiRequest, res: NextApiResponse<any>) {
  return res
    .status(StatusCode.Method_Not_Allowed)
    .end(`Method ${req.method} Not Allowed`);
}

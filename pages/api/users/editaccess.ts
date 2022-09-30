import type { NextApiRequest, NextApiResponse } from "next";
import {
  getWorkspace,
  createWorkspace,
  StatusCode,
  StatusCodeLabel,
  editUsersAccess,
  addUserAssignBoard,
  addUserAssignWorkspace,
} from "../../../helpers";
import {
  getCurrentDateTime,
  jwtResponse,
  loginAuthorization,
  loginUserDetail,
  unauthorizedAccess,
} from "../../../middleware";
import {
  WorkspaceReq,
  WorkspaceRes,
  ApiResponse,
  UserRes,
} from "../../../models";
type DataList = ApiResponse<WorkspaceRes[]>;
type Data = ApiResponse<WorkspaceRes>;
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
    return res
    .status(StatusCode.Method_Not_Allowed)
    .end(`Method ${req.method} Not Allowed`);
}
async function post(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { UserId,RoleId, WorkspaceId, BoardId } =
    req.body;
  if (!UserId || UserId == "") {
    const responseApi: Data = {
      TransactionStatus: {
        IsSuccess: false,
        Error: {
          Code: StatusCode.Bad_request,
          Type: StatusCodeLabel.get(StatusCode.Bad_request),
          Description: "User Id  is required.",
        },
      },
      Data: null,
    };
    return res.status(StatusCode.Bad_request).json(responseApi);
  };
  try{
  const apiDataUserAccess: any = {
    id: UserId,
    RoleId: RoleId,
    UpdatedOn: getCurrentDateTime(),
  };
  const resultUserAccess = await editUsersAccess(apiDataUserAccess);

  const apiDataUserAssignWorkspace: any = {
    UserId: UserId,
    WorkspaceId: WorkspaceId,
    CreatedOn: getCurrentDateTime(),
  };
  const resultUserAssignWorkspace = await addUserAssignWorkspace(apiDataUserAssignWorkspace);

  const apiDataUserAssignBoard: any = {
    UserId: UserId,
    BoardId: BoardId,
    CreatedOn: getCurrentDateTime(),
  };
  const resultUserAssignBoard = await addUserAssignBoard(apiDataUserAssignBoard);
  
  const responseApi: any = {
    TransactionStatus: {
      IsSuccess: true,
      Error: {
        Code: StatusCode.OK,
        Type: StatusCodeLabel.get(StatusCode.OK),
        Description: "Updated user access!.",
      },
    },
    Data: {UserId,RoleId,WorkspaceId,BoardId},
  };
    res.status(StatusCode.Created).json(responseApi);
}
catch(error)
{
    console.log(error);
}
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

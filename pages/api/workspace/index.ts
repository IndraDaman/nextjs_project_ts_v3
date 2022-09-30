import type { NextApiRequest, NextApiResponse } from "next";
import {
  getWorkspace,
  createWorkspace,
  StatusCode,
  StatusCodeLabel,
} from "../../../helpers";
import {
  getCurrentDateTime,
  jwtResponse,
  loginAuthorization,
  loginUserDetail,
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
    return res.status(StatusCode.Bad_request).json({ name: "Invalid token" });
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
  const worspaceList = await getWorkspace();
  if (worspaceList && worspaceList.length > 0) {
    const responseApi: DataList = {
      TransactionStatus: {
        IsSuccess: true,
        Error: {
          Code: StatusCode.OK,
          Type: StatusCodeLabel.get(StatusCode.OK),
          Description: "Workspace List",
        },
      },
      Data: worspaceList,
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
      Data: worspaceList,
    };
    res.status(StatusCode.Not_found).json(responseApi);
  }
}
async function post(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { WorkspaceName, WorkspaceTypeId, description } =
    req.body;
  if (!WorkspaceName || WorkspaceName == "") {
    const responseApi: Data = {
      TransactionStatus: {
        IsSuccess: false,
        Error: {
          Code: StatusCode.Bad_request,
          Type: StatusCodeLabel.get(StatusCode.Bad_request),
          Description: "Workspace name is required.",
        },
      },
      Data: null,
    };
    return res.status(StatusCode.Bad_request).json(responseApi);
  }
  let apiResponseData: WorkspaceRes = {
    id: "",
    WorkspaceName: WorkspaceName ? WorkspaceName : "",
    WorkspaceTypeId: WorkspaceTypeId,
    description: description,
    UserId: loginUser.id,
    CreatedOn: getCurrentDateTime(),
    UpdatedOn: getCurrentDateTime(),
  };

  const apiData: WorkspaceReq = {
    WorkspaceName: WorkspaceName ? WorkspaceName : "",
    WorkspaceTypeId: WorkspaceTypeId,
    description: description,
    UserId: loginUser.id,
    CreatedOn: getCurrentDateTime(),
    UpdatedOn: getCurrentDateTime(),
  };
  const result = await createWorkspace(apiData);
  if (result && result.id) {
    apiResponseData.id = result.id;
    const responseApi: ApiResponse<WorkspaceRes> = {
      TransactionStatus: {
        IsSuccess: true,
        Error: {
          Code: StatusCode.Created,
          Type: StatusCodeLabel.get(StatusCode.Created),
          Description: "Created Workspace!.",
        },
      },
      Data: apiResponseData,
    };
    res.status(StatusCode.Created).json(responseApi);
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

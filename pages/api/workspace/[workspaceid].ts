import type { NextApiRequest, NextApiResponse } from "next";
import {
  getExistingWorkspace,
  editWorkspace,
  deleteWorkspace,
  StatusCode,
  StatusCodeLabel,
} from "../../../helpers";
import {
  getCurrentDateTime,
  jwtResponse,
  loginAuthorization,
  loginUserDetail,
} from "../../../middleware";
import { WorkspaceRes, ApiResponse, UserRes } from "../../../models";
type Data = ApiResponse<WorkspaceRes>;
let loginUser: UserRes;
let workspaceId: any;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  workspaceId = req.query.workspaceid;
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
      await put(req, res);
      break;
    case "DELETE":
      await deleted(req, res);
      break;
    default:
      return res
        .status(StatusCode.Method_Not_Allowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

async function get(req: NextApiRequest, res: NextApiResponse<Data>) {
  const objParam = {
    id: workspaceId,
  };

  const worspaceList = await getExistingWorkspace(objParam);
  if (worspaceList) {
    const responseApi: Data = {
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
    res.status(200).json(responseApi);
  } else {
    const responseApi: Data = {
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
    res.status(StatusCode.Bad_request).json(responseApi);
  }
}
async function post(req: NextApiRequest, res: NextApiResponse<Data>) {
  const objParam = {
    id: workspaceId,
  };
  const worspaceData = await getExistingWorkspace(objParam);
  const { WorkspaceTypeId, WorkspaceType, description } = req.body;
  if (!WorkspaceTypeId || WorkspaceTypeId == "") {
    const responseApi: Data = {
      TransactionStatus: {
        IsSuccess: false,
        Error: {
          Code: StatusCode.Bad_request,
          Type: StatusCodeLabel.get(StatusCode.Bad_request),
          Description: "Workspace Type is required.",
        },
      },
      Data: null,
    };
    return res.status(StatusCode.Bad_request).json(responseApi);
  }
  let apiResponseData: WorkspaceRes = {
    id: worspaceData?.id,
    WorkspaceName: worspaceData?.WorkspaceName
      ? worspaceData?.WorkspaceName
      : "",
    WorkspaceTypeId: WorkspaceTypeId,
    description: description,
    UserId: worspaceData?.UserId ? worspaceData?.UserId : "",
    CreatedOn: worspaceData?.CreatedOn ? worspaceData?.CreatedOn : "",
    UpdatedOn: getCurrentDateTime(),
  };
  const result = await editWorkspace(apiResponseData);
  const responseApi: ApiResponse<WorkspaceRes> = {
    TransactionStatus: {
      IsSuccess: true,
      Error: {
        Code: StatusCode.OK,
        Type: StatusCodeLabel.get(StatusCode.OK),
        Description: "Updated workspace!.",
      },
    },
    Data: apiResponseData,
  };
  res.status(StatusCode.OK).json(responseApi);
}
async function put(req: NextApiRequest, res: NextApiResponse<any>) {
  return res
    .status(StatusCode.Method_Not_Allowed)
    .end(`Method ${req.method} Not Allowed`);
}
async function deleted(req: NextApiRequest, res: NextApiResponse<any>) {
  const objParam = {
    id: workspaceId,
  };
  const worspaceData = await getExistingWorkspace(objParam);

  const result = await deleteWorkspace(worspaceData);
  const responseApi: ApiResponse<WorkspaceRes> = {
    TransactionStatus: {
      IsSuccess: true,
      Error: {
        Code: StatusCode.OK,
        Type: StatusCodeLabel.get(StatusCode.OK),
        Description: "Delete workspace!.",
      },
    },
    Data: worspaceData,
  };
  res.status(StatusCode.OK).json(responseApi);
}

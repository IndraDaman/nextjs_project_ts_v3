import type { NextApiRequest, NextApiResponse } from "next";
import {
  StatusCode,
  StatusCodeLabel,
  getExistingBoard,
  editBoard,
  deleteBoard,
} from "../../../helpers";
import {
  getCurrentDateTime,
  jwtResponse,
  loginAuthorization,
  loginUserDetail,
} from "../../../middleware";
import { ApiResponse, UserRes, BoardRes } from "../../../models";
type Data = ApiResponse<BoardRes>;
let loginUser: UserRes;
let boardId: any;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  boardId = req.query.boardid;
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
    id: boardId,
  };
  const boardList = await getExistingBoard(objParam);
  if (boardList) {
    const responseApi: Data = {
      TransactionStatus: {
        IsSuccess: true,
        Error: {
          Code: StatusCode.OK,
          Type: StatusCodeLabel.get(StatusCode.OK),
          Description: "Board List",
        },
      },
      Data: boardList,
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
      Data: boardList,
    };
    res.status(400).json(responseApi);
  }
}
async function post(req: NextApiRequest, res: NextApiResponse<Data>) {
  const objParam = {
    id: boardId,
  };
  const boardData = await getExistingBoard(objParam);
  const {
    BackgroundId,
    Visibility,
    WorkspaceId,
    TemplateId,
  } = req.body;
  if (!WorkspaceId || WorkspaceId == "") {
    const responseApi: Data = {
      TransactionStatus: {
        IsSuccess: false,
        Error: {
          Code: StatusCode.Bad_request,
          Type: StatusCodeLabel.get(StatusCode.Bad_request),
          Description: "Workspace is required.",
        },
      },
      Data: null,
    };
    return res.status(StatusCode.Bad_request).json(responseApi);
  }
  let apiResponseData: BoardRes = {
    id: boardData?.id,
    BoardTitle: boardData?.BoardTitle ? boardData.BoardTitle : "",
    BackgroundId: BackgroundId,
    Visibility: Visibility,
    WorkspaceId: WorkspaceId,
    TemplateId: TemplateId,
    UserId: loginUser.id,
    CreatedOn: boardData?.CreatedOn ? boardData.CreatedOn : "",
    UpdatedOn: getCurrentDateTime(),
  };
  const result = await editBoard(apiResponseData);
  const responseApi: ApiResponse<BoardRes> = {
    TransactionStatus: {
      IsSuccess: true,
      Error: {
        Code: StatusCode.OK,
        Type: StatusCodeLabel.get(StatusCode.OK),
        Description: "Updated board!.",
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
    id: boardId,
  };
  const boardData = await getExistingBoard(objParam);

  const result = await deleteBoard(boardData);
  const responseApi: ApiResponse<BoardRes> = {
    TransactionStatus: {
      IsSuccess: true,
      Error: {
        Code: StatusCode.OK,
        Type: StatusCodeLabel.get(StatusCode.OK),
        Description: "Delete board!.",
      },
    },
    Data: boardData,
  };
  res.status(StatusCode.OK).json(responseApi);
}

import type { NextApiRequest, NextApiResponse } from "next";
import { getBackground, StatusCode, StatusCodeLabel } from "../../../helpers";
import {
  jwtResponse,
  loginAuthorization,
  loginUserDetail,
} from "../../../middleware";
import { ApiResponse, UserRes, BackgroundRes } from "../../../models";
type DataList = ApiResponse<BackgroundRes[]>;
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
  const backgroundList = await getBackground();
  if (backgroundList) {
    const responseApi: DataList = {
      TransactionStatus: {
        IsSuccess: true,
        Error: {
          Code: StatusCode.OK,
          Type: StatusCodeLabel.get(StatusCode.OK),
          Description: "Template List",
        },
      },
      Data: backgroundList,
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
      Data: backgroundList,
    };
    res.status(StatusCode.Not_found).json(responseApi);
  }
}
async function post(req: NextApiRequest, res: NextApiResponse<any>) {
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

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { ApiResponse, UserRes } from "../../../models";
import { StatusCode } from "../../../helpers";

const CookieName=process.env.JWTCOOKIENAME?process.env.JWTCOOKIENAME:"";
type Data = ApiResponse<boolean>

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { cookies } = req;
  const jwt = cookies[CookieName];
  if (!jwt) {
    const responseApi:ApiResponse<boolean>={
      TransactionStatus:{
        IsSuccess:true,
        Error:{
          Code:422,
          Type:"",
          Description:"You are already logged out."
        }
      },
      Data:true
    }
    return res.status(StatusCode.OK).json(responseApi);
  } else {
    const serialised = serialize(CookieName, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    const responseApi:ApiResponse<boolean>={
      TransactionStatus:{
        IsSuccess:true,
        Error:{
          Code:422,
          Type:"",
          Description:"Successfuly logged out!"
        }
      },
      Data:true
    }
    res.setHeader("Set-Cookie", serialised);
    res.status(StatusCode.OK).json(responseApi);
  }
}

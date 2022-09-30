import type { NextApiRequest, NextApiResponse } from 'next'
import {existingUserDetail,StatusCode,StatusCodeLabel,verifyPassword } from "../../../helpers";
import {UserRes,ApiResponse, LoginResponse} from "../../../models"
import { sign,verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { loginUserDetail } from '../../../middleware';

var jwt = require('jsonwebtoken');
type Data = LoginResponse
const secret = process.env.SECRET?process.env.SECRET:"";
const CookieName=process.env.JWTCOOKIENAME?process.env.JWTCOOKIENAME:"";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //res.status(200).json({ name: 'John Doe' })

  if (req.method !== "POST") {
    return res
    .status(StatusCode.Method_Not_Allowed)
    .end(`Method ${req.method} Not Allowed`);
  }

  const data = req.body;

  let apiResponseData:UserRes
  const { userName,password } = data;
  apiResponseData= {
    id: "",
    FirstName: "",
    LastName: "",
    Email: userName?userName:"",
    Phone: "",
    Role:"",
    CreatedOn: "",
    UpdatedOn: "",
  }
   const existingUser = await existingUserDetail(apiResponseData);
  if (!existingUser) {
    const responseApi:LoginResponse={
      TransactionStatus:{
        IsSuccess:true,
        Error:{
          Code:StatusCode.Not_found,
          Type:StatusCodeLabel.get(StatusCode.Not_found),
          Description:"User not exist!"
        }
      },
      AccessToken:"",
      Data:null
    }
    res.status(StatusCode.Not_found).json(responseApi);
    return;
  }else{
    apiResponseData= {
        id: existingUser.id,
        FirstName: existingUser.FirstName,
        LastName: existingUser.LastName,
        Email: existingUser.Email,
        Phone: existingUser.Phone,
        Role:existingUser.Role,
        CreatedOn: existingUser.CreatedOn,
        UpdatedOn: existingUser.UpdatedOn,
      }
  }
  const IsVerify= await verifyPassword(password,existingUser.Password)
  
  if(IsVerify){
    if (existingUser.Role=="") {
      const responseApi:LoginResponse={
        TransactionStatus:{
          IsSuccess:false,
          Error:{
            Code:StatusCode.Partial_Information,
            Type:StatusCodeLabel.get(StatusCode.Partial_Information),
            Description:"User access permission is pending. Please contact admin!"
          }
        },
        AccessToken:"",
        Data:null
      }
      res.status(StatusCode.Not_found).json(responseApi);
      return;
    }else{
    var token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        apiResponseData,
      },
      secret
    );
  const responseApi:LoginResponse={
    TransactionStatus:{
      IsSuccess:true,
      Error:{
        Code:StatusCode.OK,
        Type:StatusCodeLabel.get(StatusCode.OK),
        Description:"User login successfully."
      }
    },
    AccessToken:token,
    Data:loginUserDetail(token)
  }
  const serialised = serialize(CookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialised);
  res.status(StatusCode.OK).json(responseApi);
}
}else{
  const responseApi:LoginResponse={
    TransactionStatus:{
      IsSuccess:false,
      Error:{
        Code:StatusCode.Not_found,
        Type:StatusCodeLabel.get(StatusCode.Not_found),
        Description:"Invalid username or password."
      }
    },
    AccessToken:"",
    Data:null
  }
  res.status(StatusCode.Not_found).json(responseApi);
}
}
import type { NextApiRequest, NextApiResponse } from 'next'
import {existingUserDetail, createUser,hashPassword, RoleDetail } from "../../../helpers";
import { getCurrentDateTime } from '../../../middleware';
import {UserReq,UserRes,ApiResponse} from "../../../models"
type Data = ApiResponse<UserRes>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //res.status(200).json({ name: 'John Doe' })

  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  let apiResponseData:UserRes
  const { firstName,lastName,email,phone,password } = data;
  apiResponseData= {
    id: "",
    FirstName: firstName?firstName:"",
    LastName: lastName?lastName:"",
    Email: email?email:"",
    Phone: phone?phone:"",
    Role:"",
    CreatedOn: getCurrentDateTime(),
    UpdatedOn: getCurrentDateTime(),
  }
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    const responseApi:ApiResponse<UserRes>={
      TransactionStatus:{
        IsSuccess:false,
        Error:{
          Code:422,
          Type:"",
          Description:"Invalid input - password should also be at least 7 characters long."
        }
      },
      Data:apiResponseData
    }
    res.status(422).json(responseApi);
    return;
  }
  const obj1={
    email: email
  };
   const existingUser = await existingUserDetail(apiResponseData);
  if (existingUser) {
    const responseApi:ApiResponse<UserRes>={
      TransactionStatus:{
        IsSuccess:false,
        Error:{
          Code:422,
          Type:"",
          Description:"User exists already!."
        }
      },
      Data:apiResponseData
    }
    res.status(422).json(responseApi);
    return;
  }
  const hashedPassword = await hashPassword(password);
  const apiData:UserReq={
    FirstName: firstName?firstName:"",
    LastName: lastName?lastName:"",
    Email: email?email:"",
    Phone: phone?phone:"",
    Password:hashedPassword,
    Role:"",
    CreatedOn: getCurrentDateTime(),
    UpdatedOn: getCurrentDateTime(),
  }
  const result = await createUser(apiData);
  if(result && result.id){
    apiResponseData.id=result.id;
  const responseApi:ApiResponse<UserRes>={
    TransactionStatus:{
      IsSuccess:true,
      Error:{
        Code:201,
        Type:"",
        Description:"Created user!."
      }
    },
    Data:apiResponseData
  }
  res.status(201).json(responseApi);
}else{
  const responseApi:ApiResponse<UserRes>={
    TransactionStatus:{
      IsSuccess:false,
      Error:{
        Code:422,
        Type:"",
        Description:"Failed to created user!."
      }
    },
    Data:apiResponseData
  }
  res.status(422).json(responseApi);
}
}
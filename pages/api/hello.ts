// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from "jwt-decode";
import { jwtResponse, loginAuthorization, loginUserDetail } from '../../middleware';
import { UserRes } from '../../models';
import { RoleDetail, StatusCode } from '../../helpers';
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const authToken=req.headers.authorization;
  const { cookies } = req;
  const jwt = jwtResponse(cookies);
  if (!loginAuthorization(authToken)) {
    return res.status(StatusCode.Bad_request).json({ name: "Invalid token" });
  }
const decoded:UserRes = loginUserDetail(jwt?jwt:"");
if(decoded.Role===RoleDetail.Admin){
  res.status(200).json({ name: 'Welcome to restricted area admin' })
}else{
  res.status(200).json({ name: 'Welcome to restricted area' })
}
}
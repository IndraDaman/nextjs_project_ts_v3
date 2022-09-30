import jwt_decode from "jwt-decode";
import { ApiResponse, UserRes } from "../models";
import { setCookie, getCookie, removeCookies } from "cookies-next";
import { verify } from "jsonwebtoken";
import { StatusCode, StatusCodeLabel } from "../helpers";

const clientCookieName = "OrdchidCremationsAccess";
const serverCookieName = process.env.JWTCOOKIENAME
  ? process.env.JWTCOOKIENAME
  : "";
export function loginUserDetail(authToken: any=null) {
  let jwt:any;
  if (authToken && authToken!=null) {
    if (authToken.indexOf(" ") > -1) {
      jwt = authToken.split(" ")[1];
    } else {
      jwt = authToken;
    }
  }
  const decoded: any = jwt_decode(jwt ? jwt : "");
  const data: UserRes = decoded.apiResponseData;
  return data;
}

export function loginAuthorization(authToken: any) {
  let result = null;
  const secret= process.env.SECRET?process.env.SECRET:"";
  let decode;
  // if (jwt && authToken) {
  //   if (authToken.indexOf(" ") > -1) {
  //     if (jwt === authToken.split(" ")[1]) {
  //       result = true;
  //     }
  //   } else {
  //     if (jwt === authToken) {
  //       result = true;
  //     }
  //   }
  // }
    if (authToken) {
    if (authToken.indexOf(" ") > -1) {
      decode = verify(authToken.split(" ")[1],secret,);
    } else {
      decode = verify(authToken,secret,);
    }
  }
  if(decode)
  {
    result=true;
  }
  return result;
}
export function jwtResponse(cookies: any) {
  const jwt = cookies[serverCookieName];
  return jwt;
}
export function createLoginCookie(AccessToken: any) {
  setCookie(clientCookieName, AccessToken, {
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}
export function setLocalUser(user:any){
  localStorage.setItem('user', JSON.stringify(user));
}
export function getLocalUser(){
  var item="{}";
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    item = localStorage.getItem('user')|| '{}';
  }
  return JSON.parse(item);
}
export function deleteLocalUser(){  
  const response = localStorage.removeItem('user')
}
export function clientLoginAuthorization() {
  let result = false;
  const loginCoockie = getCookie(clientCookieName);
  if (loginCoockie) {
    result = true;
  }
  return result;
}
export function clientJWT() {
  let result = null;
  const loginCoockie = getCookie(clientCookieName);
  if (loginCoockie) {
    result = loginCoockie;
  }
  return result;
}
export function clientLoginServerSideProps(cookies: any) {
  let result:boolean|null = false;
  const loginCoockie = cookies[clientCookieName];
  
  if (loginCoockie) {
    result = loginAuthorization(loginCoockie);
  }
  return result;
}
export function clientJWTServerSideProps(cookies: any) {
  let result = null;
  const loginCoockie = cookies[clientCookieName];
  if (loginCoockie) {
    result = loginCoockie;
  }
  return result;
}
async function logoutUser() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    body: JSON.stringify(""),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ApiResponse<boolean> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Description || "Something went wrong!"
    );
  }
  return data;
}
export async function clientLogout() {
  let resultLogout = false;
  try {
    const result: ApiResponse<boolean> = await logoutUser();
    if (result && result.TransactionStatus.IsSuccess == true) {
      removeCookies(clientCookieName);
      deleteLocalUser();
      resultLogout = result.TransactionStatus.IsSuccess;
    } else {
      alert(result.TransactionStatus.Error.Description);
    }
  } catch (error) {
    console.log(error);
  }
  return resultLogout;
}

export function  getCurrentDateTime()
{
  var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	var current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
  var date_time = current_date+" "+current_time;
  return date_time;
}

export function getClientCookieName()
{
  return clientCookieName;
}

export function unauthorizedAccess(){
  return{
    TransactionStatus:{
      IsSuccess:false,
      Error:{
        Code:StatusCode.Not_found,
        Type:StatusCodeLabel.get(StatusCode.Not_found),
        Description:"Unauthorized access"
      }
    },
    Data:null
  }
}


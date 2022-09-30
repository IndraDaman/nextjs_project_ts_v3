import internal from "stream";
import { UserRes } from "./users";

interface ApiResponse<T> {
 TransactionStatus:Transaction,
 Data:T|null
}
interface Transaction
{
    IsSuccess:boolean,
    Error:Error

}
interface Error{
    Code:number,
    Type:any,
    Description:string
}
interface LoginResponse {
    TransactionStatus:Transaction,
    AccessToken:string|null,
    Data:UserRes|null;
   }
export type { ApiResponse,Transaction,Error,LoginResponse };


interface UserReq {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Password: string;
    Role: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface UserRes {
    id: any;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Role: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface UserWithAssignRes {
    id: any;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    Role: string;
    RoleName:string;
    WorkspaceId:string;
    WorkspaceName:string;
    BoardId:string;
    BoardName:string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface UserRoleRes {
    id: any;
    RoleName: string;
    Description: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  export type{UserReq,UserRes,UserRoleRes,UserWithAssignRes}
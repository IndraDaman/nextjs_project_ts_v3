
interface WorkspaceReq {
    WorkspaceName: string;
    WorkspaceTypeId: string;
    description: string;
    UserId: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface WorkspaceRes {
    id: any;
    WorkspaceName: string;
    WorkspaceTypeId: string;
    description: string;
    UserId: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface WorkspaceTypeRes {
    id: any;
    WorkspaceType: string;
    Description: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  export type{WorkspaceReq,WorkspaceRes,WorkspaceTypeRes}
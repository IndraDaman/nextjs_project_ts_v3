
interface BoardReq {
    BoardTitle: string;
    BackgroundId: string;
    Visibility: string;
    WorkspaceId: string;
    TemplateId: string;
    UserId: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface BoardRes {
    id: any;
    BoardTitle: string;
    BackgroundId: string;
    Visibility: string;
    WorkspaceId: string;
    TemplateId: string;
    UserId: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface BackgroundRes {
    id: any;
    Background: string;
    BackgroundType: string;
    ImageUrl: string;
    Color: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  interface TemplateRes {
    id: any;
    Template: string;
    Templateype: string;
    ImageUrl: string;
    CreatedOn: string;
    UpdatedOn: string;
  }
  export type{BoardReq,BoardRes,BackgroundRes,TemplateRes}
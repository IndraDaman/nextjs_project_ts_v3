enum DatabaseCollection {
    UserDetail = "User",
    Role = "Role",
    WorkspaceType="WorkspaceType",
    Workspace='Workspace',
    Board='Board',
    Template='Template',
    Background='Background',
    UserAssignWorkspace='UserAssignWorkspace',
    UserAssignBoard='UserAssignBoard',
  }
  enum RoleDetail {
    SubperAdmin = "23CJ3dSVeFQ7dwZZNkx5",
    Admin = "zN5cioeqRR7lIr983Sjf",
    User="oiZcSeCnJ80nsicoOv7n",
  }
  enum StatusCode {
    OK=200,
    Created=201,
    Accepted =202,
    Partial_Information=203,
    No_Response=204,
    Moved= 301,
    Found= 302,
    Method= 303,
    Not_Modified= 304,
    Bad_request= 400,
    Unauthorized= 401,
    PaymentRequired= 402,
    Forbidden= 403,
    Not_found= 404,
    Method_Not_Allowed=405,
    Internal_Error= 500,
    Not_implemented= 501,
    Service_temporarily_overloaded= 502,
    Gateway_timeout= 503
  }
  
  const StatusCodeLabel = new Map<number, string>([
    [StatusCode.OK, 'OK'],
    [StatusCode.Created, 'Created'],
    [StatusCode.Accepted , 'Accepted'],
    [StatusCode.Partial_Information , 'Partial Information'],
    [StatusCode.No_Response , 'No Response'],
    [StatusCode.Moved,'Moved'],
    [StatusCode.Found,'Found'],
    [StatusCode.Method,'Method'],
    [StatusCode.Not_Modified,'Not Modified'],
    [StatusCode.Bad_request,'Bad Request'],
    [StatusCode.Unauthorized,'Unauthorized'],
    [StatusCode.PaymentRequired,'PaymentRequired'],
    [StatusCode.Forbidden,'Forbidden'],
    [StatusCode.Not_found,'Not found'],
    [StatusCode.Method_Not_Allowed,'Method Not Allowed'],
    [StatusCode.Internal_Error,'Internal Error'],
    [StatusCode.Not_implemented,'Not Implemented'],
    [StatusCode.Service_temporarily_overloaded,'Service Temporarily Overloaded'],
    [StatusCode.Gateway_timeout,'Gateway Timeout'],
  ]);
  enum RouterUrl {
    Default = "/",
    Dashboard="/home/dashboard",
    Login="/auth/login",
    SignUp='/auth/signup',
    ForgotPassword='/auth/forgotpassword',    
  }
  export {DatabaseCollection,StatusCode,StatusCodeLabel,RouterUrl,RoleDetail}
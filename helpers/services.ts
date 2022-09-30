import { clientJWT } from "../middleware";
import {
  ApiResponse,
  BackgroundRes,
  TemplateRes,
  UserRes,
  UserRoleRes,
  WorkspaceRes,
  WorkspaceTypeRes,
} from "../models";
import jwt_decode from "jwt-decode";

const base_Url = process.env.base_Url?process.env.base_Url:"";
function jwtUserDetail(authToken: any=null) {
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
async function getApiUsers(jwt: any = null) {
  if (jwt == null) {
    jwt = clientJWT();
  }
  const response = await fetch(base_Url + "/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });
  const data: ApiResponse<UserRes[]> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    // throw new Error(
    //   data.TransactionStatus.Error.Type || "Something went wrong!"
    // );
  }
  return data.Data;
}
async function getApiUserRole(jwt: any = null) {
  if (jwt == null) {
    jwt = clientJWT();
  }
  const response = await fetch(base_Url + "/api/users/roletype", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });
  const data: ApiResponse<UserRoleRes[]> = await response.json();
  console.log(data);
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data.Data;
}
async function editApiUsersAccess(
  UserId: any,
  RoleId: any,
  WorkspaceId: any,
  BoardId: any
) {
  const response = await fetch("/api/users/editaccess", {
    method: "POST",
    body: JSON.stringify({ UserId, RoleId, WorkspaceId,BoardId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientJWT(),
    },
  });
  const data: ApiResponse<WorkspaceRes> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data;
}
async function getApiWorkspaceType() {
  const response = await fetch("/api/workspace/workspacetype", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientJWT(),
    },
  });
  const data: ApiResponse<WorkspaceTypeRes[]> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data.Data;
}
async function getApiWorkspace(jwt: any = null) {
  if (jwt == null) {
    jwt = clientJWT();
  }
  const response = await fetch(base_Url + "/api/workspace", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });
  const data: ApiResponse<WorkspaceRes[]> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data;
}
async function addApiWorkspace(
  WorkspaceName: any,
  WorkspaceTypeId: any,
  description: any
) {
  const response = await fetch("/api/workspace", {
    method: "POST",
    body: JSON.stringify({ WorkspaceName, WorkspaceTypeId, description }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientJWT(),
    },
  });
  const data: ApiResponse<WorkspaceRes> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data;
}
// Section Board start
async function getApiBoard(jwt: any = null) {
  if (jwt == null) {
    jwt = clientJWT();
  }
  const response = await fetch(base_Url + "/api/board", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt,
    },
  });
  const data: ApiResponse<WorkspaceRes[]> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data;
}
async function addApiBoard(
  BoardTitle: any,
  BackgroundId: any,
  Visibility: any,
  WorkspaceId: any,
  TemplateId: any
) {
  console.log(
    JSON.stringify({
      BoardTitle,
      BackgroundId,
      Visibility,
      WorkspaceId,
      TemplateId,
    })
  );
  const response = await fetch("/api/board", {
    method: "POST",
    body: JSON.stringify({
      BoardTitle,
      BackgroundId,
      Visibility,
      WorkspaceId,
      TemplateId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientJWT(),
    },
  });
  const data: ApiResponse<WorkspaceRes> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data;
}
async function getApiBackground() {
  const response = await fetch("/api/board/background", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientJWT(),
    },
  });
  const data: ApiResponse<BackgroundRes[]> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data;
}
async function getApiTemplate() {
  const response = await fetch("/api/board/template", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + clientJWT(),
    },
  });
  const data: ApiResponse<TemplateRes[]> = await response.json();
  if (!data.TransactionStatus.IsSuccess) {
    throw new Error(
      data.TransactionStatus.Error.Type || "Something went wrong!"
    );
  }
  return data;
}
export {
  jwtUserDetail,
  getApiUsers,
  getApiUserRole,
  editApiUsersAccess,
  getApiWorkspaceType,
  addApiWorkspace,
  getApiWorkspace,
  getApiBoard,
  addApiBoard,
  getApiBackground,
  getApiTemplate,
};

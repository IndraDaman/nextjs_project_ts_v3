import { app, db } from "../firebase.Config";
import { UserReq, UserRes, UserWithAssignRes, WorkspaceRes } from "../models";
import { DatabaseCollection } from "./enum";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  documentId,
} from "firebase/firestore";
import { BackgroundRes, BoardRes, TemplateRes } from "../models/board";
import {
  getCollectionData,
  getCollectionDataList,
  getCollectionDataListWithSearch,
  getCollectionDataListWithSearchArray,
} from "./db-firebase-v2";
export {
  existingUserDetail,
  createUser,
  changePassword,
  usersDetail,
  usersDetailWithWorkspaceBoard,
  getUserRole,
  editUsersAccess,
  addUserAssignWorkspace,
  addUserAssignBoard,
  getWorkspaceType,
  getWorkspace,
  getExistingWorkspace,
  createWorkspace,
  editWorkspace,
  deleteWorkspace,
  getTemplate,
  getBackground,
  getBoard,
  getExistingBoard,
  createBoard,
  editBoard,
  deleteBoard,
};
//Userdetails db methods.
async function existingUserDetail(objParam: any) {
  const databaseRef = collection(db, DatabaseCollection.UserDetail);
  const result = await getDocs(databaseRef);
  const data = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });

  const existingUser: any[] = {
    ...data.filter((obj: any) => obj.Email == objParam.Email),
  };
  if (existingUser[0]) {
    return existingUser[0];
  } else {
    return null;
  }
}
async function createUser(obj: any) {
  const databaseRef = collection(db, DatabaseCollection.UserDetail);

  const result = await addDoc(databaseRef, obj);
  return result;
}
async function changePassword(objParam: any) {
  let fieldToEdit = doc(db, DatabaseCollection.UserDetail, objParam.id);
  const result = await updateDoc(fieldToEdit, {
    password: objParam.password,
  });

  return result;
}
async function usersDetail() {
  // const databaseRef = collection(db, DatabaseCollection.UserDetail);
  // const result = await getDocs(databaseRef);
  // const data = result.docs.map((data: any) => {
  //   const internaldata = data.data();
  //   internaldata.id = data.id;
  //   return internaldata;
  // });

  // if (data) {
  //   return data;
  // } else {
  //   return null;
  // }
  const result = await getCollectionDataListWithSearch(
    DatabaseCollection.UserDetail,
    "Email",
    "!=",
    "",
    "Email"
  );
  if (result) {
    return result;
  } else {
    return null;
  }
}

async function getUserRole() {
  const databaseRef = collection(db, DatabaseCollection.Role);
  const result = await getDocs(databaseRef);
  const data = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  if (data) {
    return data;
  } else {
    return null;
  }
}
async function editUsersAccess(obj: any) {
  let fieldToEdit = doc(db, DatabaseCollection.UserDetail, obj.id);
  const result = await updateDoc(fieldToEdit, {
    Role: obj.RoleId,
    UpdatedOn: obj.UpdatedOn,
  });
  return result;
}
async function addUserAssignWorkspace(obj: any) {
  const databaseRef = collection(db, DatabaseCollection.UserAssignWorkspace);

  const result = await addDoc(databaseRef, obj);
  return result;
}
async function addUserAssignBoard(obj: any) {
  const databaseRef = collection(db, DatabaseCollection.UserAssignBoard);

  const result = await addDoc(databaseRef, obj);
  return result;
}
//Workspace db methods.
async function getWorkspaceType() {
  const databaseRef = collection(db, DatabaseCollection.WorkspaceType);
  const result = await getDocs(databaseRef);
  const data = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  if (data) {
    return data;
  } else {
    return null;
  }
}
async function getWorkspace() {
  const databaseRef = collection(db, DatabaseCollection.Workspace);
  const result = await getDocs(databaseRef);
  const data: WorkspaceRes[] = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  if (data) {
    return data;
  } else {
    return null;
  }
}
async function getExistingWorkspace(objParam: any) {
  const databaseRef = collection(db, DatabaseCollection.Workspace);
  const result = await getDocs(databaseRef);
  const data: WorkspaceRes[] = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  const existingWorkspace: WorkspaceRes[] = {
    ...data.filter((obj: any) => obj.id == objParam.id),
  };
  if (existingWorkspace[0]) {
    return existingWorkspace[0];
  } else {
    return null;
  }
}
async function createWorkspace(obj: any) {
  const databaseRef = collection(db, DatabaseCollection.Workspace);

  const result = await addDoc(databaseRef, obj);
  return result;
}
async function editWorkspace(obj: any) {
  let fieldToEdit = doc(db, DatabaseCollection.Workspace, obj.id);
  const result = await updateDoc(fieldToEdit, {
    WorkspaceType: obj.WorkspaceType,
    WorkspaceTypeId: obj.WorkspaceTypeId,
    description: obj.description,
  });
  return result;
}

async function deleteWorkspace(params: any) {
  let fieldToDelete = doc(db, DatabaseCollection.Workspace, params.id);
  const result = await deleteDoc(fieldToDelete);
  return result;
}
//Template db methods.
async function getTemplate() {
  const databaseRef = collection(db, DatabaseCollection.Template);
  const result = await getDocs(databaseRef);
  const data: TemplateRes[] = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  if (data) {
    return data;
  } else {
    return null;
  }
}
//Background db methods.
async function getBackground() {
  const databaseRef = collection(db, DatabaseCollection.Background);
  const result = await getDocs(databaseRef);
  const data: BackgroundRes[] = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  if (data) {
    return data;
  } else {
    return null;
  }
}
//Board db methods.
async function getBoard() {
  const databaseRef = collection(db, DatabaseCollection.Board);
  const result = await getDocs(databaseRef);
  const data: BoardRes[] = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  if (data) {
    return data;
  } else {
    return null;
  }
}
async function getExistingBoard(objParam: any) {
  const databaseRef = collection(db, DatabaseCollection.Board);
  const result = await getDocs(databaseRef);
  const data: BoardRes[] = result.docs.map((data: any) => {
    const internaldata = data.data();
    internaldata.id = data.id;
    return internaldata;
  });
  const existingBoard: BoardRes[] = {
    ...data.filter((obj: any) => obj.id == objParam.id),
  };
  if (existingBoard[0]) {
    return existingBoard[0];
  } else {
    return null;
  }
}
async function createBoard(obj: any) {
  const databaseRef = collection(db, DatabaseCollection.Board);
  const result = await addDoc(databaseRef, obj);
  return result;
}
async function editBoard(obj: any) {
  let fieldToEdit = doc(db, DatabaseCollection.Board, obj.id);
  const result = await updateDoc(fieldToEdit, {
    BackgroundId: obj.BackgroundId,
    BackgroundName: obj.BackgroundName,
    Visibility: obj.Visibility,
    WorkspaceId: obj.WorkspaceId,
    WorkspaceName: obj.WorkspaceName,
    TemplateId: obj.TemplateId,
    TemplateName: obj.TemplateName,
    UpdatedOn: obj.UpdatedOn,
  });
  return result;
}

async function deleteBoard(params: any) {
  let fieldToDelete = doc(db, DatabaseCollection.Board, params.id);
  const result = await deleteDoc(fieldToDelete);
  return result;
}
async function usersDetailWithWorkspaceBoard() {
  const resultUser = await getCollectionDataListWithSearch(
    DatabaseCollection.UserDetail,
    "Email",
    "!=",
    "",
    "Email"
  );
  let arrUserId=resultUser.map((data: any)=>{
    const internaldata: any=data.id
    return internaldata
  });
  const resultUserRole = await getCollectionDataList(DatabaseCollection.Role);
  const resultUserAssignWorkspace = await getCollectionDataListWithSearchArray(
    DatabaseCollection.UserAssignWorkspace,
    "UserId",
    "in",
    arrUserId,
    "WorkspaceId"
  );
  let arrWorkspaceId=resultUserAssignWorkspace.map((data: any)=>{
    const internaldata: any=data.WorkspaceId
    return internaldata
  });

  const resultWorkspace = await getCollectionDataListWithSearchArray(
    DatabaseCollection.Workspace,
    documentId(),
    "in",
    arrWorkspaceId,
    documentId()
  );
  const resultUserAssignBoard = await getCollectionDataListWithSearchArray(
    DatabaseCollection.UserAssignBoard,
    "UserId",
    "in",
    arrUserId,
    "BoardId"
  );
  let arrBoardId=resultUserAssignBoard.map((data: any)=>{
    const internaldata: any=data.BoardId
    return internaldata
  });
  const resultBoard = await getCollectionDataListWithSearchArray(
    DatabaseCollection.Board,
    documentId(),
    "in",
    arrBoardId,
    documentId()
  );
  let data=resultUser.map((data: any)=>{
    let internaldata: UserWithAssignRes={
      id: data.id,
      FirstName: data.FirstName,
      LastName: data.LastName,
      Email: data.Email,
      Phone: data.Phone,
      Role: data.Role,
      RoleName: "",
      WorkspaceId: "",
      WorkspaceName: "",
      BoardId: "",
      BoardName: "",
      CreatedOn: data.CreatedOn,
      UpdatedOn: data.UpdatedOn
    };
    internaldata.RoleName = resultUserRole.find((userRole:any)=>userRole.id==data.Role).RoleName;
    internaldata.WorkspaceId = resultUserAssignWorkspace.find((uAW:any)=>uAW.UserId==data.id)?resultUserAssignWorkspace.find((uAW:any)=>uAW.UserId==data.id).WorkspaceId:"";
    internaldata.WorkspaceName = resultWorkspace.find((workspace:any)=>workspace.id==internaldata.WorkspaceId)?resultWorkspace.find((workspace:any)=>workspace.id==internaldata.WorkspaceId).WorkspaceName:"";
    internaldata.BoardId = resultUserAssignBoard.find((uAB:any)=>uAB.UserId==data.id)?resultUserAssignBoard.find((uAB:any)=>uAB.UserId==data.id).BoardId:"";
    internaldata.BoardName = resultBoard.find((board:any)=>board.id==internaldata.BoardId)?resultBoard.find((board:any)=>board.id==internaldata.BoardId).BoardTitle:"";
    return internaldata
  });
  if (data) {
    return data;
  } else {
    return null;
  }
}
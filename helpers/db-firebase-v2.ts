import { app, db } from "../firebase.Config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { DatabaseCollection } from "./enum";

export const getCollectionWithLimit = async <T>(
  collectionName: string,
  orderByElement: any,
  state: boolean,
  uidUser: string
) => {
  let datas: any[] = [];
  const docs = await getDocs(
    query(
      collection(db, collectionName),
      where("complete", "==", state),
      where("uidUser", "==", uidUser),
      orderBy(orderByElement),
      limit(10)
    )
  );
  docs.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    datas.push({
      id,
      ...data,
      createdAt: new Date(data?.createdAt?.seconds * 1000) || null,
      dueAt: new Date(data.dueAt?.seconds * 1000) || null,
      updatedAt: new Date(data?.updatedAt?.seconds * 1000) || null,
    });
  });
  return datas as T[];
};

export const getCollectionAt = async <T>(
  collectionName: string,
  orderByElement: any,
  lastElement: any,
  state: boolean,
  uidUser: string
) => {
  let datas: any[] = [];
  const lastDocSnap = await getDoc(doc(db, lastElement));
  const docs = await getDocs(
    query(
      collection(db, collectionName),
      where("complete", "==", state),
      where("uidUser", "==", uidUser),
      orderBy(orderByElement),
      limit(10),
      startAfter(lastDocSnap)
    )
  );

  docs.forEach((doc) => {
    const id = doc.id;
    const data = doc.data();
    datas.push({
      id,
      ...data,
      createdAt: new Date(data?.createdAt?.seconds * 1000) || null,
      dueAt: new Date(data.dueAt?.seconds * 1000) || null,
      updatedAt: new Date(data?.updatedAt?.seconds * 1000) || null,
    });
  });
  return datas as T[];
};

export const getDocument = async <T>(collectionName: string) => {
  const document = getDoc(doc(db, collectionName));
  return document.then((doc) => {
    const id = doc.id;
    const data = doc.data();

    return {
      id,
      ...data,
      createdAt: new Date(data?.createdAt?.seconds * 1000) || null,
      dueAt: new Date(data?.dueAt?.seconds * 1000) || null,
      updatedAt: new Date(data?.updatedAt?.seconds * 1000) || null,
    };
  });
};

// export const addDocument = async <T>(collectionName: string, data: T|any) => {
//     return await addDoc(collection(db, collectionName), data);
// }

// export const updateDocument = async <T>(collectionName: string, data: T|any) => {
//     return await updateDoc(doc(db, collectionName), {
//         ...data
//     })
// }
export async function getCollectionDataList(collectionName: string) {
  const databaseRef = collection(db, collectionName);
  const result = await getDocs(databaseRef);
  const data: any = result.docs.map((data: any) => {
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
export async function getCollectionDataListWithSearch(
  collectionName: string,
  searchName: string,
  searchFiltrOpt: WhereFilterOp,
  searchValue: string,
  orderByElement: any
) {
  try {
    const databaseRef = collection(db, collectionName);
    const docQuery = query(
      databaseRef,
      where(searchName, searchFiltrOpt, searchValue),
      orderBy(orderByElement)
    );
    const result = await getDocs(docQuery);
    const data: any = result.docs.map((data: any) => {
      const internaldata = data.data();
      internaldata.id = data.id;
      return internaldata;
    });
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getCollectionDataListWithSearchArray(
    collectionName: string,
    searchName: any,
    searchFiltrOpt: WhereFilterOp,
    searchValue: any[],
    orderByElement: any
  ) {
    try {
      const databaseRef = collection(db, collectionName);
      const docQuery = query(
        databaseRef,
        where(searchName, searchFiltrOpt, searchValue),
        orderBy(orderByElement)
      );
      const result = await getDocs(docQuery);
      const data: any = result.docs.map((data: any) => {
        const internaldata = data.data();
        internaldata.id = data.id;
        return internaldata;
      });
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
export async function getCollectionData(collectionName: string, id: string) {
  const databaseRef = doc(db, collectionName, id);
  const result = await getDoc(databaseRef);
  let data= {...result.data()};
  data.id = result.id;
  if (data) {
    return data;
  } else {
    return null;
  }
}

export async function addDocument(collectionName: string, data: any) {
  return await addDoc(collection(db, collectionName), data);
}

export async function updateDocument(collectionName: string, data: any) {
  let docRef = doc(db, "books", data.id);
  return await updateDoc(docRef, {
    ...data,
  });
}

export async function deleteDocument(collectionName: string, data: any) {
  let docRef = doc(db, "books", data.id);
  return await deleteDoc(docRef);
}

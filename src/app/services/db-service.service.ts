import {
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  collection,
  query,
} from '@firebase/firestore';
import {
  Firestore,
  docData,
  collectionData,
  QueryConstraint,
} from '@angular/fire/firestore';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  constructor(private readonly firestore: Firestore) {}

  async find<T>(coll: string, key: QueryConstraint) {
    const collectionReference = collection(this.firestore, coll);
    return await getDocs(query(collectionReference, key));
  }

  async get<T>(collection: string, id: string) {
    const documentReference = doc(this.firestore, `${collection}/${id}`);
    return (await getDoc(documentReference)).data() as T;
  }

  create<T>(collection: string, item: T) {
    const documentReference = doc(
      this.firestore,
      `${collection}/${(item as any).id}`
    );
    return setDoc(documentReference, item);
  }

  update<T>(collection: string, item: T) {
    const documentReference = doc(
      this.firestore,
      `${collection}/${(item as any).id}`
    );
    return updateDoc(documentReference, { ...item });
  }

  delete(collection: string, id: string) {
    const documentReference = doc(this.firestore, `${collection}/${id}`);
    return deleteDoc(documentReference);
  }
}
import {
  CollectionReference,
  DocumentData,
  setDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) {
    this.usersCollection = collection(this.firestore, 'Users');
  }

  getAll() {
    return collectionData(this.usersCollection, {
      idField: 'uuid',
    }) as Observable<User[]>;
  }

  get(id: string) {
    const userDocumentReference = doc(this.firestore, `Users/${id}`);
    return docData(userDocumentReference, { idField: 'uuid' });
  }

  create(user: User) {
    const userDocumentReference = doc(this.firestore, `Users/${user.uuid}`);
    return setDoc(userDocumentReference, user);
  }

  update(user: User) {
    const userDocumentReference = doc(
      this.firestore,
      `user/${user.uuid}`
    );
    return updateDoc(userDocumentReference, { ...user });
  }

  delete(id: string) {
    const userDocumentReference = doc(this.firestore, `Users/${id}`);
    return deleteDoc(userDocumentReference);
  }
}

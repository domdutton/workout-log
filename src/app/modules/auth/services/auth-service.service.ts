import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { DBService } from 'src/app/services/db-service.service';
import {
  LoginData,
  RegisterData,
} from 'src/app/interfaces/auth-data.interface';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private dbService: DBService) {}

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async register({ email, username, password }: RegisterData): Promise<void> {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    this.dbService.create<User>("Users", {
      id: user.user.uid,
      username: username,
      plans: [],
      posts: [],
    });
  }

  logout() {
    return signOut(this.auth);
  }
}

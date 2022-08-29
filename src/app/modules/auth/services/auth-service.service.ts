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
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private dbService: DBService) {}

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUser(id: string) {
    return this.dbService.get("Users", id);
  }

  async register({ email, username, password }: RegisterData): Promise<void> {
    const user = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    this.dbService.create<User>('Users', {
      id: user.user.uid,
      username: username,
      pfpUrl: `https://www.gravatar.com/avatar/${Md5.hashStr(email)}?d=https://avatars.dicebear.com/api/avataaars/${username}.png`,
      plans: [],
      posts: [],
    });
  }

  logout() {
    return signOut(this.auth);
  }
}

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { Injectable } from '@angular/core';
import { UserService } from 'src/app/services/db-service.service';
import { LoginData, RegisterData } from 'src/app/interfaces/auth-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private userService: UserService
  ) {}

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, username, password }: RegisterData) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(user => {
      this.userService.create({ 
        uuid: user.user.uid,
        username: username,
        plans: [],
        posts: []
      });
    });
  }

  logout() {
    return signOut(this.auth);
  }
}
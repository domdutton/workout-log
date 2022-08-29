import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { User } from './interfaces/user.interface';
import { AuthService } from './modules/auth/services/auth-service.service';
import { DBService } from './services/db-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fitpal';
  currentYear: number = new Date().getFullYear();
  pfpUrl: string;

  constructor(private router: Router, private auth: Auth, private authService: AuthService, private dbService: DBService) { }

  async ngOnInit(): Promise<void> {
    //FIXME: This is completly broken...
    var email: string = this.auth.currentUser ? this.auth.currentUser.email! : "null";
    var username: string = this.auth.currentUser ? (await this.dbService.get<User>("Users", this.auth.currentUser?.uid!)).id : "john.doe";
    this.pfpUrl = 
      `https://www.gravatar.com/avatar/${Md5.hashStr(email)}?d=https://avatars.dicebear.com/api/avataaars/${username}.png`;
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((e) => console.log(e.message));
  }
}

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
  showLogout: boolean = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private authService: AuthService,
    private dbService: DBService
  ) {}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((state) => {
      if(state != null) this.showLogout = true;
      else this.showLogout = false;
    })
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((e) => console.log(e.message));
  }
}

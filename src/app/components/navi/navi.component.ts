import { UserService } from './../../services/user.service';
import { UserForLocalStorage } from './../../models/userForLocalStorage';
import { LocalStorageService } from './../../services/local-storage.service';
import {  NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  user:UserForLocalStorage;
  isAuthenticated: boolean;
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
    this.router.events.subscribe((s) => {
      if (s instanceof NavigationEnd) {
        this.refresh();
      }
    });
  }

  refresh() {
    this.isAuthenticated = this.showButton();
    console.log("is auth ? = "+this.isAuthenticated);
    if (this.isAuthenticated) {
      this.user = this.localStorage.get<UserForLocalStorage>("user")

    }
  }
  showButton() {
    if (!this.authService.isAuthenticated()) {
      return false;
    } else {
      return true;
    }
  }

  logOut(){
    this.localStorage.remove("token")
    this.localStorage.remove("user")
    this.router.navigate(["/carDetails"])
    this.isAuthenticated = false;
  }
}

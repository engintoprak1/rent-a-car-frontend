import { AuthService } from './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { LocalStorageService } from './../../services/local-storage.service';
import { ProfileEditComponent } from './../profile-edit/profile-edit.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:User
  isAuthenticated : boolean
  constructor(private modalService:NgbModal, private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.getUser();
    }
  }

  getUser(){
    this.userService.getDetails().subscribe(response=>{
        this.user = response.data;
    })
  }



  showEditModal(){
    const profileEditModal = this.modalService.open(ProfileEditComponent)
    profileEditModal.componentInstance.user = this.user;
    profileEditModal.componentInstance.reloadPage.subscribe(()=>{
      this.getUser();
    })
  }
}

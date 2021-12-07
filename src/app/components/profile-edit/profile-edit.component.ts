import { Router } from '@angular/router';
import { LocalStorageService } from './../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../services/user.service';
import { User } from 'src/app/models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @Input() public user:User
  @Output() reloadPage : EventEmitter<any> = new EventEmitter<any>();
  userUpdateForm : FormGroup
  constructor(private toastrService:ToastrService, private formBuilder:FormBuilder,private userService:UserService, private modalService:NgbModal,private localStorage:LocalStorageService,private router:Router) { }

  ngOnInit(): void {
    this.createUserEditForm();
  }

  createUserEditForm(){
    this.userUpdateForm = this.formBuilder.group({
      id:[this.user.id,Validators.required],
      firstName:[this.user.firstName,Validators.required],
      lastName:[this.user.lastName,Validators.required],
      email:[this.user.email,Validators.required],
      mobilePhone:[this.user.mobilePhone,Validators.required],
      address:[this.user.address,Validators.required]
    })
  }

  update(){
    console.log(this.userUpdateForm.value)
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({},this.userUpdateForm.value)
      this.userService.update(userModel).subscribe(response=>{
        this.toastrService.success(userModel.firstName,response.message)
        this.closeUserUpdateModal();
        this.reloadPage.emit();
        this.localStorage.set("user",{firstName:userModel.firstName,lastName:userModel.lastName});
        this.router.navigate(['/'],{skipLocationChange:true}).then(()=>{
          this.router.navigate(['/profile'])
        })
      },responseError=>{
        if (responseError.error.ValidationErrors && responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }else{
          this.toastrService.error(responseError.error.message,"Bilgiler Güncellenemedi")
        }
      })
    }else{
      this.toastrService.error("Eksik ya da hatalı","Dikkat");
      this.userUpdateForm.reset();
    }
  }

  closeUserUpdateModal(){
    this.modalService.dismissAll();
  }


}

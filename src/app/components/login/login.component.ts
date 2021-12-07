import { UserForLocalStorage } from './../../models/userForLocalStorage';
import { LocalStorageService } from './../../services/local-storage.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private router:Router, private localStorage:LocalStorageService, private formBuilder:FormBuilder,private toastrService:ToastrService,private authService:AuthService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email : ["",Validators.required],
      password : ["",Validators.required]
    })
  }

  login(){
    console.log(this.loginForm.value)
    let loginModel = Object.assign({},this.loginForm.value)

    this.authService.login(loginModel).subscribe(response=>{
      this.toastrService.info(response.message)
      this.localStorage.set("token",response.data.accessToken.token)
      this.localStorage.set("user",{firstName:response.data.firstName,lastName:response.data.lastName});
      this.router.navigate(["/carDetails"]);
    },responseError=>{
      this.toastrService.error(responseError.error)
    })
  }

}

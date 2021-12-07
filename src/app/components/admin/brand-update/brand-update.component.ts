import { ToastrService } from 'ngx-toastr';
import { BrandService } from './../../../services/brand.service';
import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand } from 'src/app/models/brand';


@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm:FormGroup
  @Input() public brand:Brand;
  @Output() reloadPage : EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private toastrService:ToastrService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      id:[this.brand.id,Validators.required],
      brandName:[this.brand.brandName,[Validators.required,Validators.minLength(2)]]
    })
  }


  update(){
    if (this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value)
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success(brandModel.brandName, response.message)
        this.closeBrandModal();
        this.reloadPage.emit();
      },responseError=>{
        console.log(responseError)
        if(responseError.error.ValidationErrors && responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }else{
          this.toastrService.error(responseError.error.message,"Marka Güncellenemedi")
        }
      })
    }else{
      this.toastrService.error("Eksik ya da hatalı","Dikkat");
      this.brandUpdateForm.reset();
    }

  }


  closeBrandModal(){
    this.modalService.dismissAll();
  }

}

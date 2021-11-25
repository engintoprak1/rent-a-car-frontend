import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup
  @Output() reloadPage : EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder, private brandService:BrandService, private toastrService:ToastrService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm =  this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  closeBrandModal(){
    this.modalService.dismissAll();
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(response=>{
        this.toastrService.success(brandModel.brandName, "Marka eklendi");
        this.closeBrandModal();
        this.reloadPage.emit();
      },responseError=>{
        if(responseError.error.ValidationErrors && responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage, "Doğrulama Hatası")
          }
        }else{
          this.toastrService.error(responseError.error.message,"Marka eklenemedi")
        }
      })
    }
    else{
      this.toastrService.error("Eksik ya da hatalı","Dikkat")
      this.brandAddForm.reset();
    }

  }




}

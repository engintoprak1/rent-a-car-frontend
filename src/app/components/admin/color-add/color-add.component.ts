import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm: FormGroup
  @Output() reloadPage : EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",[Validators.required]],
    })
  }

  closeColorAddModal(){
    this.modalService.dismissAll();
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModal = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModal).subscribe(response=>{
        this.toastrService.success(colorModal.colorName, "Renk Eklendi")
        this.closeColorAddModal();
        this.reloadPage.emit();
      },responseError=>{
        if(responseError.error.ValidationErrors && responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }else{
          this.toastrService.error(responseError.error.message,"Renk Eklenemedi")
        }
      })
    }else{
      this.toastrService.error("Eksik ya da hatalı", "Dikkat")
      this.colorAddForm.reset();
    }
  }

}

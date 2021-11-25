import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { ColorService } from 'src/app/services/color.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  colorUpdateForm: FormGroup
  @Input() private color : Color
  @Output() reloadPage : EventEmitter<any> = new EventEmitter<any>();
  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private modalService:NgbModal, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      id:[this.color.id,Validators.required],
      colorName:[this.color.colorName,Validators.required]
    })
  }

  update(){
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({},this.colorUpdateForm.value)
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success(colorModel.colorName,response.message)
        this.closeColorUpdateModal();
        this.reloadPage.emit();
      },responseError=>{
        if (responseError.error.ValidationErrors && responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i])
          }
        }else{
          this.toastrService.error(responseError.error.message,"Renk Güncellenemedi")
        }
      })
    }else{
      this.toastrService.error("Eksik ya da hatalı","Dikkat")
      this.colorUpdateForm.reset();
    }
  }

  closeColorUpdateModal(){
    this.modalService.dismissAll();
  }

}

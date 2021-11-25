import { Brand } from './../../../models/brand';
import { CarForList } from 'src/app/models/carForList';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { Color } from 'src/app/models/color';
import { currencyDollar } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm : FormGroup
  @Input() public car:CarForList
  @Input() public brands:Brand[]
  @Input() public colors:Color[]
  base64textString: string[] = [];
  @ViewChild('fileInput', {static: true}) inputElement: ElementRef;
  @Output() reloadPage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private carService:CarService, private toastrService:ToastrService, private modalService:NgbModal,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.createUpdateForm();
  }

  createUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      id:[this.car.id,Validators.required],
      brandId:[0,Validators.required],
      modelName:[this.car.modelName,Validators.required],
      colorId:[0,Validators.required],
      description:[this.car.description,Validators.required],
      dailyPrice:[this.car.dailyPrice,Validators.required],
      modelYear:[this.car.modelYear,Validators.required],
      images:[""]
    })
  }

  closeCarUpdateModal(){
    this.modalService.dismissAll();
  }

  async update() {
    this.base64textString = [];
    for (let i = 0; i < this.inputElement.nativeElement.files.length; i++) {
      let file = this.inputElement.nativeElement.files[i];
      await this.getBase64(file).then((result) =>
        this.base64textString.push(result.toString())
      );
    }
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign(
        {},
        { ...this.carUpdateForm.value, images: this.base64textString }
      );
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.closeCarUpdateModal();
          this.reloadPage.emit();
        },
        (responseError) => {
          if (
            responseError.error.ValidationErrors &&
            responseError.error.ValidationErrors.length > 0
          ) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          } else {
            this.toastrService.error(
              responseError.error.message,
              'Araç Güncellenemedi'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Eksik ya da Hatalı', 'Dikkat');
      this.carUpdateForm.reset();
    }
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(file);
    });
  }
}

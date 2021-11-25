
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  base64textString: string[] = [];
  @Input() public brands:Brand[];
  @Input() public colors:Color[];
  @ViewChild('fileInput', { static: true }) inputElement: ElementRef;
  @Output() reloadPage: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: [0, Validators.required],
      modelName: ['', Validators.required],
      colorId: [0, Validators.required],
      description: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      images: [''],
    });
  }

  closeCarModal() {
    this.modalService.dismissAll();
  }

  async add() {
    this.base64textString = [];
    for (let i = 0; i < this.inputElement.nativeElement.files.length; i++) {
      let file = this.inputElement.nativeElement.files[i];
      await this.getBase64(file).then((result) =>
        this.base64textString.push(result.toString())
      );
    }
    if (this.carAddForm.valid) {
      let carModel = Object.assign(
        {},
        { ...this.carAddForm.value, images: this.base64textString }
      );
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.closeCarModal();
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
              'Araç Eklenemedi'
            );
          }
        }
      );
    } else {
      this.toastrService.error('Eksik ya da Hatalı', 'Dikkat');
      this.carAddForm.reset();
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

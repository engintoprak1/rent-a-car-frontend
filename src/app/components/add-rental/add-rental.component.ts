import { CreditCardService } from './../../services/credit-card.service';
import { AddForCreditCard } from './../../models/addForCreditCard';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditCard } from './../../models/creditCard';
import { PaymentService } from './../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { CarForDetail } from 'src/app/models/carForDetail';
import { AddForRental } from './../../models/addForRental';
import { RentalService } from 'src/app/services/rental.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.css'],
})
export class AddRentalComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private modalService:NgbModal,
    private formBuilder:FormBuilder,
    private creditCardService:CreditCardService,
  ) {}
  addForRental: AddForRental;
  minStartDate: Date = new Date();
  minEndDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  diff: number = 0;
  carForDetail: CarForDetail;
  creditCard: CreditCard;
  addForCreditCard:AddForCreditCard;
  money: number = 0;
  cardNumber: string;
  paymentPage: boolean = false;
  creditCardForm:FormGroup;
  isCardExist:boolean = true;
  checkBox:boolean=false;
  creditCards:AddForCreditCard[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!params['carId']) {
        this.router.navigateByUrl('/carDetails');
        return;
      }
      this.checkIfCarExists(params['carId']);
    });
    this.createCreditCardForm();
  }

  getCards(){
    this.creditCardService.getCards().subscribe(response=>{
      this.creditCards = response.data;
      if (response.data.length == 0) {
        this.isCardExist=false
        console.log(this.isCardExist)
      }else{
        this.isCardExist=true
      }
    })
  }

  createCreditCardForm(){
    this.creditCardForm = this.formBuilder.group({
      nameOnTheCard:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cvv:["",Validators.required],
    })
  }

  checkBoxTicked(event:any){
    this.checkBox = event.target.checked;
    console.log(event)
  }

  checkIfCarExists(id: number) {
    this.carService.getCarDetailById(id).subscribe(
      (s) => {
        if (!s.success) this.router.navigateByUrl('');
        this.carForDetail = s.data;
      },
      (e) => {
        this.router.navigateByUrl('');
        this.toastrService.error(e.message, 'HATA');
      }
    );
  }

  setMinEndDate() {
    this.minEndDate = this.startDate;
  }

  calculateDiff() {
    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);
    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    this.diff = Math.ceil(diff / (1000 * 3600 * 24));
    this.money = this.diff * this.carForDetail.dailyPrice;
  }

  rentCar() {
    let newRental: AddForRental = {
      carId: this.carForDetail.id,
      rentDays: this.diff,
      cardNumber: this.cardNumber,
      totalPrice: this.money,
    };
    this.rentalService.addRental(newRental).subscribe(
      (s) => {
        this.toastrService.success(s.message, 'Başarılı');
        this.router.navigateByUrl('/cars/carDetail/' + this.carForDetail.id);
        this.payMessage();
      },
      (e) => {
        this.toastrService.error(e.error.message, 'HATA!');
      }
    );
      this.modalService.dismissAll();
  }

  saveCreditCard(){
    if (this.creditCardForm.valid) {
      let newModel = Object.assign({},this.creditCardForm.value);
      this.creditCardService.save(newModel).subscribe(response=>{
        console.log(response)
      })
    }
    this.rentCar();
  }


  goToPayment() {
    this.paymentPage = true;
    this.getCards();
    console.log(this.isCardExist)
  }



  goToBack() {
    this.paymentPage = false;
  }

  payMessage() {
    this.paymentService.pay(this.creditCardForm.value).subscribe((p) => {
      this.toastrService.success(p.message, 'Başarılı');
    });
  }

  saveModal(content:any) {
    this.modalService.open(content);

  }

  closeSaveModal(){
    this.modalService.dismissAll();
  }


}

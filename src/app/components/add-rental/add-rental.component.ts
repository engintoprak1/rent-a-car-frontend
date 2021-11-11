import { CreditCard } from './../../models/creditCard';
import { PaymentService } from './../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { CarForDetail } from 'src/app/models/carForDetail';
import { AddForRental } from './../../models/addForRental';
import { RentalService } from 'src/app/services/rental.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { creditCard } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-add-rental',
  templateUrl: './add-rental.component.html',
  styleUrls: ['./add-rental.component.css']
})
export class AddRentalComponent implements OnInit {

  constructor(private rentalService:RentalService,private carService:CarService,private activatedRoute:ActivatedRoute,private router:Router,private toastrService:ToastrService, private paymentService:PaymentService) { }
  addForRental:AddForRental;
  minStartDate:Date=new Date();
  minEndDate:Date=new Date();
  startDate:Date=new Date();
  endDate:Date=new Date();
  diff:number=0;
  carForDetail:CarForDetail;
  creditCard:CreditCard= {nameOnTheCard:"casdcascdsa",cardNumber:"casdcascd",expirationDate:new Date(),cvv:123};
  money:number=0;
  cardNumber:string;
  paymentPage:boolean=false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!params['carId']) {
            this.router.navigateByUrl('/carDetails');
            return;
      }
      this.checkIfCarExists(params['carId']);
    });

  }

  checkIfCarExists(id:number){
       this.carService.getCarDetailById(id).subscribe(s=>{
          if(!s.success)
            this.router.navigateByUrl('');
          this.carForDetail = s.data;
       },e=>{
           this.router.navigateByUrl('');
           this.toastrService.error(e.message,'HATA')
       });
  }


  setMinEndDate(){
      this.minEndDate = this.startDate;
  }

  calculateDiff(){
    let startDate = new Date(this.startDate);
    let endDate = new Date(this.endDate);
    let diff = Math.abs(endDate.getTime() - startDate.getTime());
    this.diff = Math.ceil(diff / (1000 * 3600 * 24));
    this.money = this.diff * this.carForDetail.dailyPrice;
  }

  rentCar(){
    let newRental:AddForRental = {carId:this.carForDetail.id,rentDays:this.diff,cartNumber:this.cardNumber,totalPrice:this.money};
    console.log(this.carForDetail)
    this.rentalService.addRental(newRental).subscribe(s=>{
      this.toastrService.success(s.message,'Başarılı');
      this.router.navigateByUrl('/cars/carDetail/'+this.carForDetail.id);
      this.payMessage()
    },
    e=>{
      this.toastrService.error(e.error.message,'HATA!');
    })

   }

   goToPayment(){
     this.paymentPage=true;
   }

   goToBack(){
    this.paymentPage=false;
   }

   payMessage(){
     this.paymentService.pay(this.creditCard).subscribe(p=>{
      this.toastrService.success(p.message,"Başarılı");
     })

   }

}

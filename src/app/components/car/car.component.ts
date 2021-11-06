import { Car } from 'src/app/models/car';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carDetails: CarDetail[] = [];


  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrandId(params['brandId']);
      }else if(params['colorId']){
        this.getCarsByColorId(params['colorId'])
      }
      else {
        this.getCarDetails();
      }
    });
  }


  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      console.log(this.carDetails);
    });
  }

  getCarsByBrandId(id: number) {
    this.carService.getCarDetailsByBrandId(id).subscribe((response) => {
      this.carDetails = response.data;
      console.log(this.carDetails);
    });
  }

  getCarsByColorId(colorId: number) {
    this.carService.getCarDetailsByColorId(colorId).subscribe((response) => {
      this.carDetails = response.data;
      console.log(this.carDetails);
    });
  }


}

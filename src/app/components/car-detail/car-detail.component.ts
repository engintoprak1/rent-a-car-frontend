import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarForDetailModel } from 'src/app/models/carForDetailModel';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carForDetail: CarForDetailModel;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailById(params['carId']);
      }
    });
  }

  getCarDetailById(id: number) {
    this.carService.getCarDetailById(id).subscribe((response) => {
      this.carForDetail = response.data;
      console.log(this.carForDetail)
    });
  }
}

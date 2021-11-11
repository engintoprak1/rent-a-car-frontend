import { CarForList } from './../../models/carForList';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarForDetail } from 'src/app/models/carForDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carForDetail: CarForDetail;
  carForList:CarForList;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 1000,
    navText: ['<i class="bi bi-arrow-left-short"></i>', '<i class="bi bi-arrow-right-short"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
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
      console.log(this.carForDetail.brandName)
    });
  }
}



import { CarForList } from './../../models/carForList';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cars:CarForList[];
  constructor(private carService:CarService) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots:false,
    navSpeed: 300,
    autoplay:true,
    autoplaySpeed:1000,
    autoplayTimeout:3000,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carService.getCarDetails().subscribe(response=>{
      this.cars = response.data
      console.log(this.cars)
    })
  }

}

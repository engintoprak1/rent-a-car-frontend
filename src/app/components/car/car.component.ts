import { BrandService } from './../../services/brand.service';
import { Brand } from './../../models/brand';
import { CartService } from './../../services/cart.service';
import { Car } from 'src/app/models/car';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarForList } from 'src/app/models/carForList';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carsForList: CarForList[] = [];
  brands: Brand[];
  colors: Color[];
  rental:Rental[];
  filterText = '';
  brandId: number = 0;
  colorId: number = 0;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService,
    private brandService: BrandService,
    private colorService: ColorService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId']);
      } else {
        this.getCarDetails();
      }
    });
    this.getBrands();
    this.getColors();
    this.getRentals();
  }

  filter() {
    this.getCarsByBrandAndColorId(this.brandId, this.colorId);
  }


  addToCart(car: CarForList) {


      this.toastrService.success(
        'Kiralama sepetine eklendi',
        car.brandName + ' ' + car.modelName)

      this.cartService.addToCart(car);

  }



  getCars() {
    this.carService.getAllCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carsForList = response.data;
    });
  }


  getCarDetailsByBrandId(id: number) {
    this.carService.getCarDetailsByBrandId(id).subscribe((response) => {
      this.carsForList = response.data;
    });
  }

  getCarDetailsByColorId(colorId: number) {
    this.carService.getCarDetailsByColorId(colorId).subscribe((response) => {
      this.carsForList = response.data;
    });
  }

  getCarsByBrandAndColorId(brandId: number, colorId: number) {
    if (brandId == 0 && colorId == 0) {
      this.getCarDetails();
      return;
    }
    if (brandId == 0) {
      this.getCarDetailsByColorId(colorId);
      return;
    }
    if (colorId == 0) {
      this.getCarDetailsByBrandId(brandId);
      return;
    }
    this.carService
      .getCarDetailsByBrandAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.carsForList = response.data;
      });
  }

  getRentals(){
    this.rentalService.getRentals().subscribe(response=>{
      this.rental = response.data;
    })
  }
}

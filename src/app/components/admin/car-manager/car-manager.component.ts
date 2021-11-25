import { Color } from './../../../models/color';
import { ColorService } from './../../../services/color.service';
import { Brand } from './../../../models/brand';
import { BrandService } from './../../../services/brand.service';
import { CarUpdateComponent } from './../car-update/car-update.component';
import { CarDeleteComponent } from './../car-delete/car-delete.component';
import { CarForList } from './../../../models/carForList';
import { CarAddComponent } from './../car-add/car-add.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.css']
})
export class CarManagerComponent implements OnInit {
  cars:CarForList[]
  brands:Brand[]
  colors:Color[]
  constructor(private carService:CarService, private modalService:NgbModal,private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.getCars();
    this.getBrands();
    this.getColors();
  }

  getCars(){
    this.carService.getCarDetails().subscribe(response=>{
      this.cars = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  showCarAddModal(){
    const carAddModal = this.modalService.open(CarAddComponent)
    carAddModal.componentInstance.brands = this.brands;
    carAddModal.componentInstance.colors = this.colors;
    carAddModal.componentInstance.reloadPage.subscribe(()=>{
      this.getCars();
      this.getBrands();
      this.getColors();
    })
  }

  showCarDeleteModal(car:CarForList){
    const carDeleteModal = this.modalService.open(CarDeleteComponent)
    carDeleteModal.componentInstance.car = car;
    carDeleteModal.componentInstance.reloadPage.subscribe(()=>{
      this.getCars();
    })
  }

  showCarUpdateModal(car:CarForList){
    const carAddModal = this.modalService.open(CarUpdateComponent)
    carAddModal.componentInstance.car = car;
    carAddModal.componentInstance.brands = this.brands;
    carAddModal.componentInstance.colors = this.colors;
    carAddModal.componentInstance.reloadPage.subscribe(() =>{
      this.getCars();
      this.getBrands();
      this.getColors();
    })
  }

}

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarForList } from 'src/app/models/carForList';
import { CarService } from 'src/app/services/car.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css']
})
export class CarDeleteComponent implements OnInit {
  @Input() public car:CarForList;
  @Output() reloadPage:EventEmitter<any> = new EventEmitter<any>();

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute,private toastrService:ToastrService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarById(params['id']);
      }
    });
  }

  getCarById(id:number){
    this.carService.getCarById(id).subscribe(response=>{
      this.car = response.data;
    })
  }

  closeCarDeleteModal(){
    this.modalService.dismissAll();
  }

  delete(){
    this.carService.delete(this.car.id).subscribe(response=>{
      this.toastrService.success(this.car.brandName + " " +this.car.modelName, response.message)
      this.closeCarDeleteModal();
      this.reloadPage.emit();
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Silme Başarısız")
    })
  }

}

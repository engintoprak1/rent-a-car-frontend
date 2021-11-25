import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Brand } from 'src/app/models/brand';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css']
})
export class BrandDeleteComponent implements OnInit {
  @Input() public brand:Brand;
  @Output() reloadPage: EventEmitter<any> = new EventEmitter<any>();
  constructor(private brandService:BrandService, private toastrService:ToastrService, private modalService:NgbModal,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getBrandById(params['id']);
      }
    });
  }

  getBrandById(id:number){
    this.brandService.getBrandById(id).subscribe(response=>{
      this.brand= response.data;
    })
  }


  delete(){
    this.brandService.delete(this.brand.id).subscribe(response=>{
      this.toastrService.success(this.brand.brandName,response.message)
      this.closeBrandDeleteModal();
      this.reloadPage.emit();
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Silme başarısız")
    })
  }

  closeBrandDeleteModal(){
    this.modalService.dismissAll();
  }



}

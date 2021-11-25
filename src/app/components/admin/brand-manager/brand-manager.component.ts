import { BrandUpdateComponent } from '../brand-update/brand-update.component';
import { ActivatedRoute } from '@angular/router';
import { BrandDeleteComponent } from '../brand-delete/brand-delete.component';
import { BrandService } from 'src/app/services/brand.service';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandAddComponent } from '../brand-add/brand-add.component';

@Component({
  selector: 'app-brand-manager',
  templateUrl: './brand-manager.component.html',
  styleUrls: ['./brand-manager.component.css'],
})
export class BrandManagerComponent implements OnInit {
  brands: Brand[];
  constructor(
    private brandService: BrandService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  showBrandAddModal() {
    const brandAddModal = this.modalService.open(BrandAddComponent);
    brandAddModal.componentInstance.reloadPage.subscribe(() => {
      this.getBrands();
    });
  }

  showBrandUpdateModal(brand: Brand) {
    const brandUpdateModal = this.modalService.open(BrandUpdateComponent);
    brandUpdateModal.componentInstance.brand = brand;
    brandUpdateModal.componentInstance.reloadPage.subscribe(()=>{
      this.getBrands();
    })
  }

  showBrandDeleteModal(brand: Brand) {
    const brandDeleteModal = this.modalService.open(BrandDeleteComponent);
    brandDeleteModal.componentInstance.brand = brand;
    brandDeleteModal.componentInstance.reloadPage.subscribe(() =>{
      this.getBrands();
    })
  }
}

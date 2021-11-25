import { ColorUpdateComponent } from './../color-update/color-update.component';
import { ColorDeleteComponent } from './../color-delete/color-delete.component';
import { ColorAddComponent } from './../color-add/color-add.component';
import { ColorService } from 'src/app/services/color.service';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.css']
})
export class ColorManagerComponent implements OnInit {
  colors:Color[];
  constructor(private colorService:ColorService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }

  showColorAddModal(){
    const colorAddModal = this.modalService.open(ColorAddComponent);
    colorAddModal.componentInstance.reloadPage.subscribe(()=>{
      this.getColors();
    })
  }

  showColorDeleteModal(color:Color){
    const colorDeleteModal = this.modalService.open(ColorDeleteComponent);
    colorDeleteModal.componentInstance.color = color;
    colorDeleteModal.componentInstance.reloadPage.subscribe(()=>{
      this.getColors();
    })
  }

  showColorUpdateModal(color:Color){
    const colorUpdateModal = this.modalService.open(ColorUpdateComponent);
    colorUpdateModal.componentInstance.color = color;
    colorUpdateModal.componentInstance.reloadPage.subscribe(()=>{
      this.getColors();
    })

  }

}

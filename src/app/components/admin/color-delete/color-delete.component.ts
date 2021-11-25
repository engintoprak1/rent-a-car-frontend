import { Color } from 'src/app/models/color';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css']
})
export class ColorDeleteComponent implements OnInit {
  @Input() public color :Color
  @Output() reloadPage : EventEmitter<any> = new EventEmitter<any>();
  constructor(private colorService:ColorService,private toastrService:ToastrService, private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  getColorById(id:number){
    this.colorService.getColorById(id).subscribe(response=>{
      this.color = response.data
    });
  }

  delete(){
    this.colorService.delete(this.color.id).subscribe(response=>{
      this.toastrService.success(this.color.colorName , response.message)
      this.closeColorDeleteModal();
      this.reloadPage.emit();
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Silme başarısız")
    })
  }

  closeColorDeleteModal(){
    this.modalService.dismissAll();
  }

}

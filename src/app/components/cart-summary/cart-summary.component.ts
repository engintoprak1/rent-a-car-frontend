import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CarForList } from 'src/app/models/carForList';
import { CartItems } from 'src/app/models/cartItems';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[]=[];

  constructor(private cartService:CartService,private toastService:ToastrService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeFromCart(car:CarForList){
    this.cartService.removeFromCart(car);
    this.toastService.error(car.brandName + " " + car.modelName + " sepetten silindi.","Silindi");
  }


}

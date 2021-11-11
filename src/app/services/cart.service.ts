import { CartItems } from './../models/cartItems';
import { CarForList } from 'src/app/models/carForList';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(car:CarForList){
    let item:CartItem = CartItems.find(c=>c.car.id===car.id);
    if (item) {
      item.quantity+=1;
    }else{
      let cartItem = new CartItem();
      cartItem.car=car;
      cartItem.quantity = 1;
      CartItems.push(cartItem);
    }
  }


  removeFromCart(car:CarForList){
    let item:CartItem = CartItems.find(c=>c.car.id===car.id);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  list():CartItem[]{
    return CartItems;
  }
}

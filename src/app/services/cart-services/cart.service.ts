import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartMap = new Map();

  pushToCart(item:{name:string,price:number,count:number}){
    if(item.count==0){
      this.cartMap.delete(item.name);
    }
    else{
      this.cartMap.set(item.name,item);  
    }
  }
  removeCartItem(name:string){

  }
  getCart(){
    return this.cartMap
  }
  clearCart(){

  }

}

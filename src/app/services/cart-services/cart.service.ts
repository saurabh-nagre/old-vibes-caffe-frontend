import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private cartMap = new Map();

  private name:string = ""
  private number:number = 0
  
  pushToCart(item:{name:string,price:number,count:number}){
    if(item.count==0 || item.count==undefined || item.count==null){
      this.cartMap.delete(item.name);
    }
    else{
      this.cartMap.set(item.name,item);  
    }
  }
  removeItem(str:string){
    if(this.cartMap.has(str)){
      this.cartMap.delete(str);
    }
  }

  getCount(str:string){
    if(this.cartMap.has(str)){
      return this.cartMap.get(str).count;
    }
    return 0;
  }
  getCart(){
    return this.cartMap
  }
  clearCart(){
    this.cartMap.clear();
    if(this.cartMap.size){
      return false;
    }
    else return true;
  }

  saveClient(clientName:string,clientNumber:number){
    this.name = clientName;
    this.number = clientNumber;
  }

  clearClient(){
    this.name = ""
    this.number = 0
  }
  getClient(){
    return {name:this.name,number:this.number};
  }


}

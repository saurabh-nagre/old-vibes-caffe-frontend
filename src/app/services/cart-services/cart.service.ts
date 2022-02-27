import { Injectable } from '@angular/core';
import { Observable, subscribeOn } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private tableArray:Array<Map<string,{name:string,price:number,count:number}>> = []

  private name:string = ""
  private number:number = 0

  removeLastTable(){
    if(this.tableArray.length>1)
      this.tableArray.pop();
  }
  addTable(){
    this.tableArray.push(new Map());
  }

  getTotalTables(){
    if(this.tableArray.length==0)
      this.addTable();
    return this.tableArray.length;
  }


  
  pushToCart(tableno:number,item:{name:string,price:number,count:number}){

    if(item.count==0 || item.count==undefined || item.count==null){
      this.tableArray[tableno].delete(item.name);
    }
    else{
      this.tableArray[tableno].set(item.name,item);  
    }
  }
  removeItem(tableno:number,str:string){
    if(this.tableArray[tableno].has(str)){
      this.tableArray[tableno].delete(str);
    }
  }

  getCount(tableno:number,str:string){
    if(this.tableArray[tableno].has(str)){
      console.log("mycount: "+this.tableArray[tableno].get(str)?.count);
      return this.tableArray[tableno].get(str)?.count;
    }
    else return 0;
  }
  getCart(tableno:number){
    return this.tableArray[tableno];
  }
  clearCart(tableno:number,){
    this.tableArray[tableno].clear();
    if(this.tableArray[tableno].size){
      return false;
    }
    else return true;
  }
  // client information for print
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

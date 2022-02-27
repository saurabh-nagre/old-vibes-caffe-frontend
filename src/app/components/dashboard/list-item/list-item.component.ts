import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { setDoc ,doc, getDoc, deleteDoc} from 'firebase/firestore';
import { CartService } from 'src/app/services/cart-services/cart.service';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})

export class ListItemComponent implements OnInit {

  @Input() item = {name:'',price: 0,id:'',category:''};
  @Input() isEditable:boolean = false;
  @Input() 
  public set tableno(no :number){
    this.mytableNo = no
    this.getCount();
      //you can also call functions from here
      //it's a setter method
      //it is call when there is input changes
  } 
  @Output() deleteItemEvent = new EventEmitter<string>();
  mytableNo = 0
  myitemName = this.item.name
  myitemCount = 0
  myitemPrice = this.item.price
  isChecked = false
  path:any
  db:any
  constructor(private firestoreservice:FirestoreappsService,
    private cartService:CartService,private router:Router) {
      
   }    
  
  ngOnInit(): void {
  }

  getCount(){
    const temp = this.cartService.getCount(this.mytableNo,this.item.name);
    this.myitemCount = 0;
    this.isChecked = false;
    if(temp)
      this.myitemCount = temp; 
    if(this.myitemCount>0){
      this.isChecked = true;
    }
  }

  makeChecked(){
    this.isChecked = !this.isChecked;
    this.myitemName = this.item.name
    this.myitemPrice = this.item.price

    if(!this.isChecked){
      this.myitemCount = 0;
      this.cartService.removeItem(this.mytableNo,this.item.name);
    }
  }
  
  async deleteItem(){
    let shouldDelete = confirm("Do you want to delete "+this.item.name+"?");
    if(shouldDelete){
     this.path = "FoodCategories/categories/"+this.item.category+"/"+this.item.id;
     this.db = this.firestoreservice.getDatabase();
        await deleteDoc(doc(this.db,this.path.toString())).then(()=>{
          this.deleteItemEvent.emit(this.item.id);
        });
    }
  }

  changeCount(){
    //function to add this item into cart
    this.cartService.pushToCart(this.mytableNo,{name:this.item.name,price:this.item.price,count:this.myitemCount});
  }

  async saveChange(){
    const myconfirmation = confirm("Do you want to change '"+this.item.name+"' to '"+ this.myitemName+"' from price "+this.item.price
    +" to "+this.myitemPrice+" ?"+ "Note: We need to reload the page to display changes,So save your work before changes!");
    this.path = "FoodCategories/categories/"+this.item.category+"/"+this.item.id;
    this.db = this.firestoreservice.getDatabase();
      if(myconfirmation){        
          await setDoc(doc(this.db,this.path.toString()),{
              name : this.myitemName,
              price:this.myitemPrice,
              category:this.item.category,
            }).then(()=>{
              this.makeChecked();
              this.router.navigate(['/dashboard/discount']).then((value)=>{
                if(value){
                  this.router.navigate(['/dashboard/menu']);
                }
                else{
                  alert("Can't reload the page! But your changes has been saved!");
                }
              },()=>{
                alert("Can't reload the page! But your changes has been saved!");
              });
          })
          const docref = await getDoc(doc(this.db,this.path))
          if(docref.exists()){
            this.item.name = docref.get('name');
            this.item.price = docref.get('price');
          }             
      }
  }
}

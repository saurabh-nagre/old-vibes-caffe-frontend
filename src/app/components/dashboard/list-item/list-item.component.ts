import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { collection,setDoc ,doc, getFirestore, getDoc} from 'firebase/firestore';
import { FirestoreappsService } from 'src/app/services/firestoreapps.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})

export class ListItemComponent implements OnInit {

  @Input() item = {name:'',price: 0,id:'',category:''};
  @Input() isEditable:boolean = false;
  
  myitemName = this.item.name
  myitemCount = 0
  myitemPrice = this.item.price
  myisEditable = false
  isChecked = false
  constructor(private firestoreservice:FirestoreappsService) {
   }
  
  ngOnInit(): void {
  }

  makeChecked(){
    this.isChecked = !this.isChecked;
    if(this.isEditable && this.isChecked){
        this.myisEditable = true
        this.myitemName = this.item.name
        this.myitemPrice = this.item.price
    }
    else{
      this.myisEditable  = false
    }
  }

  async saveChange(){
    const myconfirmation = confirm("Do you want to change '"+this.item.name+"' to '"+ this.myitemName+"' from price "+this.item.price
    +" to "+this.myitemPrice+" ?");
    const db = this.firestoreservice.getDatabase();
    const path = "FoodCategories/categories/"+this.item.category+"/"+this.item.id;
      if(myconfirmation){
          await setDoc(doc(db,path.toString()),{
              name : this.myitemName,
              price:this.myitemPrice,
              category:this.item.category,
            }).then(()=>{
             
             this.makeChecked();
          })
          
          const docref = await getDoc(doc(db,path))
          if(docref.exists()){
            this.item.name = docref.get('name');
            this.item.price = docref.get('price');
          }
                    
      }
    
  }
}

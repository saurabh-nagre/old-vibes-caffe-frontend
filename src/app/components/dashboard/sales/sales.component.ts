import { Component, OnInit } from '@angular/core';
import { FirestoreUploadService } from 'src/app/services/sales/firestore-upload.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  todaysDate!:string
  searchDate!:Date
  billArray:any
  report={revenue:0,costumerCount:0}
  hide = true
  constructor(private firestoreService:FirestoreUploadService) { }

  ngOnInit(): void {
  }

  startSearch(){
    this.hide = true;
    const date = new Date(this.searchDate);

    if(this.searchDate){
      this.firestoreService.getBills(date.getDate(),date.getMonth(),date.getFullYear()).then((value)=>{
        this.billArray = value;
        if(this.billArray.length>1){
          this.report = this.billArray.pop();
          this.hide = false;
        }
      })
    }
    else
      alert('Please select date before submit');
  }
}

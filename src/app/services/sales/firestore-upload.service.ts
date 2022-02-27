import { Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, getFirestore, query, runTransaction, setDoc } from 'firebase/firestore';
import { LoginService } from '../auth-services/login.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUploadService {

  private app:any
  private db:any
  constructor(private login:LoginService) {
    this.app = this.login.getFirebaseApp();
    this.db = getFirestore(this.app)
  }

  async uploadBill(bill:any):Promise<boolean>{
    const date = new Date(bill['timestamp']);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const path = 'sales/yearly/'+year+'/months/'+month+'/days/'+day;
    let id :any
    try{
      await addDoc(collection(this.db,path),bill)
      .then((value)=>{
        id = value.id;
      },(error)=>{
        id = 0
        throw "can't add bill doc";
      });
      
      await addDoc(collection(this.db,'customers'),
      {
        name:bill['name'],
        number:bill['number']
      }).then((value)=>{
      },(error)=>{
        throw "can't add customer doc";
      });
      
      await runTransaction(this.db,async (transaction) => {
        var dailyData: any
        const docref = doc(this.db,'sales/yearly/'+year+'/months/'+month+'/days/'+day+'/report');
        const document = await transaction.get(docref);
        if(document.exists()){
          dailyData = document.data();
          dailyData.revenue +=bill['totalPay'];
          dailyData.costumerCount +=1
        }
        else{
          dailyData = {
            revenue:bill['totalPay'],
            costumerCount:1
          }
        }
        transaction.set(docref,dailyData);
      })
      
      await runTransaction(this.db,async (transaction) => {
        var monthlyData: any
        const docref = doc(this.db,'sales/yearly/'+year+'/months/'+month+'/report');
        const document = await transaction.get(docref);
        if(document.exists()){
          monthlyData = document.data();
          monthlyData.revenue +=bill['totalPay'];
          monthlyData.costumerCount +=1
        }
        else{
          monthlyData = {
            revenue:bill['totalPay'],
            costumerCount:1
          }
        }
        transaction.set(docref,monthlyData);
      })

      await runTransaction(this.db,async (transaction) => {
        var yearlyData: any
        const docref = doc(this.db,'sales/yearly/'+year+'/report');
        const document = await transaction.get(docref);
        if(document.exists()){
          yearlyData = document.data();
          yearlyData.revenue +=bill['totalPay'];
          yearlyData.costumerCount +=1
        }
        else{
          yearlyData = {
            revenue:bill['totalPay'],
            costumerCount:1
          }
        }
        transaction.set(docref,yearlyData);
      })
      return true
    }
    catch(err){
      return false;
    }
      
  }
  async getBillNo(day:number,month:number,year:number){
    var billNo = 0;
    const docref = doc(this.db,'sales/yearly/'+year+'/months/'+month+'/days/'+day+'/report');
    const document =await getDoc(docref);
    if(document.exists()){
      return billNo = document.data()['costumerCount']+1;
    }
    else{
      return 1;
    }
  }
  async getDailyRevenue(day:number,month:number,year:number){
    var revenue: any
    const docref = doc(this.db,'sales/yearly/'+year+'/months/'+month+'/days/'+day+'/report');
    const document =await getDoc(docref);
    if(document.exists()){
      revenue = document.data()['revenue'];
    }
    else{
      revenue = 0
    }
    return revenue;
  }
  async getMonthlyRevenue(month:number,year:number){
    var revenue: any
    const docref = doc(this.db,'sales/yearly/'+year+'/months/'+month+'/report');
    const document =await getDoc(docref);
    if(document.exists()){
      revenue = document.data()['revenue'];
    }
    else{
      revenue = 0
    }
    return revenue;
  }
  async getYearlyRevenue(year:number){
    var revenue: any
    const docref = doc(this.db,'sales/yearly/'+year+'/report');
    const document =await getDoc(docref);
    if(document.exists()){
      revenue = document.data()['revenue'];
    }
    else{
      revenue = 0
    }
    return revenue;
  }

  async getBills(day:number,month:number,year:number){
    const q = query(collection(this.db,'sales/yearly/'+year+'/months/'+month+'/days/'+day));

    const querySnapshot = getDocs(q);
    var billArray: DocumentData[] = [];
    var report:any
    (await querySnapshot).forEach((doc)=>{
      if(doc.id!='report'){
        billArray.push(doc.data());
      }
      else{
        report = doc.data();
      }
    })
    if(billArray.length>0){
      billArray.push(report);
    }
    return billArray;
  }
}

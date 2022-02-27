import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { LoginService } from 'src/app/services/auth-services/login.service';
import { CartService } from 'src/app/services/cart-services/cart.service';
import { FirestoreUploadService } from 'src/app/services/sales/firestore-upload.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser!:User

  dailyRevenue = 0
  monthlyRevenue = 0
  yearlyRevenue = 0
  constructor(private router:Router,
    private loginService:LoginService,
    private billService:FirestoreUploadService) {
    // const querypara = this.router.getCurrentNavigation()?.extras.queryParams
      this.currentUser = this.loginService.getUser()
      if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthDate = date.getDate();
    this.billService.getDailyRevenue(monthDate,month,year).then((data)=>{
      this.dailyRevenue = data;
    });
    this.billService.getMonthlyRevenue(month,year).then((data)=>{
      this.monthlyRevenue = data
    });
    this.billService.getYearlyRevenue(year).then((value)=>{
      this.yearlyRevenue = value
    });
  }


}

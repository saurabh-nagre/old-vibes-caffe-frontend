import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import * as menuitems from './menu';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser!:User
  categories = menuitems.menucategories;
  breadomelette = menuitems.breadomelette;
  pizzapasta = menuitems.pizzapasta;
  burgerfries = menuitems.burgerfries;
  teacoffeemocktails = menuitems.teacoffeemocktails;
  smoothiesdesserts = menuitems.smoothiesdesserts; 
  
  constructor(private router:Router) {
      const querypara = this.router.getCurrentNavigation()?.extras.queryParams
      if(querypara){
        this.currentUser = querypara['currentUser']
      }

      if(!this.currentUser){
        this.router.navigate(['/login']);
      }
  }
  
  ngOnInit(): void {  
    

  }

}

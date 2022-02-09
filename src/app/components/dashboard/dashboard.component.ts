import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { LoginService } from 'src/app/services/auth-services/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser!:User

  constructor(private router:Router,
    private loginService:LoginService) {
    // const querypara = this.router.getCurrentNavigation()?.extras.queryParams
      this.currentUser = this.loginService.getUser()
      if(!this.currentUser){
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
  }

}

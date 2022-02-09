import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './components/customer/display/display.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailsComponent } from './components/dashboard/details/details.component';
import { DiscountsComponent } from './components/dashboard/discounts/discounts.component';
import { MenuComponent } from './components/dashboard/menu/menu.component';
import { SalesComponent } from './components/dashboard/sales/sales.component';
import { LoginComponent } from './components/login/login.component';
import { PrintComponent } from './components/print/print/print.component';

const routes: Routes = [
    {path:'',component:DisplayComponent},
    {path:'login',component:LoginComponent},
    {path:'dashboard',component:DashboardComponent,children:[
      {path:'',component:MenuComponent},
      {path:'menu',component:MenuComponent},
      {path:'discounts',component:DiscountsComponent},
      {path:'sales',component:SalesComponent},
      {path:'details',component:DetailsComponent}
    ]},
    {path:'print',component:PrintComponent},
    {path:'**',redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

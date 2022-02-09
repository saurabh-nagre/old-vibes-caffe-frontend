import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListItemComponent } from './components/dashboard/list-item/list-item.component';
import { FirestoreappsService } from './services/firestoreapps.service';
import { PrintComponent } from './components/print/print/print.component';
import {  NgxPrintModule } from 'ngx-print';
import { DisplayComponent } from './components/customer/display/display.component';
import { MenuComponent } from './components/dashboard/menu/menu.component';
import { DiscountsComponent } from './components/dashboard/discounts/discounts.component';
import { SalesComponent } from './components/dashboard/sales/sales.component';
import { DetailsComponent } from './components/dashboard/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ListItemComponent,
    PrintComponent,
    DisplayComponent,
    MenuComponent,
    DiscountsComponent,
    SalesComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  providers: [FirestoreappsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

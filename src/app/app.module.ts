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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ListItemComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FirestoreappsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
//Importer la classe HttpClientModule
import {HttpClientModule} from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AppRoutingModule } from './app-routing.module';
import { CoupetextPipe } from './pipes/coupetext.pipe';
import { RatingsComponent } from './shared/ratings/ratings.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    CoupetextPipe,
    RatingsComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule, AppRoutingModule
     
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

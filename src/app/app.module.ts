import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { Header1Component } from './header1/header1.component';
import { Header2Component } from './header2/header2.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { OurClintComponent } from './our-clint/our-clint.component';
import { SliderComponent } from './slider/slider.component';
import { HomepageMainContentComponent } from './homepage-main-content/homepage-main-content.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductListingComponent } from './product/product-listing/product-listing.component';
import { DetailsComponent } from './product/details/details.component';
import { ProductTemplateComponent } from './product/product-template/product-template.component';
import { ProductRightSideComponent } from './product/product-right-side/product-right-side.component';

import {CookieService} from 'ngx-cookie-service';
import {FormControl,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CartComponent } from './product/cart/cart.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component'

import {RouterExtServiceService} from './router-ext-service.service';
//import {LoginRegisterServiceService} from './login-register-service.service';
import {LoginRegisterServiceService} from './login-register-service.service';
import {CatService} from './cat.service';
import {Interceptor} from './Interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    Header1Component,
    Header2Component,
    FooterComponent,
    SideMenuComponent,
    OurClintComponent,
    SliderComponent,
    HomepageMainContentComponent,
    HomeComponent,
    ProductListingComponent,
    DetailsComponent,
    ProductTemplateComponent,
    ProductRightSideComponent,
    CartComponent,
    LoginRegisterComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // exports:[LoginRegisterServiceService],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true } ,
    CookieService,RouterExtServiceService,LoginRegisterServiceService,CatService 
    
             ],
  bootstrap: [AppComponent,Header1Component]
})
export class AppModule { 

  

  constructor(){

    //console.log('approute',this.routerExtService.getPreviousUrl())

  }
}

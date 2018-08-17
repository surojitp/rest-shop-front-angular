import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
    ProductRightSideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,Header1Component]
})
export class AppModule { }

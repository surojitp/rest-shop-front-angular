import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes,Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

import {ProductTemplateComponent} from './product/product-template/product-template.component';
import {ProductListingComponent} from './product/product-listing/product-listing.component';

import { ReactiveFormsModule } from '@angular/forms';
var routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {path: "", component: HomeComponent},
  {path:"home", component:HomeComponent},
  {
    path:"product",
    component:ProductTemplateComponent,
    children:[
            {
              path:":categoryid",
              component:ProductListingComponent
            },
            {
              path:"sub/:subcategoryId",
              component:ProductListingComponent
            }

    ]
  }
  
];
 

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }),
    ReactiveFormsModule
  ],
  exports:[
    RouterModule
  ]
  ,
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule { }
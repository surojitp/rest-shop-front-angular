import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes,Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

import {ProductTemplateComponent} from './product/product-template/product-template.component';
import {ProductListingComponent} from './product/product-listing/product-listing.component';
import {DetailsComponent} from './product/details/details.component';
import {CartComponent} from './product/cart/cart.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {LoginComponent} from './login-register/login/login.component';
import {RegisterComponent} from './login-register/register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

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
            },
            {
              path:"details/:productId",
              component:DetailsComponent
            },
            {
              path:"cart",
              component:CartComponent
            }


    ]
  },
  {
    path:"cart",
    component:ProductTemplateComponent,
    children:[
      {
        path:"",
        component:CartComponent
      }
    ]
  },
  {
    path: "login",
    component: LoginRegisterComponent,
    children:[
      {
        path:"",
        component:LoginComponent
      },
      {
        path:"register",
        component:RegisterComponent
      }
    ]
  },
  {path: "**", component: PageNotFoundComponent}

  
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
export class AppRoutingModule {

 
 }

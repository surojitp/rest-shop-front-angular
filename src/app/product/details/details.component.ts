import { Component, OnInit } from '@angular/core';
import {CatService} from '../../cat.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {CookieService} from 'ngx-cookie-service';
import {cartProduct} from '../../interface/cartProduct';

import '../../../assets/themes/js/common.js';
import '../../../assets/themes/js/custom.js';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  
})
export class DetailsComponent implements OnInit {

  quantity = 1;
  selectedColor = "";

  //cartProduct=[];
  routeSub;
  productId;

  productDetails = [];
  color = "";

  cartProductObj:cartProduct;

  cookieValue = 'UNKNOWN';

  constructor(private cats: CatService, private activateRoute: ActivatedRoute,private cookieService: CookieService) { }

  ngOnInit() {
    
    // this.cookieService.set( 'Test', 'Hello World' );
    // this.cookieValue = this.cookieService.get('Test');
    //this.cookieService.deleteAll();
    //alert(this.cookieValue);

    this.routeSub = this.activateRoute.params.subscribe(p =>{

      if(p["productId"]){
        this.productId = p["productId"];
        this.get_product_details(this.productId);
      }
    })
    //console.log('product',this.productId);
  }

  get_product_details(pId){
    this.cats.get_product_details(pId).subscribe(data =>{
      
      let dataparse = JSON.parse(data._body);
     
      this.productDetails = dataparse.product;

      //console.log(JSON.parse(dataparse.product.color));

      let clr = JSON.parse(dataparse.product.color);

      this.color = clr;

     
      // for(var i=0;i<clr.length;i++){
      //   this.color += clr[i];
      //   if(i != (clr.length-1)){
      //     this.color +=",";
      //   }
      // }

      //console.log(this.color)

      
    })
  }

  add_to_cart(qty,proId,sColor,price,image,name){
    //alert(qty)
    //alert(proId)
    //alert(sColor)

    if(sColor === ""){
      alert("Choose color");
      return false;
    }

    //console.log("bbbbb",this.cats.cartProduct)

    this.cartProductObj = {
          "id": proId,
          "image": image,
          "productName": name,
          "quantity": parseInt(qty),
          "color": sColor,
          "unitPrice": price,
          "price": price
        }

    

    this.cats.product_add_to_cart(this.cartProductObj);

    
  }

}


  


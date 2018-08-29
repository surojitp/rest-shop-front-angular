import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {cartProduct} from './interface/cartProduct';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  cartProductObj:cartProduct;
  cart=[];
  total = 0;

  constructor(private http:Http, private cookieService:CookieService) { 
    
  }

  get_category():Observable<any>{
    let url = 'http://localhost:3000/category';

    return this.http.get(url);
  }

  get_category_with_sub_category():Observable<any>{

    let url = 'http://localhost:3000/category/categryWithSub';

    return this.http.get(url);

  }

  get_product_by_category_id(categoryId):Observable<any>{

    let url = 'http://localhost:3000/products/byCategory/'+categoryId;

    return this.http.get(url);

  }

  get_product_by_subCategory(subCategoryId):Observable<any>{
    let url = 'http://localhost:3000/products/bySubCategory/'+subCategoryId;

    return this.http.get(url);
  }

  get_product_details(productId):Observable<any>{
    let url = `http://localhost:3000/products/${productId}`;
    return this.http.get(url);
  }

  // product_add_to_cart(qty,proId,sColor){
    
  //   this.cartProductObj = {
  //     "id": proId,
  //     "quantity": qty,
  //     "color": sColor
  //   }
  //   console.log(this.cartProductObj);
    
  //   //console.log('cart before',this.cartProduct);
  //   console.log('length',this.cartProduct.length);

  //   if(this.cartProduct.length !== 0){

  //     for(var i=0; i<this.cartProduct.length; i++){
        
  //       //console.log('aaaa',this.cartProduct[i].id);
  //       console.log("loop index",i);
        
  //       if(this.cartProduct[i].id !== this.cartProductObj.id){
  //         console.log("if",11)
  //         this.cartProduct.push(this.cartProductObj);
          
  //       }
  //       else if(this.cartProduct[i].id === this.cartProductObj.id){
  //         console.log("else",22)
  //         let addQuantity = parseInt(this.cartProduct[i].quantity) + parseInt(qty);
  //         this.cartProduct[i].quantity = addQuantity.toString();
          
  //         // this.cartProduct.push(this.cartProductObj);
  //       }
  //     }

  //   }
  //   else{
  //     alert(33)
  //     this.cartProduct.push(this.cartProductObj)
  //   }

  //   console.log('cart',this.cartProduct)
  // }

  product_add_to_cart(product){

    if(this.getCookie('cart')){

      var cart_array = JSON.parse(this.getCookie('cart'));
      this.cart = cart_array;
    }

    if(this.getCookie('total')){

      var cart_total = this.getCookie('total');
      this.total = parseFloat(cart_total);
    }

    
    // console.log(this.cart);
    // return false;

    if (this.cart.length === 0){
      
      //product.count = 1;
      product.price = product.quantity * parseFloat(product.price);
      //this.total += parseFloat(product.price);
      this.cart.push(product);
    
    } else {
      
      var repeat = false;
      
      for(var i = 0; i< this.cart.length; i++){
        
        if(this.cart[i].id === product.id){

          if(this.cart[i].color === product.color){

            repeat = true;
            //this.cart[i].count +=1;
            this.cart[i].quantity += product.quantity
            this.cart[i].price = this.cart[i].quantity * parseFloat(product.price)
            //this.total += parseFloat(this.cart[i].price);

          }
          
          
        }
      }
      if (!repeat) {
        
        //product.count = 1;
        product.price = product.quantity * parseFloat(product.price)
        this.cart.push(product);	
      }
    }

    
    

    this.total += parseFloat(product.price);

    console.log(JSON.stringify(this.cart));
    console.log(this.total);
    
    this.setCookie('cart',JSON.stringify(this.cart),1);
    this.setCookie('total',this.total,1);

    // this.deleteCookie('cart');
    // this.deleteCookie('total');

    // var res = this.cart.map( v=>{
    //   return v.id
    // })

    // console.log(res);

  }

  removeItemCart = function(product){

    // this.deleteCookie('cart');
    // this.deleteCookie('total');
    
    console.log('pp',product);
    console.log('count',product.quantity);
    
   
    var cart_array = JSON.parse(this.getCookie('cart'))

    this.total = this.getCookie('total');
    console.log('cartttt',this.total)
    //var index = cart_array.indexOf(product);

    var index = cart_array.map(function (pro) { return pro.id; }).indexOf(product.id);
    console.log('in',index)

    var cart_product_array = cart_array[index];
    console.log(cart_product_array)
		   
    if(product.quantity > 1){

      
      cart_product_array.quantity -= 1;
      cart_product_array.price = cart_product_array.quantity * parseFloat(cart_product_array.unitPrice)
      this.total -= parseFloat(cart_product_array.unitPrice);
      console.log('cart index',this.total);
      
      // this.cart[index].quantity = product.quantity;
      // this.cart[index].price = product.price;
      console.log(JSON.stringify(cart_array));
      this.setCookie('cart',JSON.stringify(cart_array),1);

      
    }
    else if(product.quantity === 1){
      
      this.total -= parseFloat(cart_product_array.price);
      cart_array.splice(index, 1);
      //product.price = product.quantity * parseFloat(product.unitPrice)
      
      this.setCookie('cart',JSON.stringify(cart_array),1);
      
      //this.cart = [] = cart_array;
      
    }
    
    
    
    //this.total -= parseFloat(product.price);
    this.setCookie('total',this.total,1);
    
  };

  setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  deleteCookie(cname){
    var d = new Date();
    d.setTime(d.getTime() + (-1 * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + "" + ";" + expires + ";path=/";
  }

  getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }
}

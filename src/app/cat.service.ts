import { Injectable,OnInit,EventEmitter,Output } from '@angular/core';

import {Observable} from 'rxjs';
import {cartProduct} from './interface/cartProduct';
import {CookieService} from 'ngx-cookie-service';

import {Http,Headers,RequestOptions,ResponseOptions} from '@angular/http';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';

import { map,catchError } from "rxjs/operators";
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CatService implements OnInit {

  cartProductObj:cartProduct;
  cart=[];
  total = 0;

  loginData:any;

  @Output() hideHeader1: EventEmitter<any> = new EventEmitter();

  @Output() cartProductCount: EventEmitter<any> = new EventEmitter();

  constructor(private http:Http, private cookieService:CookieService) { 
    
    this.set_login_data()
    
    
  }

  headerTrue(){
    this.hideHeader1.emit(true)
  }
  headerFalse(){
    this.hideHeader1.emit(false)
  }

  set_login_data(){
    this.loginData = (this.getCookie('userLogin')) ? JSON.parse(this.getCookie('userLogin')) : "";
  }
  
  ngOnInit(){
    
  }

  get_category():Observable<any>{
    console.log('interface');
    
    let url = 'https://shopbackend.herokuapp.com/category';

    return this.http.get(url);
  }

  get_category_with_sub_category():Observable<any>{

    let url = 'https://shopbackend.herokuapp.com/category/categryWithSub';

    return this.http.get(url);

  }

  get_product_by_category_id(categoryId):Observable<any>{

    let url = 'https://shopbackend.herokuapp.com/products/byCategory/'+categoryId;

    return this.http.get(url);

  }

  get_product_by_subCategory(subCategoryId):Observable<any>{
    let url = 'https://shopbackend.herokuapp.com/products/bySubCategory/'+subCategoryId;

    return this.http.get(url);
  }

  get_product_details(productId):Observable<any>{
    let url = `https://shopbackend.herokuapp.com/products/${productId}`;
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

  // cartCount(val?){
  //   let c;
  //   if(Object.keys(this.loginData).length === 0){
  //     if(this.getCookie('cart')){
  //       let cartParse = JSON.parse(this.getCookie('cart'))
  //       this.cartProductCount.emit(cartParse.length)
  //     }
      
      
  //   }
  //   else{
      
  //     if(val && val !== '0'){
  //       this.cartProductCount.emit(val)
        
  //     }
      
  //   }
  //   //this.cartProductCount.emit(cartPro)
  // }

  cartProductCountOnInit(){
    if(Object.keys(this.loginData).length === 0){
      if(this.getCookie('cart')){
        this.cartProductCount.emit(JSON.parse(this.getCookie('cart')).length);
      }
      
    }

  }

  product_add_to_cart(product){

    //console.log('aa',Object.keys(this.loginData).length)

    if(Object.keys(this.loginData).length === 0){

      console.log(1111111)

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

          console.log('cart '+JSON.stringify(this.cart));
          console.log(this.cart.length);

          this.cartProductCount.emit(this.cart.length);
          
          this.setCookie('cart',JSON.stringify(this.cart),1);
          this.setCookie('total',this.total,1);

          // this.deleteCookie('cart');
          // this.deleteCookie('total');

          // var res = this.cart.map( v=>{
          //   return v.id
          // })

          // console.log(res);

    }
    else{

      console.log(22222)

      product['userId']= this.loginData.id;

      product.price = product.quantity * parseFloat(product.unitPrice)

      var pro_string = JSON.stringify(product);

      //console.log('ppp',pro_string)

      this.add_single_product_cart(pro_string,this.loginData.token).subscribe(
                    res=> console.log(res),
                    err=> console.log(err)
                  );
      
    }

    return true;
  }

  add_single_product_cart(pro_string,token):Observable<any>{
    return this.product_add_to_cart_service(pro_string,token);
  }

  product_add_to_cart_when_login(){

    this.set_login_data();

    console.log('a',this.loginData)
    
    if(Object.keys(this.loginData).length !== 0){

      console.log('cart',this.getCookie('cart'))

      var cartCookie = (this.getCookie('cart')) ? JSON.parse(this.getCookie('cart')) : [];

      if(cartCookie.length > 0){
        /////////////////

        for(var i =0; i< cartCookie.length ; i++){
          cartCookie[i]['userId']= this.loginData.id;

          let product_data = JSON.stringify(cartCookie[i]);
          console.log('cart loop'+i ,product_data);

          this.product_add_to_cart_service(product_data,this.loginData.token)
                                          .subscribe(
                                            res=> console.log(res),
                                            err=> console.log(err)
                                          );
          
            
                          
        }

        
        //////////////
           
      }

      this.deleteCookie('cart');
      console.log("when login",1);
    }
    else{
      console.log("when login",0);
    }

  }

  product_add_to_cart_service(product_data,token):Observable<any>{

    // console.log('product service',product_data)
     console.log('token',token)

    const headers = new Headers({'Content-Type': 'application/json','Authorization': 'Barer '+ token});
    //headers.append('Authorization', 'Barer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1Ymhhc2hAZ21haWwuY29tIiwidXNlcklkIjoiNWI4YmVlMjNhOTVlMTUyMmY0MmU1NzM1IiwiaWF0IjoxNTM2MTU4MjQwLCJleHAiOjE1MzYxNjE4NDB9.SKTJTqGg2YyH9uSy6BawMGzPR1hJXV1PBezDaahmKPU')
    const options = new RequestOptions({ headers: headers });

    var url = 'https://shopbackend.herokuapp.com/cart';

    
    return this.http.post(url,product_data,options)
                    .pipe(
                      map((response: any) => {
                        this.get_data_from_cart_service()
                        return response.json()
                      }),
                      //catchError((e: any) => Observable.throw(this.errorHandler(e)))
                      catchError(this.handleError('add cart',url))
                    )
  }

  get_data_from_cart_service(){

    console.log("get data",this.loginData.id)

    const headers = new Headers({'Content-Type': 'application/json','Authorization': 'Barer '+ this.loginData.token});
    //headers.append('Authorization', 'Barer '+data.token)
    const options = new RequestOptions({ headers: headers });

    var url = `https://shopbackend.herokuapp.com/cart/${this.loginData.id}`;

    
    return this.http.get(url)
                    .pipe(
                      map((response: any) => {
                        //console.log("dd"+response.json().count);
                        //this.cartCount(response.json().count)
                        if (response.json() == null) {
                          this.cartProductCount.emit(0)
                        }else{
                          this.cartProductCount.emit(response.json().count)
                        }
                        
                        return response.json()
                      }),
                      //catchError((e: any) => Observable.throw(this.errorHandler(e)))
                      catchError(this.handleError('get cart',url))
                    )
  }

  removeItemCart(product) {

    

    // this.deleteCookie('cart');
    // this.deleteCookie('total');
    
    console.log('pp',product);
    console.log('count',product.quantity);
    
   
    var cart_array: any = JSON.parse(this.getCookie('cart'))

    this.total = JSON.parse(this.getCookie('total'));
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

    this.cartProductCount.emit(cart_array.length);
    
    
  }

  remove_cart_service(product_id){

    // console.log('product service',product_data)
    // console.log('token',token)

    const headers = new Headers({'Content-Type': 'application/json','Authorization': 'Barer '+ this.loginData.token});
    //headers.append('Authorization', 'Barer '+data.token)
    const options = new RequestOptions({ headers: headers });

    var url = 'https://shopbackend.herokuapp.com/cart/'+product_id;

    
    return this.http.delete(url,options)
                    .pipe(
                      map((response: any) => response.json()),
                      //catchError((e: any) => Observable.throw(this.errorHandler(e)))
                      catchError(this.handleError('delete cart',url))
                    )
  }

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

  private handleError(operation: String,url=null) {
      return (err: any) => {
          let errMsg = `error in ${operation}() retrieving ${url}`;
          //console.log(`${errMsg}:`, err)
          if(err instanceof HttpErrorResponse) {
              // you could extract more info about the error if you want, e.g.:
              console.log(`status: ${err.status}, ${err.statusText}`);
              // errMsg = ...
          }
          //return Observable.throw(errMsg);
          return throwError(errMsg);
      }
  }

  
}

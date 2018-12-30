import { Component, OnInit, OnDestroy,AfterContentChecked } from '@angular/core';
import {CatService} from '../../cat.service';
import {LoginRegisterServiceService} from '../../login-register-service.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,AfterContentChecked {

  cart = [];
  total;

  
  loginStatus:boolean = false;

  constructor(private service:CatService, private lr: LoginRegisterServiceService) { 
    
    this.lr.loginStatus.subscribe((s)=>{


      //console.log('ssssss',s);
      
   
       this.changeLoginLogoutstatus(s)
    });

    //this.lr.currentLoginStatus.subscribe(s => this.loginStatus = s);
  }

  changeLoginLogoutstatus(status = null){

    if(status !== null){

      this.loginStatus = status;
      

      //this.cart=[]
    }

    this.ngOnInit();

  }

  ngOnInit() {
    
    this.loginStatus = (this.service.getCookie('userLogin')) ? true : false;

    console.log("status",this.loginStatus);

    if(this.loginStatus){

      console.log('loginss')

      this.service.get_data_from_cart_service().subscribe(
                responce=>{
                  console.log("responce",responce)
                  if(responce !== null){
                    this.cart = responce.data;
                  }
                  else{
                    this.cart = [];
                  }
                  
                  //this.ngAfterContentChecked();
                },
                err=>{
                  console.log(err)
                }
      );
    }
    else{
      
      if(this.service.getCookie('cart')){
        this.cart= JSON.parse(this.service.getCookie('cart'))
      
        this.total= this.service.getCookie('total')
        //console.log(JSON.parse(this.cart))
        console.log("total",this.total)
      }
      else{
        this.cart= [];
      }
    }
    
   

  }

  remove_from_cart(product,product_id){

    console.log(product_id);
    if(!this.loginStatus){
      //console.log(product)
      this.service.removeItemCart(product);
      this.cart= JSON.parse(this.service.getCookie('cart'))
      this.total= this.service.getCookie('total')
    }
    else{
      if(product_id){

        this.service.remove_cart_service(product_id).subscribe(

                                                      (res)=>{
                                                        if(res){
                                                          this.ngOnInit();
                                                        }
                                                      },
                                                      (err)=>{
                                                        console.log(err);
                                                        
                                                      }
                                                    )
      }
    }

    //this.service.cartCount()
  }

  // ngOnDestroy(){
  //   console.log("page leave")
  //   this.lr.loginStatus.unsubscribe()
  // }

  ngAfterContentChecked(){

    // console.log("afte",this.cart)

    // var c = this.cart;
    // var runningValue:number = 0;
    // if(this.cart){
    //   this.total = this.cart.reduce((runningValue, c ) => {
    //     runningValue = runningValue + c.price;
    //   }, 0);
    // }
    var cartTotal:number = 0;
    this.cart.map(s=>{
           
      cartTotal += s.price;
    })

    this.total= cartTotal;
    
    //console.log("total",this.total)
  }

 

}

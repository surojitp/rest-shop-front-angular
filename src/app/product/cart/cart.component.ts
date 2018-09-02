import { Component, OnInit, OnDestroy } from '@angular/core';
import {CatService} from '../../cat.service';
import {LoginRegisterServiceService} from '../../login-register-service.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart;
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
      this.ngOnInit()

      //this.cart=[]
    }

  }

  ngOnInit() {
    //console.log("status",this.loginStatus)
    this.loginStatus = (this.service.getCookie('userLogin')) ? true : false;

    if(this.loginStatus){

      console.log('login')

      this.service.get_data_from_cart_service().subscribe(
                responce=>{
                  console.log(responce)
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
    }
    
   

  }

  remove_from_cart(product){
    //console.log(product)
    this.service.removeItemCart(product);
    this.cart= JSON.parse(this.service.getCookie('cart'))
    this.total= this.service.getCookie('total')
  }

  ngOnDestroy(){
    console.log("page leave")
    this.lr.loginStatus.unsubscribe()
  }

 

}

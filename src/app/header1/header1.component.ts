import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {CatService} from '../cat.service';
import {LoginRegisterServiceService} from '../login-register-service.service';
import { CartComponent } from '../product/cart/cart.component';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
  //providers: [CartComponent],
})
export class Header1Component implements OnInit {

  loginStatus;
  loginLogout;
  user;

  loginData:any;

  toggleMenu;

  count: any;

  constructor(private c: CatService,private lr:LoginRegisterServiceService, private router: Router, private route: ActivatedRoute) { 

    this.loginData = (this.c.getCookie('userLogin')) ? JSON.parse(this.c.getCookie('userLogin')) : "";

    //authenticationService.getLoggedInName.subscribe(name => this.changeName(name));

    this.lr.loginLogoutChange.subscribe(name => this.changeLoginLogoutName(name));

    this.lr.loginStatus.subscribe(s=> this.changeLoginLogoutstatus(s));

    //this.loginStatus = (this.c.getCookie('userLogin')) ? true : false;

    this.c.hideHeader1.subscribe(r=>{
      this.toggleMenu = r
    })

    this.c.cartProductCount.subscribe(c=>{
      this.count = c
      console.log("total cart---"+this.count);
      
    })
  }

  ngOnInit() {

    if(Object.keys(this.loginData).length !== 0){
      this.changeLoginLogoutstatus(true);
      this.user = this.loginData.email;
    }
    

    this.c.headerTrue();
    //this.c.cartCount();
    
    this.c.cartProductCountOnInit()
    
  }

  changeLoginLogoutstatus(status = null){

    

    if(status !== null){

      this.loginData = (this.c.getCookie('userLogin')) ? JSON.parse(this.c.getCookie('userLogin')) : "";

      console.log("ssss",this.loginData)

      this.loginStatus = status;
      this.user = this.loginData.email

      
      console.log('uu',this.user);
    }

  }

  changeLoginLogoutName(name = null){

    if(name !== null){

      this.loginLogout = name;
      

    }

  }

  async LogOut(){

    //alert()
    await this.lr.logout_service();
    this.user = "";

    this.count=0;

    //this.lr.changeLoginStausFunction(true);

    //this.c.deleteCookie('userLogin');
    //this.c.cartCount()
  }

}

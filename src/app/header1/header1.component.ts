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

  loginData:any;

  constructor(private c: CatService,private lr:LoginRegisterServiceService) { 

    this.loginData = (this.c.getCookie('userLogin')) ? JSON.parse(this.c.getCookie('userLogin')) : "";

    //authenticationService.getLoggedInName.subscribe(name => this.changeName(name));

    this.lr.loginLogoutChange.subscribe(name => this.changeLoginLogoutName(name));

    this.lr.loginStatus.subscribe(s=> this.changeLoginLogoutstatus(s));

    //this.loginStatus = (this.c.getCookie('userLogin')) ? true : false;
  }

  ngOnInit() {

    if(Object.keys(this.loginData).length !== 0){
      this.changeLoginLogoutstatus(true);
    }
  }

  changeLoginLogoutstatus(status = null){

    if(status !== null){

      this.loginStatus = status;

    }

  }

  changeLoginLogoutName(name = null){

    if(name !== null){

      this.loginLogout = name;

    }

  }

  LogOut(){

    //alert()
    this.lr.logout_service();

    //this.lr.changeLoginStausFunction(true);

    //this.c.deleteCookie('userLogin');
  }

}

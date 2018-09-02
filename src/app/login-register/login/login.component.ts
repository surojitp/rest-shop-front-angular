import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {LoginRegisterServiceService} from '../../login-register-service.service';
import {CatService} from '../../cat.service';
import {RouterExtServiceService} from '../../router-ext-service.service';

import {Router} from "@angular/router";





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  userEmail: String;
  password: String;
  msg;
  cls;
  previousRoute: string;
  


  constructor(
    private fb: FormBuilder, 
    private lr: LoginRegisterServiceService, 
    private cs: CatService, 
    private routingState: RouterExtServiceService,
    private router: Router
    
  ) { 

    
    
    
   

    this.rForm = fb.group({
      "userEmail": [null,Validators.compose([
        Validators.required
      ])],
      "password": [null,Validators.required]
    })
  }

  ngOnInit() {

    this.previousRoute = this.routingState.getPreviousUrl();
    
    console.log(this.previousRoute)
  }

   

  formSubmit(post){
    console.log(post)
    let data = {
      "email": post.userEmail,
      "password": post.password
    }

    this.lr.login_service(data).subscribe((d)=>{
      if(d){
        this.msg = "Login Successfully";
        this.cls = "alert alert-success";
        let userLoginData = {
          "id": d.userId,   
          "email": post.userEmail,
          "token": d.token
        }
        this.cs.setCookie('userLogin',JSON.stringify(userLoginData),1);

        //this.cs.product_add_to_cart_when_login();

        this.cs.product_add_to_cart_when_login();

        this.router.navigate([this.previousRoute]);
      }
    },(err)=>{
      console.log('error',err)
                                  
      this.msg = "email or password missmatch";
      this.cls = "alert alert-danger";
    })


     
    
  }

}

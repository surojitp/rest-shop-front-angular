import { Component,OnInit } from '@angular/core';
import {CatService} from './cat.service';
import {LoginRegisterServiceService} from './login-register-service.service';
import { nodeChildrenAsMap } from '@angular/router/src/utils/tree';
import { ninvoke } from 'q';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
import {RouterExtServiceService} from './router-ext-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  //providers: [LoginRegisterServiceService]
})
export class AppComponent implements OnInit{
  title = 'app';
  cat: any[] =[];
  loginStatus;

  

  constructor(private c:CatService,private lr: LoginRegisterServiceService, routingState: RouterExtServiceService){

    routingState.loadRouting();

    //this.lr.currentLoginStatus.subscribe(s=> {this.lr.changeLoginStausFunction(s)});

    //this.lr.changeLoginStausFunction(true);
    //this.lr.loginStatus.subscribe(s=> this.changeLoginLogoutstatus(s));
  }

  // changeLoginLogoutstatus(status = null){

  //   if(status !== null){

  //     this.loginStatus = status;

  //   }

  // }
 

  ngOnInit(){

    
    this.get_category();

    this.loginStatus = (this.c.getCookie('userLogin')) ? true : false;
    // var login:any = JSON.parse(this.c.getCookie('userLogin'));
    // console.log(login.token);
    // var data = {
    //   "token": login.token
    // }
    // this.get_order(data)

    // if(this.loginStatus){
    //   this.c.product_add_to_cart_when_login().subscribe(
    //     res=> console.log(res),
    //     err=> console.log(err)
    //   );
    // }
    
    
  }
  // get_order(data){
  //   this.lr.order(data)
  //           .subscribe(
  //             d=>{
  //               console.log('aaa',d)
                
  //             },
  //             err=>{
  //               console.log('error',err)
                
                
  //             }
  //           );
  // }
  get_category(){
    this.c.get_category()
          .subscribe((category) => {
            //console.log(category);
            
            let cat_string = category._body;
            //console.log("category",cat_string);
            
            //let cat_obj = JSON.parse(cat_string);
            //console.log("category obj",cat_string);
            
            //this.cat.push(cat_string);

            //console.log(cat_obj.count)

             this.cat = JSON.parse(cat_string);
            // console.log(this.cat);
          })
  }
}



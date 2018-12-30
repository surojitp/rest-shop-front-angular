import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,AbstractControl} from '@angular/forms';
import {LoginRegisterServiceService} from '../../login-register-service.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  userEmail: String;
  password: String;
  msg;
  cls;

  //loader: boolean = false;

  constructor(private fb: FormBuilder, private lr: LoginRegisterServiceService) { 
    
    this.rForm = fb.group({
          'userEmail': [null,Validators.compose([
            Validators.email,
            Validators.required
          ])],
          'password': [null,Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('[a-zA-Z]*')
          ])],
          'confirmPassword': [null,Validators.compose([
            Validators.required
          ])
          
          ]
        },
        {validator:this.passwordConfirming}
    )
  }

  ngOnInit() {

    // this.rForm.get('userEmail').valueChanges.subscribe(v=>{});

  }
  passwordConfirming(c: FormGroup)/*: { invalid: boolean }*/ {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {'mismatch': true};
    }
    else{
      return null;
    }
  }

  formSubmit(post){
    console.log('post',post)
    //this.loader = true;
    let data = {
      "email": post.userEmail,
      "password": post.password
    }

    this.lr.register_service(data).subscribe( d =>{
      

      //var body = d._body
      
      console.log('d');
      console.log(d);
      

      if(d && d === 1){
        this.msg = "Register Successfully";
        this.cls = "alert alert-success";
        window.location.href = './login';
      }
      else if(d && d === 2){
        this.msg = "Email already use";
        this.cls = "alert alert-danger";
      }
      else if(d && d === 3){
        this.msg = "Woops!! Something went wrong.Please try again later!! ";
        this.cls = "alert alert-danger";
      }
      
      console.log('res',d)
    },
    err=>{
      console.log(err.status);

      let error_body = JSON.parse(err._body)
      
      
      if(err.status === 409){
        this.msg = error_body.message;
        this.cls = "alert alert-danger";

        console.log("msg"+ this.msg);
        
      }
      
    }
  );
   
  }


}

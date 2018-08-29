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

    let data = {
      "email": post.userEmail,
      "password": post.password
    }

    this.lr.register_service(data).subscribe( d =>{

      //var body = d._body


      if(d && d.message == "User created"){
        alert("Register Successfully")
        window.location.href = './login';
      }
      
      console.log('res',d)
    });
   
  }


}

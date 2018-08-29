import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {LoginRegisterServiceService} from '../../login-register-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;


  constructor(private fb: FormBuilder) { 

    this.rForm = fb.group({
      "userEmail": [null,Validators.compose([
        Validators.required
      ])],
      "password": [null,Validators.required]
    })
  }

  ngOnInit() {
  }

}

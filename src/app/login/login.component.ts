import { Component } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public service: LoginServiceService, public router: Router ){}


  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', Validators.required),
  })


  login(){
    if(this.loginForm.valid){
      this.service.getUser().subscribe((users) => {
        users.forEach((user) => {
          if(user.username == this.loginForm.value.username && user.password == this.loginForm.value.password){
            
            localStorage.setItem('name', this.loginForm.value.username ?? '');
            localStorage.setItem('pass', this.loginForm.value.password ?? '');
            localStorage.setItem('rol', user.role ?? '');
            localStorage.setItem('apodo', user.name ?? '');
            
            this.router.navigate(["game"]);
          }
        })
      })
    }
  }

  onSubmit(){
    this.login();
  }

}

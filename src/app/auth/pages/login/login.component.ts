import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLogin } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import {ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:UserLogin;
  constructor(private authService:AuthService, private toastr:ToastrService,private router:Router) {
    this.user = new UserLogin('', '');
   }

  ngOnInit(): void {    
    if('email' in localStorage){
      this.user.email = localStorage.getItem('email') as string;
    }
  }

  submitForm(form:NgForm){
    console.log(form);
    if(form.invalid){
      return;
    }

    this.authService.login(this.user).subscribe(resp => {
      this.router.navigate(['home']);
    }, (err:any) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Credentials',{
        positionClass: 'toast-top-right'
      })
    });
  }
}

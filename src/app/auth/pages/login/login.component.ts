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

    //If user has been loged in
    if(this.authService.validateUserToken()){
      this.router.navigateByUrl('/admin');
    }
    if('email' in localStorage){
      this.user.email = localStorage.getItem('email') as string;
    }
  }

  submitForm(form:NgForm){
    if(form.invalid){
      return;
    }

    this.authService.login(this.user).subscribe(resp => {
      console.log(resp);
      this.router.navigateByUrl('/admin');
    }, (err:any) => {
      if(err.message.includes('Credentials')){
        this.showErrorToastr('Credenciales incorrects', 'Credenciales');
        return;
      }

      if(err.message.includes('Http failure')){
        this.showErrorToastr('No se ha podido establecer contacto con el servidor', 'Error');
      }

    });
  }

  private showErrorToastr(message:string, title:string){
    this.toastr.error(message, title,{
      positionClass: 'toast-top-right'
    });
  }
}

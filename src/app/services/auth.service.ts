import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserLogin } from '../models/user.model';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userToken:string;
  baseApiUrl:string = environment.baseApiUri;
  constructor(private http:HttpClient) {
    this.userToken = localStorage.getItem('token') as string;
   }

  login(user:UserLogin){
    return this.http.post(`${this.baseApiUrl}/auth/login`, user).pipe(
      map( (resp:any) => {
        this.saveTokenAnExpirationTime(resp.token, resp.expiresIn);
        return resp;
      })
    );
  }

  private saveTokenAnExpirationTime(token:string, expiresIn:number){
      this.userToken = token;
      localStorage.setItem('token', token);
      let today = new Date();
      today.setMilliseconds(expiresIn);
      localStorage.setItem('expiresIn', today.getTime().toString());
  }
}

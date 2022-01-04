import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlainResponse, Session, SessionResponse } from '../interfaces/responses';
import { UserLogin } from '../models/user.model';
import { environment } from './../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userToken: string;
  baseApiUrl: string = environment.baseApiUri;
  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem('token') as string;
  }

  logout(){
    localStorage.clear();
  }

  login(user: UserLogin): Observable<Session> {
    return this.http
      .post<SessionResponse>(`${this.baseApiUrl}/auth`, user)
      .pipe(
        map((resp: SessionResponse) => {
          this.saveTokenAnExpirationTime(
            resp.session.token,
            resp.session.expiresIn
          );
          return resp.session;
        })
      );
  }

  private saveTokenAnExpirationTime(
    token: string,
    expiresIn:string
  ) {
    this.userToken = token;
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expiresIn);
  }

  public validateUserToken(): boolean {
    return this.verifyToken();
  }

  private verifyToken():boolean{
    const token = this.userToken ? this.userToken : localStorage.getItem('token') as string;
    const expiresIn = localStorage.getItem('expiresIn');

    const expiresDate = new Date();
    expiresDate.setTime(Number(expiresIn));
    console.log(expiresDate );
    console.log(new Date());
    if(!(expiresDate > new Date())){
      localStorage.clear();
      return false;
    }



    return token.length > 10 ? expiresDate > new Date() : false;
  }
}

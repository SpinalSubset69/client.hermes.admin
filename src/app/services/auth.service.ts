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
    let isVerified:boolean = true;

    this.verifyToken().subscribe(res => {
      return true;
    });

    return isVerified;
  }

  verifyToken():Observable<boolean>{
    return this.http.get<PlainResponse>(`${this.baseApiUrl}/auth/verify`).pipe(
      map(response => {
        if(response.message === 'Authorized'){
          return true;
        }
        return false;
      })
    )
  }
}

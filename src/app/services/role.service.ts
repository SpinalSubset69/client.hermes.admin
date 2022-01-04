import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseWithRoleArray } from '../interfaces/responses';
import { IRole } from '../interfaces/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseApiUrl:string = environment.baseApiUri;
  constructor(private http:HttpClient) { }

  getRoles():Observable<IRole[]>{
    return this.http.get<ResponseWithRoleArray>(`${this.baseApiUrl}/role`).pipe(
      map(response => {
        return response.data;
      })
    );
  }
}

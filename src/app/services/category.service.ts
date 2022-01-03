import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICategory } from '../interfaces/category';
import { PlainResponse, ResponseWithCategory, ResponseWithCategoryArray } from '../interfaces/responses';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseApiUrl:string = environment.baseApiUri;

  constructor(private http:HttpClient) { }

  all():Observable<Category[]>{
    return this.http.get<ResponseWithCategoryArray>(`${this.baseApiUrl}/category`).pipe(
      map((response:ResponseWithCategoryArray) => {
        return response.data as unknown as Category[];
      })
    )
  }

  saveCategory(category:Category):Observable<ResponseWithCategory>{
    return this.http.post<ResponseWithCategory>(`${this.baseApiUrl}/category`, category).pipe(
      map(response => {
        return response;
      })
    );
  }

  updateCategory(category:Category):Observable<PlainResponse>{
    return this.http.put<PlainResponse>(`${this.baseApiUrl}/category/${category.id}`, category);
  }

  deleteCategory(category:Category):Observable<PlainResponse>{
    return this.http.delete<PlainResponse>(`${this.baseApiUrl}/category/${category.id}`);
  }

}

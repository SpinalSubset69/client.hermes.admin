import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IArticle } from '../interfaces/article';
import { PlainResponse, ResponseWithArticle } from '../interfaces/responses';
import { Article } from '../models/article';
import { ImageUploadRequest } from '../models/ImageUploadRequest';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  baseApiUrl: string = environment.baseApiUri;
  constructor(private http: HttpClient) {}

  getArticleById(article_id:number): Observable<IArticle>{
    return this.http.get<ResponseWithArticle>(`${this.baseApiUrl}/article/${article_id}`).pipe(
      map(response => {
        return response.data as IArticle;
      })
    )
  }

  addArticle(article: Article, reporterId:number): Observable<IArticle> {
    const articleToUpload = {
      ...article,
      reporterId: reporterId
    }
    return this.http
      .post<ResponseWithArticle>(`${this.baseApiUrl}/article`, articleToUpload)
      .pipe(
        map((response) => {
          return response.data as IArticle;
        })
      );
  }

  addArticleImages(images: ImageUploadRequest[], article_id: number) {
    return this.http.post(
      `${this.baseApiUrl}/article/uplodaimages/${article_id}`,
      images
    );
  }

  removeArticle(article_id:number):Observable<PlainResponse>{
    return this.http.delete<PlainResponse>(`${this.baseApiUrl}/article/${article_id}`);
  }

  updateArticle(article_id:number, article:Article):Observable<ResponseWithArticle>{
    return this.http.put<ResponseWithArticle>(`${this.baseApiUrl}/article/${article_id}`, article);
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IArticle } from '../interfaces/article';
import { PlainResponse, ResponseWithArticle } from '../interfaces/responses';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  baseApiUrl: string = environment.baseApiUri;
  constructor(private http: HttpClient) {}

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

  addArticleImages(images: FormData, article_id: number) {
    return this.http.post(
      `${this.baseApiUrl}/article/uplodaimages/${article_id}`,
      images
    );
  }

  removeArticle(article_id:number):Observable<PlainResponse>{
    return this.http.delete<PlainResponse>(`${this.baseApiUrl}/article/${article_id}`);
  }

}

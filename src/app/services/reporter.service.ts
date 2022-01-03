import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PlainResponse, ResponseWithReporter } from '../interfaces/responses';
import { IReporter } from '../interfaces/reporter';
import { Reporter } from '../models/reporter';
import { ArticlesPagination, IArticle } from '../interfaces/article';
import { RequestParams } from '../interfaces/params';

@Injectable({
  providedIn: 'root'
})
export class ReporterService {

  baseApiUrl: string = environment.baseApiUri;

  public page:number = 1;
  public pageSize:number = 4;
  public query:string = '';
  public reporterId:number = 0;

  constructor(private http:HttpClient) { }

  postReporter(reporter:Reporter):Observable<IReporter>{
    return this.http.post<ResponseWithReporter>(`${this.baseApiUrl}/reporter`, reporter).pipe(
      map((response:ResponseWithReporter) => {
        return response.data;
      })
    );
  }
  addImageReporter(image:FormData, reporter_id:number):Observable<PlainResponse>{
    return this.http.post<PlainResponse>(`${this.baseApiUrl}/reporter/fileupload/${reporter_id}`,image);
  }

  getReporterByToken():Observable<IReporter>{
    return this.http.get<ResponseWithReporter>(`${this.baseApiUrl}/auth`).pipe(
      map((response:ResponseWithReporter) => {
        return response.data as unknown as IReporter;
      })
    );
  }

  getReporterArticlesBasedOnId(reporter_id:number):Observable<ArticlesPagination>{
    this.reporterId = reporter_id;
    return this.http.get<ArticlesPagination>(`${this.baseApiUrl}/reporter/articles`, {
      params: this.getParams()
    }).pipe(
      map(response => {
        return response
      })
    )
  }

  queryOnReporterArticles(reporter_id:number, query:string):Observable<ArticlesPagination>{
    this.query = query;
    this.reporterId = reporter_id;
    return this.http.get<ArticlesPagination>(`${this.baseApiUrl}/reporter/articles`, {
      params: this.getParams()
    }).pipe(
      map(response => {
        return response
      })
    )
  }

  private getParams(){
    const paramsForRequest = {
      pageIndex: this.page,
      pageSize: this.pageSize,
      query: this.query,
      reporterId:this.reporterId
    }
    const params:HttpParamsOptions = {};
    params.fromObject = paramsForRequest;

    return new HttpParams(params)
  }
}


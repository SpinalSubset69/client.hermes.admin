import { Component, Input, OnInit } from '@angular/core';
import { ArticlesPagination, IArticle } from 'src/app/interfaces/article';
import { IReporter } from 'src/app/interfaces/reporter';
import { ReporterService } from 'src/app/services/reporter.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  @Input()reporter!: IReporter;
  articles: IArticle[] = [];
  page: number = 1;
  articlesPagination!: ArticlesPagination;
  isSerching:boolean = false;

  constructor(private reporterService: ReporterService) {}

  ngOnInit(): void {
   this.getDataFromDb();
  }

  nextPage(){
    const page = this.reporterService.page;
    if((page + 1) >  this.getTotalPages()){
      return;
    }
    this.reporterService.page++;
    this.reporterService
      .getReporterArticlesBasedOnId(this.reporter.id)
      .subscribe((response) => {
        this.articles = response.data;
        this.articlesPagination = response;
        console.log(response);
      });
  }

  previousPage(){
    const page = this.reporterService.page;
    if(page == 1){
      return;
    }
    this.reporterService.page--;
    this.reporterService
      .getReporterArticlesBasedOnId(this.reporter.id)
      .subscribe((response) => {
        this.articles = response.data;
        this.articlesPagination = response;
        console.log(response);
      });
  }

  updateArticlesListener($event:boolean){
    if($event){
      this.getDataFromDb();
    }
  }

  handleSearch($event:any){
    this.isSerching = true;
    const query = $event.value;
    this.reporterService.queryOnReporterArticles(this.reporter.id, query).subscribe(response =>{
      this.articles = response.data;
      this.articlesPagination = response;
    })
  }

  private getTotalPages(){
    const value = (this.articlesPagination.count / this.articlesPagination.pageSize);

    const valueString = value.toString();

    const valueSplit = valueString.split('.');

    if(valueSplit[1]){
      let valueNumber=  Number(valueSplit[0]);
      return ++valueNumber;
    }
    return Math.round(value);
  }

  private getDataFromDb(){
    this.reporterService
    .getReporterArticlesBasedOnId(this.reporter.id)
    .subscribe((response) => {
      this.articles = response.data;
      this.articlesPagination = response
    });
  }
}

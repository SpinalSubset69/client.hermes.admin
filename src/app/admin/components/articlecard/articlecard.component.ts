import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IArticle } from 'src/app/interfaces/article';
import { Modal } from 'src/app/interfaces/modal';
import { IReporter } from 'src/app/interfaces/reporter';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';


@Component({
  selector: 'app-articlecard',
  templateUrl: './articlecard.component.html',
  styleUrls: ['./articlecard.component.css']
})
export class ArticlecardComponent implements OnInit {
  @Input() article!:IArticle;
  @Input() reporter:IReporter | undefined;
  @Output() updateArticles = new EventEmitter<boolean>();
  showModal:boolean = false;
  modalInfo!:Modal;
  articleToUpdate:Article;

  constructor(private articleService:ArticleService, private toastr:ToastrService) {
    this.articleToUpdate = new Article('','', '',0);
   }

  ngOnInit(): void {
    this.articleToUpdate = new Article(this.article.title, this.article.summary, this.article.content, 0);
  }


  removeArticle(){
   this.modalInfo = {
      title:'¿Desea Elminar el Artículo?',
      message: 'Se eliminará el artículo y sus imágenes de forma permanente'
    }
    this.showModal = true;
  }


  handleModalOutput($event:boolean){
    if(!$event){
      this.showModal = false;
      return;
    }

    this.articleService.removeArticle(this.article.id).subscribe(response => {
      this.updateArticles.emit(true);
      this.toastr.success('Artículo Eliminado Con Éxito', 'Artículo',{
        positionClass:'toast-top-rigth'
      })
    }, err => {
      this.toastr.error('Ocurrió un error en la Base de Datos', 'Error',{
        positionClass:'toast-top-rigth'
      })
    })
  }

  articleUpdate($event:boolean){
    if($event){
      this.articleService.getArticleById(this.article.id).subscribe(response => {
        this.article = response;
        this.toastr.success('Artículo Actualizado Con Éxito', 'Artículo',{
          positionClass:'toast-top-rigth'
        })
      });
    }
  }

}

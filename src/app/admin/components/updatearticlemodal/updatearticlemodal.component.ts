import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { IArticle } from 'src/app/interfaces/article';
import { IReporter } from 'src/app/interfaces/reporter';
import { Article } from 'src/app/models/article';
import { Category } from 'src/app/models/category';
import { ImageUploadRequest } from 'src/app/models/ImageUploadRequest';
import { ArticleService } from 'src/app/services/article.service';
import { ReporterService } from 'src/app/services/reporter.service';
import { toBase64Async } from 'src/app/Util/FileHandler';
@Component({
  selector: 'app-updatearticlemodal',
  templateUrl: './updatearticlemodal.component.html',
  styleUrls: ['./updatearticlemodal.component.css']
})
export class UpdatearticlemodalComponent implements OnInit {

  modalRef?: BsModalRef;
  //article:Article;
  reporter!:IReporter;
  images:ImageUploadRequest[] = [];
  @Input() article!:Article;
  @Input() articleId!:number;
  @Output() updated = new EventEmitter<boolean>();
  constructor(private modalService: BsModalService,  private toastr:ToastrService,
    private articleService:ArticleService,
    private reporterService:ReporterService) {
    this.article = new Article('', '', '', 0)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {

    this.reporterService.getReporterByToken().subscribe(response => {
      this.reporter = response;
    });
  }

  addArticle(form:NgForm){

    if(form.invalid){
      return;
    }
    if(!this.article.categoryId){
      this.showTastrError('Seleccione una Categoría', 'Categoría');
      return;
    }

    if(this.article.summary.length >= 280){
      this.showTastrError('El adelanto solo puede ser de 280 carácteres', 'Adelanto');
      return;
    }

    if(this.article.title.length < 5){
      this.showTastrError('El título debe ser mayor a 5 carácteres', 'Título');
      return;
    }

    if(this.article.content.length < 15){
      this.showTastrError('EL contenido debe ser mayor de 15 carácteres', 'Contenido');
      return;
    }

    this.articleService.updateArticle(this.articleId, this.article).subscribe(response => {
      this.showToastrSuccess('Articulo actualizado', 'Artículo');
    });
    this.modalRef?.hide();
    this.updated.emit(true);
  }

  categorySelected($event:Category){
    this.article.categoryId = $event.id;
  }

  private showTastrError(message:string, title:string){
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right'
    });
  }

  private showToastrSuccess(message:string, title:string){
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right'
    })
  }
}

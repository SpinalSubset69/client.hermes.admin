import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IReporter } from 'src/app/interfaces/reporter';
import { Article } from 'src/app/models/article';
import { Category } from 'src/app/models/category';
import { ArticleService } from 'src/app/services/article.service';
import { ReporterService } from 'src/app/services/reporter.service';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.css']
})
export class AddarticleComponent implements OnInit {
  article:Article;
  formData:FormData;
  reporter!:IReporter;
  @Output() closeContent = new EventEmitter<boolean>();

  constructor(
    private toastr:ToastrService,
    private articleService:ArticleService,
    private reporterService:ReporterService
  ) {
    this.article = new Article('', '', '', 0)
    this.formData = new FormData();
   }

  ngOnInit(): void {
    this.reporterService.getReporterByToken().subscribe(response => {
      this.reporter = response;
    })
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

    this.articleService.addArticle(this.article, this.reporter.id).subscribe(articleStored => {
        this.articleService.addArticleImages(this.formData, articleStored.id).subscribe(response => {
          this.article = new Article('', '','',0);
          this.formData = new FormData();
          this.showToastrSuccess('Artículo Guardado en la base de datos con éxito', 'Artículo');
          this.closeContent.emit(true);
        });
    });


  }

  onFileSelect($event:any){
    const file:File = $event.target.files[0];

    //Check if is an image
    if(!file.type.includes('png') && !file.type.includes('jpg') && !file.type.includes('jpeg')){
      $event.target.value = null;
      this.showTastrError('Inserte Solo Imagenes', 'Imagen');
      return;
    }

    //If is a valid format, add image to the form data
    this.formData.append('fileslist', file);
  }

  categorySelected($event:Category){
    this.article.categoryId = $event.id;
  }

  closeAddArticle(){
    this.closeContent.emit(true);
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

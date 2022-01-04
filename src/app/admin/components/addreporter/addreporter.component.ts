import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/interfaces/responses';
import { IRole } from 'src/app/interfaces/Role';
import { ImageUploadRequest } from 'src/app/models/ImageUploadRequest';
import { Reporter } from 'src/app/models/reporter';
import { ReporterService } from 'src/app/services/reporter.service';
import { toBase64Async } from 'src/app/Util/FileHandler';

@Component({
  selector: 'app-addreporter',
  templateUrl: './addreporter.component.html',
  styleUrls: ['./addreporter.component.css'],
})
export class AddreporterComponent implements OnInit {
  reporter: Reporter;
  imageToUpload:ImageUploadRequest;
  roleSelected:boolean = false;

  @Output() closeContent = new EventEmitter<boolean>();
  constructor(
    private toastr:ToastrService,
    private reporterService:ReporterService
  ) {
    this.reporter = new Reporter('', '', '', '', 0);
    this.imageToUpload = new ImageUploadRequest('', '');
  }

  ngOnInit(): void {

  }

  //Handle Files
  async onFileSelect($event:any){
    const file:File = $event.target.files[0];

    //Check if is an image
    if(!file.type.includes('png') && !file.type.includes('jpg') && !file.type.includes('jpeg')){
      $event.target.value = null;
      this.toastr.error('Inserte Solo Imágenes', 'Imagen',{
        positionClass: 'toast-top-right'
      });
      return;
    }

    const imageContentToTransform = toBase64Async(file).then(content => {
      return content;
    });
    const fileName = file.name;
    const imageToUpload = new ImageUploadRequest(await imageContentToTransform, fileName);
    console.log(imageToUpload);

    /* //TOREMOVE
    //If is a valid format, add image to the form data
    this.formData.append('file', file); */
    this.imageToUpload = imageToUpload;
  }

  addReporter(form: NgForm) {

    if (form.invalid) {
      return;
    }

    if(this.reporter.rolId == 0){
      this.roleSelected = false;
      return;
    }

    //Add reporter info
    this.reporterService.postReporter(this.reporter).subscribe( (reporter) => {
      //Upload ReporterImage
      this.reporterService.addImageReporter(this.imageToUpload, reporter.id).subscribe(response => {
        console.log("Entramos");
        this.toastr.success('Reportero creado con éxito!', 'Éxito', {
          positionClass: 'toast-top-right'
        });

        this.reporter = new Reporter('', '', '', '', 0);
      }, (err:any) => {
        this.toastr.error('Error al Subir la imagen ', 'Error', { positionClass: 'toast-top-right' })
      });
    }, (err:any) => {
      console.log(err);
      this.toastr.error(err.error.errorMessage, 'Error', { positionClass: 'toast-top-right' })
    });

  }

  selectedRole($event:IRole){
    this.reporter.rolId = $event.id;
    this.roleSelected = true;
  }

  closeAddArticle(){
    this.closeContent.emit(true);
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/interfaces/responses';
import { Reporter } from 'src/app/models/reporter';
import { ReporterService } from 'src/app/services/reporter.service';

@Component({
  selector: 'app-addreporter',
  templateUrl: './addreporter.component.html',
  styleUrls: ['./addreporter.component.css'],
})
export class AddreporterComponent implements OnInit {
  reporter: Reporter;
  formData:FormData;
  @Output() closeContent = new EventEmitter<boolean>();
  constructor(
    private toastr:ToastrService,
    private reporterService:ReporterService
  ) {
    this.reporter = new Reporter('', '', '', '');
    this.formData = new FormData();
  }

  ngOnInit(): void {}

  //Handle Files
  onFileSelect($event:any){
    const file:File = $event.target.files[0];

    //Check if is an image
    if(!file.type.includes('png') && !file.type.includes('jpg') && !file.type.includes('jpeg')){
      $event.target.value = null;
      this.toastr.error('Inserte Solo Imágenes', 'Imagen',{
        positionClass: 'toast-top-right'
      });

      return;
    }

    //If is a valid format, add image to the form data
    this.formData.append('file', file);
  }

  addReporter(form: NgForm) {
    if (form.invalid) {
      return;
    }

    //Add reporter info
    this.reporterService.postReporter(this.reporter).subscribe(reporter => {

      this.reporterService.addImageReporter(this.formData, reporter.id).subscribe(response => {
        this.toastr.success('Reportero creado con éxito!', 'Éxito', {
          positionClass: 'toast-top-right'
        });

        this.reporter = new Reporter('', '', '', '');
      }, (err:any) => {
        this.toastr.error(err.error.message, 'Error', { positionClass: 'toast-top-right' })
      });
    }, (err:any) => {
      this.toastr.error(err.error.message, 'Error', { positionClass: 'toast-top-right' })
    });

  }

  closeAddArticle(){
    this.closeContent.emit(true);
  }
}

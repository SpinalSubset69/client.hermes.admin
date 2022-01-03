import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category';
import { ErrorResponse } from 'src/app/interfaces/responses';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  category: Category;
  status: string = 'Guardar Categoría';
  @Output() closeContent = new EventEmitter<boolean>();

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.category = new Category('', 0);
  }

  ngOnInit(): void {
   this.getCategories();
  }

  editCategory(category: Category) {
    this.status = 'Editar Categoría';
    this.category = category;
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category).subscribe(response => {
      this.showToastrSuccess(response.message, 'Eliminada');
    }, err => {
      this.showToastrError(err.error.message, 'Error');
    });

    this.getCategories();
    this.category = new Category('', 0);

  }

  saveCategory(f: NgForm) {
    if (f.invalid) {
      return;
    }

    switch (this.status) {
      case 'Guardar Categoría':
        this.categoryService.saveCategory(this.category).subscribe(
          (response) => {
            this.getCategories();
           this.showToastrSuccess(response.message, 'Categoría');
          },
          (err: any) => {
            if(err.error.message === 'Category Already Exists'){
              this.showToastrError('Ya existe la categoría', 'Error');
            }
          }
        );
        break;
      case 'Editar Categoría':
          this.categoryService.updateCategory(this.category).subscribe(response => {
            this.getCategories();
            this.showToastrSuccess(response.message, 'Categoría');
          }, err => {
            if(err.error.message === 'Category Already Exists'){
              this.showToastrError('Ya existe la categoría', 'Error');
            }
          })
        break;
    }

    this.status = 'Guardar Categoría';
    this.category = new Category('', 0);

  }

  closeCategories(){
    this.closeContent.emit(true);
  }

  private showToastrError(message: string, title: string) {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right',
    });
  }

  private showToastrSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right',
    });
  }

  private getCategories(){
    this.categoryService.all().subscribe((categoriesFromResponse) => {
      this.categories = categoriesFromResponse;
      console.log(this.categories);
    });
  }
}

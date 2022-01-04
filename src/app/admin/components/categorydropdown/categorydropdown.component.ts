import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categorydropdown',
  templateUrl: './categorydropdown.component.html',
  styleUrls: ['./categorydropdown.component.css'],
})
export class CategorydropdownComponent implements OnInit {
  categories: Category[] = [];
  categorySelected: string = 'Categoría ';
  width: number = 0;
  @Output() onCategorySelect = new EventEmitter<Category>();

  @HostListener('window:resize', ['$event'])
  onRezise() {
    this.width = document.documentElement.clientWidth || document.body.clientWidth;
    this.checkWidth();
  }

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.width =  document.body.clientWidth;
    this.checkWidth();
    this.categoryService.all().subscribe((categoriesFromResponse) => {
      this.categories = categoriesFromResponse;
    });
  }

  selectCategory(category: Category) {
    this.categorySelected = category.name;
    this.onCategorySelect.emit(category);
  }

  checkWidth() {
    const dropdownd = document.getElementById('dropdown');
    if (this.width <= 770) {
      dropdownd?.setAttribute('style', 'position:relative');
    }
    if (this.width > 770) {
      dropdownd?.setAttribute('style', 'position:absolute');
    }
  }


}

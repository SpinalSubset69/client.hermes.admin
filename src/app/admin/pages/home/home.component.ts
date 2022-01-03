import { Component, HostListener, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interfaces/article';
import { IReporter } from 'src/app/interfaces/reporter';
import { ReporterService } from 'src/app/services/reporter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  addReporter: boolean = false;
  addArticle: boolean = false;
  addCategory: boolean = false;
  articlesMainContent: boolean = true;
  reporter: IReporter | undefined;
  bars: boolean = false;
  width: number = 0;

  @HostListener('window:resize', ['$event'])
  onRezise() {
    this.width =
      document.documentElement.clientWidth || document.body.clientWidth;
    this.checkWidth();
  }

  constructor(private reporterService: ReporterService) {}

  ngOnInit(): void {
    this.width = innerWidth;
    this.checkWidth();
    this.reporterService.getReporterByToken().subscribe((response) => {
      this.reporter = response;
    });
  }

  AddReporterComponent($event: boolean) {
    this.cleanContent();
    this.addReporter = $event;
  }

  AddArticleComponent($event: boolean) {
    this.cleanContent();
    this.addArticle = $event;
  }

  AddCategoryComponent($event: boolean) {
    this.cleanContent();
    this.addCategory = $event;
  }

  CloseContent($event: boolean) {
    if ($event) {
      this.cleanContent();
    }
    this.articlesMainContent = true;
  }

  showSideBarMediaQuery() {
    this.switchContent();
  }

  private cleanContent() {
    this.addReporter = false;
    this.addArticle = false;
    this.addCategory = false;
    this.articlesMainContent = false;
  }

  checkWidth() {
    if (this.width > 770) {
      this.bars = false;
    }
    if (this.width <= 770) {
      this.bars = true;
    }
  }

  private switchContent() {
    const sideBar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sideBar?.setAttribute('style', 'visibility: visible');
    content?.setAttribute('style', 'position: relative');
  }
}

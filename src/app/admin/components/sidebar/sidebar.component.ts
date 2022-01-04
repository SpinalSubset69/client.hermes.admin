import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'src/app/interfaces/modal';
import { IReporter } from 'src/app/interfaces/reporter';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() reporter: IReporter | undefined;
  @Output() showAddReporter = new EventEmitter<boolean>();
  @Output() showAddArticle = new EventEmitter<boolean>();
  @Output() showAddCategory = new EventEmitter<boolean>();
  modalInfo!:Modal;
  showModal:boolean = false;
  width:number = 0;
  close:boolean = false;

  @HostListener('window:resize', ['$event'])
  onRezise(){
    this.width = (document.documentElement.clientWidth || document.body.clientWidth);
    this.checkWidth();
    }


  constructor(private authService: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.width = innerWidth;
    this.checkWidth();
  }

  addReporterShow() {
    console.log(this.reporter);
    this.showAddReporter.emit(true);
    if(this.width <= 770){
      this.hiddeSideBar();
    }
  }

  addArticleShow() {
    this.showAddArticle.emit(true);
    if(this.width <= 770){
      this.hiddeSideBar();
    }
  }

  addCategoryShow() {
    this.showAddCategory.emit(true);
    if(this.width <= 770){
      this.hiddeSideBar();
    }
  }

  logout() {
    this.modalInfo = {
      title: '¿Desea Cerrar Sesión?',
      message: 'Será redireccionado a la pagina de inicio de sesión'
    }
    this.showModal = true;
  }

  handleModalOutput($event:boolean){
    if(!$event){
      this.showModal = false;
      return
    }
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  closeSideBar(){
    this.hiddeSideBar();
  }

  checkWidth() {
    if (this.width > 770) {
      this.close = false;
      this.showSideBar();
    }
    if (this.width <= 770) {
      this.close = true;
    }
  }

  private hiddeSideBar(){
    const sideBar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sideBar?.setAttribute("style", "visibility: hidden");
    content?.setAttribute("style", "position: absolute")
  }

  showSideBar(){
    const sideBar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    sideBar?.setAttribute("style", "visibility: visible");
    content?.setAttribute("style", "position: relative")
  }
}

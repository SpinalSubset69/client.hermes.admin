import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddreporterComponent } from './components/addreporter/addreporter.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImagesPipe } from './pipes/images.pipe';
import { ArticlesComponent } from './components/articles/articles.component';
import { AddarticleComponent } from './components/addarticle/addarticle.component';
import { CategorydropdownComponent } from './components/categorydropdown/categorydropdown.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ArticlecardComponent } from './components/articlecard/articlecard.component';
import { ArticleimagePipe } from './pipes/articleimage.pipe';
import { RoundPipe } from './pipes/round.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { ArticletitlePipe } from './pipes/articletitle.pipe';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    AddreporterComponent,
    ImagesPipe,
    ArticleimagePipe,
    ArticlesComponent,
    AddarticleComponent,
    CategorydropdownComponent,
    CategoriesComponent,
    ArticlecardComponent,
    RoundPipe,
    ModalComponent,
    ArticletitlePipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class AdminModule { }

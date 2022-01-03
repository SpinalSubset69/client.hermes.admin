import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'home' }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule,
  RouterModule.forChild(ROUTES)],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}

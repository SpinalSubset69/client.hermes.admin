import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


const ROUTES: Routes = [
  {
    path: '',
    children: [
    {path:'login', component: LoginComponent},
    {path:'**', pathMatch:'full', redirectTo:'login'}
    ]
  }
]
@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthroutingModule { }

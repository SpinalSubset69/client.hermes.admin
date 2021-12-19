import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthroutingModule } from './authrouting.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthroutingModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthModule { }
    
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)},
{path:'admin', loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule), canActivate: [AuthGuard]},
  {path:'**', pathMatch:'full', redirectTo:'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

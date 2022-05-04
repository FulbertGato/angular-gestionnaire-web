import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', loadChildren: () => import('./pages/dashboard-pagge/dashboard-pagge.module').then(m => m.DashboardPaggeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

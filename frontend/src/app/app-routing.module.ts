import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'guest',
    loadChildren: () =>
      import('./components/guest/guest.module').then((m) => m.GuestModule),
  },
  {
    path: 'operator',
    loadChildren: () =>
      import('./components/operator/operator.module').then(
        (m) => m.OperatorModule
      ),
    canActivate: [AuthGuard],
    data: { role: 'operator' },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

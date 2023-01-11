import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwtGuard } from './guards/jwt.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [JwtGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/admin/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./pages/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled', useHash: true }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

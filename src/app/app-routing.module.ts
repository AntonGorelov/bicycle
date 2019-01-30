import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { CompaniesComponent } from './companies/companies.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

import { AuthGuardService } from './guards/auth-guard.service';

import { D3View } from './d3/views/d3.view';
import { ProductResolverService } from './product/product-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'shop/:id',
    component: ProductComponent,
    resolve: { product: ProductResolverService },
    canActivate: [AuthGuardService],
  },
  {
    path: 'companies',
    component: CompaniesComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/forgot_password',
    component: RestorePasswordComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'd3',
    component: D3View,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

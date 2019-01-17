import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { CompanyComponent } from './company/company.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

import { AuthGuardService } from './guards/auth-guard.service';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'shop',
    component: ShopComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'companies',
    component: CompanyComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}

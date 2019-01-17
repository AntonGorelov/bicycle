import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

// My components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CompanyComponent } from './company/company.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { HomeComponent } from './home/home.component';
import { NewsCardComponent } from './news-card/news-card.component';

// Shared components
import { InputComponent } from './input/input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

// Services
import { AuthGuardService } from './guards/auth-guard.service';
import { StoreService } from './services/store.service';

// Interceptors
import { FakeBackendInterceptor } from './helpers/backend';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShopComponent,
    LoginComponent,
    ProductComponent,
    CompanyComponent,
    RestorePasswordComponent,
    HomeComponent,
    NewsCardComponent,

    InputComponent,
    CheckboxComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('currentUser');
        },
        whitelistedDomains: []
      }
    })
  ],
  providers: [
    AuthGuardService,
    StoreService,
    FakeBackendInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers/fake-backend';
// import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AlertComponent } from './_directives/index';
import { AuthAdminGuard } from './_guards/index';
import { AuthUserGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, AdminService } from './_services/index';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent }            from './forgot_password/forgot_password.component'; 
import { RegisterCompanyComponent } from './admin/company/register_company/register_company.component';
import { RegisterComponent } from './register/register.component';

import { AdminLayoutComponent }    from './_layout/admin_layout.component'; 
import { UserLayoutComponent }     from './_layout/user_layout.component';

import { DataService } from './_services/data.service';
import { ToastComponent } from './shared/toast/toast.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    AlertComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    RegisterCompanyComponent,
        
    HomeComponent,
    AboutComponent,
    ToastComponent,

  ],
  providers: [
    AuthAdminGuard,
    AuthUserGuard,
    AuthenticationService,
    AlertService,
    UserService,
    AdminService,
    // providers used to create fake backend
    // fakeBackendProvider,
    // MockBackend,
    BaseRequestOptions,
    DataService,
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }




import { NgModule }                         from '@angular/core';
import { Routes, RouterModule }             from '@angular/router';

import { AuthAdminGuard }                 from './_guards/index';
import { AuthUserGuard }                 from './_guards/index';
import { HomeComponent }             from './home/home.component';
import { AboutComponent }            from './about/about.component';
import { LoginComponent }            from './login/login.component'; 
import { ForgotPasswordComponent }            from './forgot_password/forgot_password.component'; 
import { RegisterComponent }         from './register/register.component';
import { RegisterCompanyComponent } from './admin/company/register_company/register_company.component';
import { AdminLayoutComponent }            from './_layout/admin_layout.component'; 
import { UserLayoutComponent }            from './_layout/user_layout.component'; 

export const routes: Routes = [
    { path: '', redirectTo: 'admin', pathMatch: "full" },
    { 
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [AuthAdminGuard],
        data: {
            title: 'Admin'
        },
        children: [
            {
                path: '',
                loadChildren: 'app/admin/admin.module#AdminModule'
            },
        ]
    },
    { 
        path: 'user',           
        component: UserLayoutComponent ,
        canActivate: [AuthUserGuard],
        data: {
            title: 'User'
        },
        children: [
            {
                path: '',
                loadChildren: 'app/user/user.module#UserModule'
            },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'password_reset', component: ForgotPasswordComponent },
    { path: 'register/:id', component: RegisterComponent },
    { path: 'register_company/:id', component: RegisterCompanyComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

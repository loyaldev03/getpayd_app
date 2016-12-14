import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthAdminGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser') && ((JSON.parse(localStorage.getItem('currentUser')).email === 'admin@gmail.com') || (JSON.parse(localStorage.getItem('currentUser')).company_name != null))) {
            return true;
        }
        this.router.navigate(['/user/user']);
        return false;
    }
}

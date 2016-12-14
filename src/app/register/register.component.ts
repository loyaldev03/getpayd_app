import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlertService, UserService, AdminService } from '../_services/index';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit{
    private id: number = null;
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private route:ActivatedRoute,
        private adminService: AdminService,
        private alertService: AlertService) { }

    ngOnInit(): void {
        this.model._id = this.route.params['_value']['id'];
        // this.id = this.route.params['id']
    }

    register() {
        this.loading = true;
        if (this.model._id){
            this.adminService.editUser(this.model)
            .subscribe(
                data => {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);                    
                    },
                error => {
                        this.alertService.error(error);
                        this.loading = false;
                });
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AdminService } from '../../../_services/index';

@Component({
    templateUrl: 'new_company.component.html',
    styleUrls: ['new_company.component.scss']
})

export class NewCompanyComponent implements OnInit{
    private model: any = {};
    private loading = false;
    private company_emails: String[] = [];
    
    constructor(
        private router: Router,
        private adminService: AdminService,
        private alertService: AlertService) { }

    ngOnInit() {
      this.getEmails();
    }
    
    register() {
        if (this.company_emails.indexOf(this.model.email) === -1) {
            this.loading = true;
            this.adminService.addCompany(this.model)
                .subscribe(
                    data => {
                        this.alertService.success('Successfully added', true);
                        this.adminService.sendInvitationToCompany(data)
                        .subscribe(
                            data => {
                                this.router.navigate(['/admin/manage_company']);
                            },
                            error => {
    
                            }
                        );
                    },
                    error => {
                        console.log("service error");
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }
    
    getEmails() {
      this.adminService.getCompanies().subscribe(
        data => {
            for (let index in data) {
                this.company_emails.push(data[index].email);
            }
            console.log(this.company_emails);
        },
        error => console.log(error),
        () => {this.loading = false}
      );
    }
}

import { Component, OnInit }        from '@angular/core';
import { Company }          from '../../_models/index'
import { AdminService } from '../../_services/admin.service';

@Component({
    templateUrl: 'manage_company.component.html',
    styleUrls: [ './manage_company.component.scss' ]
})
export class ManageCompanyComponent implements OnInit{
    private companies: Company[] = [];
    private isLoading = true;
    private filter_str:string ="first_name";
    private search_str:string = "";

    constructor(
      private adminService: AdminService
    ) 
    {}

    ngOnInit() {
      this.getCompanies();
    }

    getCompanies() {
      this.adminService.getCompanies().subscribe(
        data => {
            this.companies = data;
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );
    }

    onClick(company:any) {
        this.adminService.deleteCompany(company).subscribe(
            data => {
                this.getCompanies();
            },
            error => {

            },
            () => {
            });
    }
}

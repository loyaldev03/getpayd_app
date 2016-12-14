import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../_models/index'
import { AdminService }             from '../../_services/admin.service';

@Component({
    templateUrl: 'manage_content.component.html',
    styleUrls: [ './manage_content.component.scss' ]
})
export class ManageContentComponent implements OnInit {
    private contents: Content[] = [];
    private isLoading = true;

    constructor(
      private adminService: AdminService
    ){ }

    ngOnInit() {
      this.getContents();
    }

    getContents() {
      this.adminService.getContents().subscribe(
        data => this.contents = data,
        error => console.log(error),
        () => {this.isLoading = false}
      );
    }
    onClick(content:any) {
        this.adminService.deleteContent(content).subscribe(
            data => {
                this.getContents();
            },
            error => {

            },
            () => {
            });
    }
}

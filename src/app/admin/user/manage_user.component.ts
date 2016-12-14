import { Component, OnInit }        from '@angular/core';
import { User }          from '../../_models/index'
import { AdminService } from '../../_services/admin.service';

@Component({
    templateUrl: 'manage_user.component.html',
    styleUrls: [ './manage_user.component.scss' ]
})
export class ManageUserComponent implements OnInit{
    private users: User[] = [];
    private isLoading = true;
    private filter_str:string ="first_name";
    private search_str:string = "";

    constructor(
      private adminService: AdminService
    ) 
    {}

    ngOnInit() {
      this.getUsers();
    }

    getUsers() {
      this.adminService.getUsers().subscribe(
        data => {
            this.users = data;
            for (let index in this.users) {
                if (this.users[index].email === "admin@gmail.com") {
                    this.users.splice(Number(index), 1);
                    return;
                }
            }
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );
    }

    isSuperAdmin(user) {
        if (user.email === "admin@gmail.com") {
            console.log(user.email);
            return true;
        }
        return false;
    }
    onClick(user:any) {
        this.adminService.deleteUser(user).subscribe(
            data => {
                this.getUsers();
            },
            error => {

            },
            () => {
            });
    }
}

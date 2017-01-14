import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private addable_new_user : boolean = true;

    constructor(
      private adminService: AdminService,
      private router: Router,
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
                    break;
                }
            }
            if (this.users.length === JSON.parse(localStorage.getItem('currentUser')).number_of_users) {
                this.addable_new_user = false;
            }
            else {
                this.addable_new_user = true;
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
    newUser(){
        this.router.navigate(['/admin/new_user']); 
    }
}

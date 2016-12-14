import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../_services/index';

@Component({
    templateUrl: 'forgot_password.component.html'
})

export class ForgotPasswordComponent implements OnInit {
    private email_for_password:String;
    private loading = false;
    private users;
    private has_no_email = false;
    private model: any = {};

    constructor(
        private router: Router,
        private adminService: AdminService,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.getUsers();
    }

    getUsers() {
      this.adminService.getUsers().subscribe(
        data => {
            this.loading = false;
            this.users = data;
            for (let index in this.users) {
                if (this.users[index].email === "admin@gmail.com") {
                    this.users.splice(Number(index), 1);
                    return;
                }
            }
        },
        error => console.log(error),
        () => {this.loading = false}
      );
    }

    onEmailChange($event){
        this.has_no_email = false;
    }
    send_password_reset_email() {
        console.log(this.users);
        this.email_for_password = this.model.email;
        for (let index in this.users) {
            console.log(this.email_for_password, "             ", this.users[index].email);
            if (this.email_for_password === this.users[index].email) {
                this.adminService.send_password_reset_email(this.users[index])
                .subscribe(
                    data => {
                        if (data)
                        {
                            this.router.navigate(['/']);
                        }
                        else{
                            this.loading = false; 
                        }
                    },
                    error => {
                    });
                return;
            }                
        }
        console.log("no email");
        this.has_no_email = true;
    }

}

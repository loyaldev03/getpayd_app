import { Component, OnInit }        from '@angular/core';
import { Reward }           from '../../../_models/index';
import { AdminService }     from '../../../_services/admin.service';

@Component({
    templateUrl: 'manage_awarded_rewards.component.html',
    styleUrls: [ './manage_awarded_rewards.component.scss' ]
})
export class ManageAwardedRewardsComponent implements OnInit {
  private rewards: Reward[] = [];
  private isLoading: boolean = true;
  private users: any = [];

  constructor(
    private adminService: AdminService
  ){ }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(
      data => {
          this.users = data;
          console.log("get users", this.users);
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

  OnChangeStatus(user, status, reward_index) {
    // console.log(user, reward, status);
    user.rewards[reward_index].status = status;
    this.adminService.editUser(user).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      })
  }
}

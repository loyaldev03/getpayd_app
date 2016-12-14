import { Component, OnInit }        from '@angular/core';
import { Reward }           from '../../_models/index';
import { AdminService }     from '../../_services/admin.service';

@Component({
    templateUrl: 'manage_reward.component.html',
    styleUrls: [ './manage_reward.component.scss' ]
})
export class ManageRewardComponent implements OnInit {
  private rewards: Reward[] = [];
  private isLoading: boolean = true;

  constructor(
    private adminService: AdminService
  ){ }

  ngOnInit() {
    this.getRewards();
  }

  getRewards() {
    this.adminService.getRewards().subscribe(
      data => this.rewards = data,
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }
  onClick(reward:any) {
    this.adminService.deleteReward(reward).subscribe(
        data => {
            this.getRewards();
        },
        error => {

        },
        () => {
        });
  }
}

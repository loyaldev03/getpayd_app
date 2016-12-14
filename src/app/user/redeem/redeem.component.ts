import { Component, OnInit } from '@angular/core'
import { Reward }           from '../../_models/index';
import { AdminService }     from '../../_services/index';

@Component({
  templateUrl: "redeem.component.html",
  styleUrls: ["./redeem.component.scss"]
})

export class RedeemComponent implements OnInit{
  private rewards: Reward[] = [];
  private isLoading = true;

  constructor(
    private adminService: AdminService
  ){ }

  ngOnInit() {
    this.getAvailableRewards();
  }

  getAvailableRewards() {
    this.adminService.getAvailableRewards(JSON.parse(localStorage.getItem('currentUser')).department.__v,JSON.parse(localStorage.getItem('currentUser')).department._id, JSON.parse(localStorage.getItem('currentUser')).department.department).subscribe(
      data => this.rewards = data,
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }
}
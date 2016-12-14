import { Component } from '@angular/core'
import { Reward }           from '../../_models/index';
import { AdminService }     from '../../_services/index';

@Component({
  templateUrl: "shopping_cart.component.html",
  styleUrls: ["./shopping_cart.component.scss"]
})

export class ShoppingCartComponent{
  private rewards: Reward[] = [];
  private isLoading = true;

  constructor(
    private adminService: AdminService
  ){ }

  ngOnInit() {
    this.getRewardsForUser();
  }

  getRewardsForUser() {
    this.adminService.getUser(JSON.parse(localStorage.getItem('currentUser'))._id).subscribe(
      data => {
        this.rewards = data.rewards;   
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }
}
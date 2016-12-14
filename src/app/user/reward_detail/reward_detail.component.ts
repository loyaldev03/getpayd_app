import { Component } from '@angular/core'
import { Reward }           from '../../_models/index';
import { AdminService }     from '../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: "reward_detail.component.html",
  styleUrls: ["./reward_detail.component.scss"]
})

export class RewardDetailComponent{
  private reward;
  private rewards;
  private isLoading = true;
  private number: number=0;
  private available_tokens: number;
  private user;
  private max_num: number = 0;
  private isBuyable: boolean = true;
  private reward_id_for_user: number = -1;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getRewardForUserWithId(params['id']);
    });
  }

  getReward(id) {
    this.adminService.getReward(id).subscribe(
      data => {
        this.reward = data;
        this.available_tokens = this.user.available_tokens;   
        this.max_num = this.user.available_tokens / this.reward.cost;
        this.number = 0;
        this.reward_id_for_user = -1;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  getRewardForUserWithId(id) {
    this.adminService.getUser(JSON.parse(localStorage.getItem('currentUser'))._id).subscribe(
      data => {
        this.user = data;
        this.rewards = data.rewards;
        for (let index in this.rewards) {
          let reward_item = this.rewards[index];
          if (reward_item.reward._id == id) {
            this.reward = reward_item.reward;
            this.number = reward_item.number;
            this.available_tokens = this.user.available_tokens - this.reward.cost * this.number;
            this.max_num = this.user.available_tokens / this.reward.cost;
            this.reward_id_for_user = Number(index);
            return;
          }
        }
        this.getReward(id);
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  getUserInfo(id){
    this.adminService.getUser(id).subscribe(
      data => {
        this.user = data;
      },
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  onNumberChange(data){
    if (this.user.available_tokens - this.reward.cost * this.number < 0) {
      this.available_tokens = this.user.available_tokens;
      this.number = 0;
      this.isBuyable = false;
      return;
    }
    this.available_tokens = this.user.available_tokens - this.reward.cost * this.number;
    this.isBuyable = true;
  }

  onBuy() {
    if (this.isBuyable){
      this.user.available_tokens = this.available_tokens;
      if (this.reward_id_for_user === -1){
        if (!this.user.rewards){
          this.user.rewards = [];
        }
        this.user.rewards.push({
          reward: this.reward,
          number: this.number
        });        
      }
      else {
        this.rewards[this.reward_id_for_user] = {
          reward: this.reward,
          number: this.number
        }
        this.user.rewards = this.rewards;
      }
      this.adminService.sendEmailRegardingReward(this.user, this.reward, this.number)
        .subscribe(
          data => {

          },
          error => {
            console.log(error);
          },
          () => { }
      );
      this.adminService.editUser(this.user)
        .subscribe(
            data => {
                  this.router.navigate(['/user/shopping_cart']);                    
                },
            error => {
              console.log(error);
            },
            () => { }
        );      
    }
  }

  onBack() {
    this.router.navigate(['/user/redeem']);
  }
}
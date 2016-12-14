import { Component, OnInit }        from '@angular/core';
import { Router } from '@angular/router';
import { Department, Reward }           from '../../../_models/index';
import { AdminService }     from '../../../_services/admin.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

@Component({
    templateUrl: 'new_reward.component.html',
    styleUrls: [ './new_reward.component.scss' ]
})
export class NewRewardComponent implements OnInit{

  private available_tos: Department[] = [];
  private isLoading: boolean = true;
  private addRewardForm: FormGroup;
  private name = new FormControl("", Validators.required);
  private cost = new FormControl(0, Validators.required);
  private details = new FormControl("", Validators.required);
  private available_to = new FormControl();
  private date_end = new FormControl("", Validators.required);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.addRewardForm = this.formBuilder.group({
      name: this.name,
      cost: this.cost,
      details: this.details,
      available_to: this.available_to,
      date_end: this.date_end,
    });
    this.getAvailableTo();
  }

  getAvailableTo() {
    this.adminService.getDepartments().subscribe(
      data => this.available_tos = data,
      error => console.log(error),
      () => {this.isLoading = false}
    );
  }

  getRewards() {
    // this.dataService.getUsers().subscribe(
    //   data => this.users = data,
    //   error => console.log(error),
    //   () => this.isLoading = false
    // );
  }

  addReward() {
    this.isLoading = true;
    let newReward = this.addRewardForm.value
    newReward.company = JSON.parse(localStorage.getItem('currentUser'));
    this.adminService.addReward(newReward)
    .subscribe(
        data => {
            this.router.navigate(['/admin/manage_reward']);
        },
        error => {
            console.log("service error");
            this.isLoading = false;
        });

  }
}

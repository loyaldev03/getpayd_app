import { Component, OnInit }        from '@angular/core';
import { AdminService }     from '../../_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit }        from '@angular/core';
import { AdminService }     from '../../_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'view_activity.component.html',
    styleUrls: [ './view_activity.component.scss' ]
})
export class ViewActivityComponent implements OnInit{
  private activities = [];
  private isLoading: boolean = true;
  private search_str:string = "";
  private user_id: string = "";
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getActivities(params["user_id"]);
    });
  }

  getActivities(user_id) {
    if (user_id === 'all'){
      this.adminService.getUsers().subscribe(
        data => {
          this.activities = [];
          for (let index in data) {
            this.activities = this.activities.concat(data[index].activities);
          }        
          console.log(this.activities);
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );      
    }
    else {
      this.adminService.getUser(user_id).subscribe(
        data => {
          this.activities = data.activities;
          console.log(this.activities);
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );            
    }
  }

}

import { Component, OnInit }        from '@angular/core';
import { AdminService }     from '../../_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit }        from '@angular/core';
import { AdminService }     from '../../_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'view_activity.component.html',
    styleUrls: [ './view_activity.component.scss' ]
})
export class ViewActivityComponent implements OnInit{
  private activities = [];
  private isLoading: boolean = true;
  private search_str:string = "";
  private user_id: string = "";
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getActivities(params["user_id"]);
    });
  }
    
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getActivities(params["user_id"]);
    });
  }    

  getActivities(user_id) {
    if (user_id === 'all'){
      this.adminService.getUsers().subscribe(
        data => {
          this.activities = [];
          for (let index in data) {
            this.activities = this.activities.concat(data[index].activities);
          }        
          console.log(this.activities);
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );      
    }
    else {
      this.adminService.getUser(user_id).subscribe(
        data => {
          this.activities = data.activities;
          console.log(this.activities);
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );            
    }
  }

  getActivities(user_id) {
    if (user_id === 'all'){
      this.adminService.getUsers().subscribe(
        data => {
          this.activities = [];
          for (let index in data) {
            this.activities = this.activities.concat(data[index].activities);
          }        
          console.log(this.activities);
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );      
    }
    else {
      this.adminService.getUser(user_id).subscribe(
        data => {
          this.activities = data.activities;
          console.log(this.activities);
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );            
    }
  }
    
}

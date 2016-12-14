import { Component, OnInit }        from '@angular/core';
import { AdminService }     from '../../_services/admin.service';

@Component({
    templateUrl: 'view_activity.component.html',
    styleUrls: [ './view_activity.component.scss' ]
})
export class ViewActivityComponent implements OnInit{
  private activities = [];
  private isLoading: boolean = true;
  private search_str:string = "";

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
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

}

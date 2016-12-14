import { Component, OnInit }        from '@angular/core';
import { Content }                  from '../../_models/index'
import { UserService }             from '../../_services/index';
import { AdminService }             from '../../_services/index';


@Component({
    templateUrl: 'user_dashboard.component.html',
    styleUrls: [ './user_dashboard.component.scss' ]
})
export class UserDashboardComponent implements OnInit{

    private available_contents: Content[] = [];
    private isLoading = true;
    private available_ids: String[] = [];
    private user;
    private available_tokens;

    constructor(
      private userService: UserService,
      private adminService: AdminService
    ){ }

    ngOnInit() {
      this.getUserInfo(JSON.parse(localStorage.getItem('currentUser'))._id);
    }
   
    getUserInfo(id){
      this.adminService.getUser(id).subscribe(
        data => {
          this.user = data;
          this.available_tokens = this.user.available_tokens
          this.getAvailableContents();
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );
    }    
    getAvailableContents() {
      this.userService.getAvailableContents(JSON.parse(localStorage.getItem('currentUser')).department.__v,JSON.parse(localStorage.getItem('currentUser')).department._id, JSON.parse(localStorage.getItem('currentUser')).department.department).subscribe(
        data => {
          this.available_ids = data.map((content) => {return content._id;})
          let unavailable_ids = this.user.activities.map((activity) => {return activity.content._id})
          this.available_ids = this.available_ids.filter( function( el ) {
            return unavailable_ids.indexOf( el ) < 0;
          });
          console.log(this.available_ids);
          this.available_contents = [];
          for (let index in data){
            if (this.available_ids.indexOf(data[index]._id) < 0) {
              continue;
            }
            this.available_contents.push(data[index]);
          }
        },
        error => console.log(error),
        () => {this.isLoading = false}
      );
    }
}
